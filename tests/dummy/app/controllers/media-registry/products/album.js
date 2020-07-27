import Controller from '@ember/controller';

export default class MediaRegistryProductsAlbumController extends Controller {
  get headerDetailFields() {
    if (!this.model) { return null; }
    return [
      {
        title: 'label',
        value: this.model.owner
      },
      {
        title: 'Release Type',
        value: this.model.type_of_album
      },
      {
        title: 'tracks',
        value: this.model.tracks.length
      }
    ];
  }
}
