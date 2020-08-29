import MediaRegistryController from '../media-registry';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { fetchCollection } from 'dummy/media';
import { formatId } from '@cardstack/boxel/utils/format-id';

export default class MediaRegistryCardflowController extends MediaRegistryController {
  @tracked isolatedCollection = this.getIsolatedCollection(this.catalog.id);
  @tracked itemId = null;
  @tracked record = null;
  @tracked currentMilestone = this.org.user ? this.milestones.filter(el => el.pct === this.org.user.queueCards[0].progressPct)[0] : null;

  catalog = {
    id: 'batch-f',
    type: 'catalog',
    title: 'Batch F',
    count: '16',
    selected_art: [
      "media-registry/covers/thumb/Sunlight.jpg",
      "media-registry/covers/thumb/Change-Is-Good.jpg",
      "media-registry/covers/thumb/Full-Moon.jpg",
      "media-registry/covers/thumb/Love-Never-Dies.jpg",
      "media-registry/covers/thumb/Animals.jpg"
    ]
  }

  get projectTitle() {
    return this.org.user.queueCards[0].projectTitle;
  }

  @action
  updateProgress(val) {
    if (!val) {
      this.currentMilestone = this.milestones[0];
    }
    this.currentMilestone = this.milestones.filter(el => {
      if (el.pct === val) {
        set(el, 'current', true);
        return el;
      } else {
        set(el, 'current', false);
      }
    })[0];
  }

  @action
  mockStep(val) {
    if (val.id === 'crd_records' && (!this.currentMilestone || this.currentMilestone.pct < 40)) {
      this.updateProgress(40);
    } else {
      return;
    }
  }

  @action
  transition(val) {
    let { currentRouteName } = this.target;
    this.mockStep(val);

    if (this.model.id !== val.id) {
      if (currentRouteName === 'media-registry.agreements' || currentRouteName === 'media-registry.cardflow') {
        return this.transitionToRoute(currentRouteName, val.id);
      }
    }

    this.transitionToRoute('media-registry', val.id);
  }

  @action
  setItemId(item) {
    if (item) {
      this.itemId = formatId(item.title);
      this.getRecord();
    } else {
      this.itemId = null;
      this.record = null;
    }
  }

  @action
  async getIsolatedCollection(id) {
    const data = await fetchCollection('all_tracks_combined');

    let items = data.filter(item => {
      if (item.collection_ids) {
        return item.collection_ids.map(catalog => {
          let catalogId = formatId(catalog);
          return catalogId === id;
        }).includes(true);
      }
    });

    this.isolatedCollection = {
      title: id,
      type: 'collection',
      collection: items,
      itemType: 'master',
      itemTypePlural: 'masters',
      itemComponent: 'cards/master-collection-item',
      columns: [
        {
          name: 'Title',
          valuePath: 'title',
          isFixed: 'left',
          width: 350,
        },
        {
          name: 'Artist',
          valuePath: 'artist',
          width: 250,
        },
        {
          name: 'Release Title',
          valuePath: 'album',
          width: 250,
        },
        {
          name: 'Artwork',
          valuePath: 'cover_art',
          width: 175,
          isSortable: false,
        },
        {
          name: 'Release Type',
          valuePath: 'type_of_album',
          width: 250,
        },
        {
          name: 'Genre',
          valuePath: 'genre',
          width: 250,
        },
        {
          name: 'Length',
          valuePath: 'length',
          width: 250,
          sortType: 'numeric'
        },
        {
          width: 0,
          isFixed: 'right',
          isSortable: false
        },
      ],
    };
  }

  @action
  async getRecord() {
    let itemId = this.itemId;
    if (!itemId) { return; }

    const records = await fetchCollection('all_tracks_combined');
    const recordDetails = await fetchCollection('songs_by_pia_midina_bb_clarke_table_1');
    const profiles = await fetchCollection('profiles');
    const musicalWorks = await fetchCollection('musical-works');

    const record = records.find(item => {
      if (item.catalog) {
        return formatId(item.title) === itemId;
      }
    });

    const allCollections = this.model.collection;
    const catalogs = record.catalog.map(el => formatId(el));
    const collections = allCollections.filter(el => catalogs.includes(el.id));
    record.collections = collections;

    const recordDetail = recordDetails.find(item => item.id === itemId);
    const artists = profiles.filter(profile => profile.id === formatId(record.artist));

    if (artists.length) {
      record.artist_info = artists;
    }

    if (recordDetail) {
      const producers = profiles.filter(profile => (profile.id === recordDetail.producer_id));
      const musicalWork = musicalWorks.find(item => item.iswc === recordDetail.iswc_id);
      if (producers.length) {
        record.producer = producers;
      }
      record.details = recordDetail;
      record.musicalWork = musicalWork;
    }

    this.record = record;
  }

  get album() {
    if (!this.record || !this.record.album) { return null; }
    return {
      type: this.record.type_of_album,
      title: this.record.album,
      imgURL: this.record.cover_art_thumb,
      fields: [
        {
          title: 'primary artist',
          value: this.record.artist
        },
        {
          title: 'label',
          value: this.record.owner
        }
      ]
    }
  }

  @action
  transitionToProduct() {
    this.transitionToRoute('media-registry.products.album', formatId(this.record.album));
  }

  @action
  transitionToCatalog(id) {
    this.transitionToRoute('media-registry.collection', id);
  }
}
