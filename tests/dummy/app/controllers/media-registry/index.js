import Controller from '@ember/controller';
import { action, get } from '@ember/object';
import { compare, isBlank } from '@ember/utils';
import scale from 'ember-animated/motions/scale';
import move from 'ember-animated/motions/move';
import { parallel } from 'ember-animated';
import { formatId } from '@cardstack/boxel/utils/format-id';
// import { printSprites } from 'ember-animated';

export default class MediaRegistryIndexController extends Controller {
  removed = [];

  @action
  transitionToIsolate(item) {
    this.transitionToRoute('media-registry.collection', formatId(item.catalog_title));
  }

  @action
  transitionToEdit() {
    this.transitionToRoute('media-registry.edit');
  }

  @action
  transitionToView() {
    this.transitionToRoute('media-registry');
  }

  @action
  async search(query) {
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
            String(i[c.valuePath]).toLowerCase().includes(lowerQuery)
        )
      );
    }
  }

  @action
  async sort(column, direction) {
    let multiplier = (direction === 'asc') ? 1 : -1;
    return this.model.collection.sort((a, b) => multiplier * compare(get(a, column.valuePath), get(b, column.valuePath)))
  }

  @action
  removeItem(item) {
    this.removed.push(item);
    return this.model.collection.filter(i => !this.removed.includes(i));
  }

  @action
  * transition({ sentSprites, receivedSprites }) {
    // printSprites(arguments[0]);
    for (let sprite of sentSprites) {
      parallel(move(sprite), scale(sprite));
      sprite.applyStyles({ 'z-index': '1' });
    }

    for (let sprite of receivedSprites) {
      parallel(move(sprite), scale(sprite));
    }
  }
}
