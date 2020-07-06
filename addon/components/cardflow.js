import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, get } from '@ember/object';
import { dasherize } from '@ember/string';
import { compare, isBlank } from '@ember/utils';
import { fetchCollection } from 'dummy/media';

export default class CardflowComponent extends Component {
  @tracked project = this.args.model?.user?.queueCards[0];
  @tracked isolatedCollection = [];
  @tracked catalogId = null;
  @tracked itemId = null;

  constructor(...args) {
    super(...args);
    this.getIsolatedCollection(this.catalog.id);
  }

  removed = [];

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

  get progress() {
    switch(this.project.progressPct) {
      case (20):
        return {
          pct: this.project.progressPct,
          iconLg: '/media-registry/progress-pie/progress-20pct-lg.svg',
          desc: 'Proposal Submitted'
        }
      case (40):
        return {
          pct: this.project.progressPct,
          iconLg: '/media-registry/progress-pie/progress-40pct-lg.svg',
          desc: 'Reviewing Proposal'
        }
      case (60):
        return {
          pct: this.project.progressPct,
          iconLg: '/media-registry/progress-pie/progress-60pct-lg.svg',
          desc: 'Transfer Accepted'
        }
      case (80):
        return {
          pct: this.project.progressPct,
          iconLg: '/media-registry/progress-pie/progress-80pct-lg.svg',
          desc: 'Metadata Amended'
        }
        case (100):
          return {
            pct: this.project.progressPct,
            iconLg: '/media-registry/progress-pie/progress-100pct-lg.svg',
            desc: 'Transfer Completed'
          }
      default:
        return {
          pct: 0,
          iconLg: '/assets/images/icons/progress-circle-lg.svg',
          desc: 'Not Started'
        }
    }
  }

  @action
  displayCatalog(id) {
    this.catalogId = id;
  }

  @action
  displayCatalogItem(item) {
    let itemId = dasherize(item.song_title.trim());
    this.itemId = itemId;
  }

  @action
  closeCatalogItem() {
    this.itemId = null;
  }

  @action
  closeModal() {
    this.catalogId = null;
    this.itemId = null;
  }

  @action
  async search(query) {
    let collection = this.isolatedCollection.collection;
    if (isBlank(query)) {
      return collection;
    } else {
      let lowerQuery = query.toLowerCase();
      return collection.filter(i =>
        this.isolatedCollection.columns.some(c =>
            c.isSearchable !== false &&
            c.valuePath &&
            !isBlank(i[c.valuePath]) &&
            String(i[c.valuePath]).toLowerCase().includes(lowerQuery)
        )
      );
    }
  }

  @action
  async sort(column, direction) {
    let multiplier = (direction === 'asc') ? 1 : -1;
    return this.isolatedCollection.collection.sort((a, b) => multiplier * compare(get(a, column.valuePath), get(b, column.valuePath)))
  }

  @action
  removeItem(item) {
    this.removed.push(item);
    return this.isolatedCollection.collection.filter(i => !this.removed.includes(i));
  }
}
