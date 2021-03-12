import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { reads, equal } from 'macro-decorators';

export default class EdgesService extends Service {
  @service('router') routerService;
  @tracked displayLeftEdge = false;
  @tracked darkTheme = true;

  // hides the edges from cardstack.card-pay routes
  @reads('routerService.currentRoute.parent.name') routeName;
  @equal('routeName', 'cardstack.card-pay') disableEdges;

  @action
  showLeftEdge() {
    this.displayLeftEdge = true;
  }

  @action
  hideLeftEdge() {
    this.displayLeftEdge = false;
  }

  @action
  hasLightTheme() {
    this.darkTheme = false;
  }

  @action
  hasDarkTheme() {
    this.darkTheme = true;
  }
}
