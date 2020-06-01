import Component from '@glimmer/component';
import { timeout } from "ember-concurrency";
import { task } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CollectionAddButtonComponent extends Component {
  @tracked newItem;
  @tracked isAdding;


  @task
  *addItem(newItemWrapper) {
    this.newItem = newItemWrapper.item || newItemWrapper;


    yield timeout(4000);

    this.args.addItem(this.newItem);

    this.newItem = null;
    this.isAdding = false;
  }

  @action focusSearch(container) {
    container.querySelector('input').focus();
  }
}
