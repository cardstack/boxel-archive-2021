import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class EdgesService extends Service {
  @tracked displayLeftEdge = false;

  @action
  showLeftEdge() {
    this.displayLeftEdge = true;
  }

  @action
  hideLeftEdge() {

  }
}
