import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';

export default class CollectionComponent extends Component {
  @tracked listSelected = false;
  @tracked displayItemActions = false;
  @tracked pickedItems;

  @action
  listSelect(list) {
    this.itemUnselect(list);
    this.listSelected = true;
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
      }
      else {
        set(item, "selected", false);
      }
    }
    this.listUnselect();
  }

  @action
  itemUnselect(list) {
    for (let item of list) {
      set(item, "selected", false);
    }
  }

  @action
  openItemActionsMenu() {
    this.displayItemActions = true;
    // TODO
  }

  @action
  expand() {
    // TODO
  }

  @action
  togglePick(id, list) {
    for (let item of list) {
      if (item.id === id) {
        set(item, "picked", !item.picked);
      }
    }
    this.pickedItems = list.filter(item => item.picked).length;
  }
}
