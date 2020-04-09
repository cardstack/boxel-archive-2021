import Route from '@ember/routing/route';

export default class CatalogEventsViewRoute extends Route {
  model({ id }) {
    return this.store.peekRecord('event', id);
  }
}
