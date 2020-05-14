import Controller from '@ember/controller';
import { action } from '@ember/object';
import { dasherize } from '@ember/string';

export default class MediaRegistryItemController extends Controller {
  get headerDetailFields() {
    return [
      {
        title: 'catalog no.',
        value: 'BRN-19230-1239049'
      },
      {
        title: 'verifi id',
        value: '0x9b21…ca26'
      },
      {
        title: 'label',
        value: this.model.owner
      },
    ];
  }

  @action
  transitionToEdit() {
    let itemId = dasherize(this.model.song_title.trim());
    this.transitionToRoute('media-registry.item.edit', itemId);
  }
}
