import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class CatalogRoute extends Route {
  model() {
    return RSVP.hash({
      articles: this.store.findAll('article'),
      events: this.store.findAll('event')
    });
  }
}
