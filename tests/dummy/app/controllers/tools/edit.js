import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ToolsEditController extends Controller {
  @action
  async save() {
    await this.model.save();

    this.transitionToRoute('articles', this.model);
  }
}