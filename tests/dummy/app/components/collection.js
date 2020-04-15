import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';

export default class CollectionComponent extends Component {
  @tracked list = this.args?.field?.value;
  @tracked listSelected = false;
  @tracked displayItemActions = false;
  @tracked pickedItems;
  @tracked selectedAll;

  @action
  listSelect() {
    this.itemUnselect();
    this.listSelected = true;
  }

  @action
  listUnselect() {
    this.listSelected = false;
  }

  @action
  itemSelect(id) {
    for (let item of this.list) {
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
  itemUnselect() {
    for (let item of this.list) {
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
  togglePick(id) {
    for (let item of this.list) {
      if (item.id === id) {
        set(item, "picked", !item.picked);
      }
    }
    this.pickedItems = this.list.filter(item => item.picked).length;
  }

  @action
  toggleSelectAll() {
    if (this.selectedAll) {
      for (let item of this.list) {
        set(item, "picked", false);
      }
      this.selectedAll = false;
      this.pickedItems = 0;
    } else {
      for (let item of this.list) {
        set(item, "picked", true);
      }
      this.selectedAll = true;
      this.pickedItems = this.list.length;
    }
  }
}
