import Route from '@ember/routing/route';

export default class MediaRegistryItemRoute extends Route {
  model({ itemId }) {
    return {
      itemId: itemId,
      title: 'A day to sing',
      artist: 'Pia Midina',
      attributes: {
        writer: 'Pia Midina',
      },
    };
  }
}
