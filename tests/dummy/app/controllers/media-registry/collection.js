import MediaRegistryIndexController from './index';
import { action } from '@ember/object';
import { dasherize } from '@ember/string';
import { isBlank } from '@ember/utils';


export default class MediaRegistryCollectionController extends MediaRegistryIndexController {
  @action
  selectOrTransitionToDetail(item) {
    let itemId = dasherize(item.song_title.trim());
    this.transitionToRoute('media-registry.item', itemId);
  }

  @action
  transitionToPrevious() {
    this.transitionToRoute('media-registry.collection', this.model.title);
  }

  @action async search(query) {
    let collection = this.model.collection;
    if (isBlank(query)) {
      return collection;
    } else {
      let lowerQuery = query.toLowerCase();
      return collection.filter(i =>
        this.model.columns.some(c =>
           c.isSearchable !== false &&
           c.valuePath &&
           !isBlank(i[c.valuePath]) &&
           i[c.valuePath].toLowerCase().includes(lowerQuery)
        )
      );
    }
  }
}