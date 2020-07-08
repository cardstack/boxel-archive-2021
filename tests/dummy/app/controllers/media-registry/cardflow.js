import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { dasherize } from '@ember/string';
import { fetchCollection } from 'dummy/media';

const METADATASTEPS = [
  {
    title: 'Update ownership information',
    description: '16 items updated, 32 fields changed',
    timestamp: '2020-09-01T08:11',
    summary: 'Transfer Accepted',
    completed: true
  },
  {
    title: 'Add transfer details to Verifi registry',
    description: 'Anchored on Ethereum blockchain at block 5289291238',
    timestamp: '2020-09-01T08:34'
  },
  {
    title: 'Retrieve and store media assets',
    description: 'Move from Bunny Amazon S3 to CRD MediaNet account',
    timestamp: '2020-09-01T09:46'
  }
];

export default class MediaRegistryCardflowController extends Controller {
  @tracked isolatedCollection = this.getIsolatedCollection(this.catalog.id);
  @tracked itemId = null;
  @tracked record = null;
  @tracked org = this.model;
  @tracked actionSteps = METADATASTEPS;
  @tracked progressPct = this.model.user.queueCards[0].progressPct;
  @tracked lastUpdated = this.model.user.queueCards[0].timestamp;

  catalog = {
    id: 'batch-f',
    type: 'catalog',
    title: 'Batch F',
    catalog_title: 'Batch F',
    catalog_description: 'Transfer to CRD Records',
    number_of_songs: 16,
    selected_art: [
      "media-registry/covers/thumb/Sunlight.jpg",
      "media-registry/covers/thumb/Change-Is-Good.jpg",
      "media-registry/covers/thumb/Full-Moon.jpg",
      "media-registry/covers/thumb/Love-Never-Dies.jpg",
      "media-registry/covers/thumb/Animals.jpg"
    ]
  }

  @action
  updateProgress(val) {
    this.progressPct = val;
  }

  @action
  updateTimestamp(val) {
    this.lastUpdated = val;
  }

  @action
  setOrg(val) {
    if (this.org.id === val.id) { return; }
    this.org = val;
  }

  @action
  transition(id) {
    let { currentRouteName } = this.target;

    if (this.model.id !== id) {
      if (currentRouteName === 'media-registry.agreements' || currentRouteName === 'media-registry.cardflow') {
        return this.transitionToRoute(currentRouteName, id);
      }
    }

    this.transitionToRoute('media-registry', id);
  }

  @action
  setItemId(item) {
    if (item) {
      this.itemId = dasherize(item.song_title.trim());
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
      if (item.catalog) {
        return item.catalog.map(catalog => {
          let catalogId = dasherize(catalog.trim());
          return catalogId === id;
        }).includes(true);
      }
    });

    this.isolatedCollection = {
      title: id,
      type: 'collection',
      collection: items,
      itemType: 'masters',
      columns: [
        {
          name: 'Title',
          valuePath: 'song_title',
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


    const record = records.filter(item => {
      if (item.catalog) {
        return dasherize(item.song_title.trim()) === itemId;
      }
    })[0];

    const recordDetail = recordDetails.filter(item => {
      return dasherize(item.song_title.trim()) === itemId;
    })[0];

    const artist = profiles.filter(profile => {
      return profile.id === dasherize(record.artist.trim());
    })[0];

    if (artist) {
      record.artist_info = artist;
    }

    if (recordDetail) {
      const producer = profiles.filter(profile => (profile.id === recordDetail.producer_id))[0];
      const musicalWork = musicalWorks.filter(item => item.iswc === recordDetail.iswc_id)[0];
      record.producer = producer;
      record.details = recordDetail;
      record.musicalWork = musicalWork;
    }

    this.record = record;
  }
}
