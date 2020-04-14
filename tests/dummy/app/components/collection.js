import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';

export default class CollectionComponent extends Component {
  @tracked listSelected = false;
  @tracked itemSelected = false;

  @action
  listSelect() {
    this.listSelected = true;
    this.itemSelected = false;
  }

  @action
  listUnselect() {
    this.listSelected = false;
  }

  @action
  itemSelect(id, list) {
    for (let item of list) {
      if (item.id === id) {
        set(item, "selected", true);
        this.listSelected = false;
      }
    }
  }

  @action
  itemUnselect(id, list) {
    for (let item of list) {
      if (item.id === id) {
        set(item, "selected", false);
      }
    }
  }
}
