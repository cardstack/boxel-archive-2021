import Route from '@ember/routing/route';

export default class CardsIndexRoute extends Route {
  model() {
    return [
      { id : "1", title: 'Card 1' },
      { id : "2", title: 'Card 2' },
      { id : "3", title: 'Card 3' }
    ]
  }
}
