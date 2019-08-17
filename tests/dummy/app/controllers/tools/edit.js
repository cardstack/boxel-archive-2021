import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default class ToolsEditController extends Controller {
  @computed('model', 'model.imageUrl')
  get backgroundImageUrl() {
    return htmlSafe(`background-image: url(${this.model.imageUrl})`);
  }

  @computed('model', 'modelName')
  get modelName() {
    return this.model.constructor.modelName;
  }

  @action
  async preview() {
    await this.model.save();

    return await this.transitionToRoute('tools.preview', this.modelName, this.model.id);
  }

  @action
  async save() {
    await this.model.save();

    this.transitionToRoute('articles', this.model);
  }
}
