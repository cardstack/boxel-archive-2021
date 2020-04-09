import Route from '@ember/routing/route';

export default class MovieRegistryViewRoute extends Route {
  model({ id }) {
    return this.store.peekRecord('movie', id);
  }
}
