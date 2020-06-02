import MediaCollectionComponent from './media-collection';
import { action, set } from '@ember/object';

export default class MediaCollectionTableComponent extends MediaCollectionComponent {
  @action
  toggleSelect(item) {
    let collection = this.args.collection;
    set(item, 'selected', !item.selected);
    set(collection, 'selectedItemCount', collection.filter(item => item.selected).length);
    set(collection, 'selectedAll', collection.length === collection.selectedItemCount);
  }

  @action
  selectOrTransition(item) {
    let collection = this.args.collection;
    if (collection.selectedItemCount > 0) {
      this.toggleSelect(item);
    } else {
      this.args.transition(item);
    }
  }
}
