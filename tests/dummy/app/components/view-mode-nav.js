import Component from '@ember/component';
import { action, set } from '@ember/object';
import { tagName } from '@ember-decorators/component';

@tagName('')
export default class ViewModeNavComponent extends Component {
  showModeMenu = false;

  @action
  viewGridPage() {
    set(this.model, 'selected', true);
    this.transitionToRoute('catalog.events');
  }

  @action
  toggleModeMenu() {
    set(this, 'showModeMenu', !this.showModeMenu);
  }

}