import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CardStackController extends Controller {
  @service('cardstack-session') cardstackSession;
  @service('edges') edges;

  @action updateEdges() {
    this.edges.showLeftEdge();
    this.edges.hasDarkTheme(); // updates top-edge button variant
  }

  @action transitionHome() {
    this.transitionToRoute('cardstack');
  }
}
