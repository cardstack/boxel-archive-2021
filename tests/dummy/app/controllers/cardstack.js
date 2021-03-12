import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { or } from 'macro-decorators';

export default class CardStackController extends Controller {
  @service('cardstack-session') cardstackSession;
  @service('edges') edges;
  @or('edges.displayLeftEdge', 'cardstackSession.isAuthenticated') displayLeftEdge;


  @action updateEdges() {
    this.edges.showLeftEdge();
    this.edges.hasDarkTheme(); // updates top-edge button variant
  }

  @action transitionHome() {
    this.transitionToRoute('cardstack');
  }
}
