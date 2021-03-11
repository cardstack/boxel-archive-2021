import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CardSpaceNewController extends Controller {
  @tracked displayLeftEdge = false;

  @action
  showLeftEdge() {
    this.displayLeftEdge = true;
  }
}
