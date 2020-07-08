import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MediaRegistryController extends Controller {
  @tracked org = this.model;

  @action
  setOrg(val) {
    if (this.org.id === val.id) { return; }
    this.org = val;
  }

  @action
  transition(id) {
    let { currentRouteName } = this.target;

    if (this.model.id !== id) {
      if (currentRouteName === 'media-registry.agreements' || currentRouteName === 'media-registry.cardflow') {
        return this.transitionToRoute(currentRouteName, id);
      }
    }

    this.transitionToRoute('media-registry', id);
  }
}
