import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class CardSpaceIndexController extends Controller {
  @action
  transitionToSpace() {
    this.transitionToRoute('cardstack.card-space.new');
  }
}
