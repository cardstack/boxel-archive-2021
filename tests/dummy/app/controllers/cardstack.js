import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class CardStackController extends Controller {
  @service('edges') edges;
}
