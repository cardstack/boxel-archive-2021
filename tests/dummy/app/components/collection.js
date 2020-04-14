import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';

export default class CollectionComponent extends Component {
  @tracked listSelected = false;

  @action
  listSelect() {
    this.listSelected = true;
  }

  @action
  listUnselect() {
    this.listSelected = false;
  }

  @action
  itemSelect(item) {
    set(item, "selected", true);
    this.listSelected = false;
  }

  @action
  itemUnselect(item) {
    set(item, "selected", false);
  }
}
