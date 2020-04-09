import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class CatalogToolsPreviewController extends Controller {
  @action
  edit() {
    return this.transitionToRoute('catalog.tools.edit', this.model.constructor.modelName, this.model.id);
  }
}
