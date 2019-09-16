import Route from '@ember/routing/route';

export default class FormCardsEditRoute extends Route {
  model({ id }) {
    return { id, title: `Card ${id}` };
  }
}
