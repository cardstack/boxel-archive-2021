import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class CatalogCreateNewController extends Controller {
  @action
  showDetailView(field) {
    this.set('displayDetailView', true);
    this.set('selectedField', field);
  }

  @action
  hideDetailView() {
    this.set('displayDetailView', false);
    this.set('selectedField', null);
  }
}
