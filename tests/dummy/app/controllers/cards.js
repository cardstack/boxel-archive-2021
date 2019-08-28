import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class CardsController extends Controller {
  queryParams = ['cardNumber'];

  @action expand(id) {
    this.transitionToRoute({ queryParams: { cardNumber: id }});
  }
}
