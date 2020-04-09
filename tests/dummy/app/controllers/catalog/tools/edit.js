import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default class CatalogToolsEditController extends Controller {
  @tracked model;

  get backgroundImageUrl() {
    return htmlSafe(`background-image: url(${this.model.imageUrl})`);
  }

  @action
  async preview() {
    await this.model.save();

    return await this.transitionToRoute('catalog.tools.preview', this.model.constructor.modelName, this.model.id);
  }

  @action
  async save() {
    await this.model.save();

    this.transitionToRoute('articles', this.model);
  }
}