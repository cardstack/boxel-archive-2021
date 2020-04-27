import Route from '@ember/routing/route';

export default class MediaRegistryCollectionRoute extends Route {
  model({ collectionId }) {
    return {
      collectionId,
      title: 'Bunny Classics',
      items: [
        {
          itemId: 'a-day-to-sing',
          title: 'A day to sing',
          artist: 'Pia Midina',
        },
        {
          itemId: 'a-day-to-sing-2',
          title: 'A day to sing',
          artist: 'Pia Midina',
        }
      ]
    };
  }
}
