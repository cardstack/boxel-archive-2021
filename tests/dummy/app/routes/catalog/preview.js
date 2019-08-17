import Route from '@ember/routing/route';
import { computed } from '@ember/object';

export default class CatalogPreviewRoute extends Route {
  @computed('model', 'modelName')
  get modelName() {
    return this.model.constructor.modelName;
  }

  model({ model }) {
    return this.store.peekRecord(model, 'sample');
  }
}
