import Route from '@ember/routing/route';

export default class CardsPreviewRoute extends Route {
  model({ id }) {
    return { id, title: `Card ${id}` };
  }
}
