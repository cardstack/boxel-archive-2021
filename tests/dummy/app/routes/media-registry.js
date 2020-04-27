import Route from '@ember/routing/route';

export default class MediaRegistryRoute extends Route {
  model() {
    return {
      id: 'master-recordings',
      title: 'Master Recordings',
      items: [
        {
          collectionId: 'bunny-classics',
          title: 'Bunny Classics',
          description: 'Short description of collection',
        },
        {
          collectionId: 'bunny-classics-2',
          title: 'Bunny Classics',
          description: 'Short description of collection',
        },
        {
          collectionId: 'bunny-classic-3',
          title: 'Bunny Classics',
          description: 'Short description of collection',
        }
      ]
    };
  }
}
