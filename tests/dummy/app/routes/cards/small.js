import Route from '@ember/routing/route';

export default class CardsSmallRoute extends Route {
  model({ id }) {
    return { id, title: `Card ${id}` };
  }
}
