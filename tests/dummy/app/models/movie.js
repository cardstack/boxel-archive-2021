import Model, { attr } from '@ember-data/model';

export default class Movie extends Model {
  @attr() title;
  @attr() year;
  @attr() type;
  @attr() avgUserRating;
  @attr() mpaaRating;
  @attr() runTime;
  @attr() genres;
  @attr() releaseDate;
  @attr() description;
  @attr() cast;
  @attr() photos;
}
