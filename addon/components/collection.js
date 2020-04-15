import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';

export default class CollectionComponent extends Component {
  @tracked collection = this.args?.field?.value;
  @tracked collectionSelected;
  @tracked displayItemActions;
  @tracked pickedItems;
  @tracked selectedAll;

  @action
  collectionSelect() {
    this.itemUnselect();
    this.collectionSelected = true;
  }

  @action
  collectionUnselect() {
    this.collectionSelected = false;
  }

  @action
  itemSelect(id) {
    for (let item of this.collection) {
      if (item.id === id) {
        set(item, "selected", true);
      }
      else {
        set(item, "selected", false);
      }
    }
    this.collectionUnselect();
  }

  @action
  itemUnselect() {
    for (let item of this.collection) {
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
    for (let item of this.collection) {
      if (item.id === id) {
        set(item, "picked", !item.picked);
      }
    }
    this.pickedItems = this.collection.filter(item => item.picked).length;
  }

  @action
  toggleSelectAll() {
    if (this.selectedAll) {
      for (let item of this.collection) {
        set(item, "picked", false);
      }
      this.selectedAll = false;
      this.pickedItems = 0;
    } else {
      for (let item of this.collection) {
        set(item, "picked", true);
      }
      this.selectedAll = true;
      this.pickedItems = this.collection.length;
    }
  }

  @action
  removeItem(id) {
    this.collection = this.collection.filter(item => item.id !== id);
  }
}
