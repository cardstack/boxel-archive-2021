import Route from '@ember/routing/route';

export default class CardsSmallRoute extends Route {
  model({ cardId }) {
    return { id: cardId, title: `Card ${cardId}` };
  }
}
