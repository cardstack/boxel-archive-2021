import Route from '@ember/routing/route';

export default class MovieRegistryRoute extends Route {
  model() {
    return this.store.findAll('movie');
  }
}
