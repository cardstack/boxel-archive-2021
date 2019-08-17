import Controller from '@ember/controller';
import { action, computed } from '@ember/object';

export default class ToolsPreviewController extends Controller {
  @computed('model', 'modelName')
  get modelName() {
    return this.model.constructor.modelName;
  }

  @action
  edit() {
    return this.transitionToRoute('tools.edit', this.modelName, this.model.id);
  }
}
