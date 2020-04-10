import Route from '@ember/routing/route';
import IMDB from '../../imdb';

export default class MovieRoute extends Route {
  model({ id }) {
    let movie = IMDB.movies.filter(item => item.id === id)[0];
    for (const field in movie) {
      let fieldObj = movie[field];
      if (fieldObj.isCollection && fieldObj.relationshipIds.length) {
        let items = [];
        fieldObj.relationshipIds.filter(id => {
          let item = IMDB[fieldObj.type].filter(i => i.id === id)[0];
          items.push(item);
        });
        movie[field].value = items;
      }
    }
    return movie;
  }
}
