import Route from '@ember/routing/route';

export default class MovieRegistryEditRoute extends Route {
  model({ id }) {
    return this.store.peekRecord('movie', id);
  }
}
