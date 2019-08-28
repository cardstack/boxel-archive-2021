import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class CardsIndexController extends Controller {
  queryParams = ['cardNumber'];

  @action expand(id) {
    this.transitionToRoute({ queryParams: { cardNumber: id }});
  }

  @action toMotionOne(id) {
    this.transitionToRoute('cards.small', id);
  }
}
