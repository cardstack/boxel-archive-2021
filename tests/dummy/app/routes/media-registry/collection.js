import Route from '@ember/routing/route';
import { fetchCollection } from 'dummy/media';
import { formatId } from '@cardstack/boxel/utils/format-id';

export default class MediaRegistryCollectionRoute extends Route {
  async model({ collectionId }) {
    const records = await fetchCollection('all_tracks_combined');
    let tracks = records.filter(item => {
      if (item.catalog) {
        return item.catalog.map(catalog => {
          let catalogId = formatId(catalog);
          return catalogId === collectionId;
        }).includes(true);
      }
    });
    tracks.map(el => el.id = formatId(el.song_title));
    return {
      id: collectionId,
      title: collectionId,
      type: 'collection',
      collection: tracks,
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
          isFixed: 'right'
        },
      ],
    };
  }
}
