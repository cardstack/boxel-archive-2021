import Model, { attr, hasMany } from '@ember-data/model';

export default class Movie extends Model {
  @attr() title;
  @attr() year;
  @attr() type;
  @attr() avgUserRating;
  @attr() poster;
  @attr() mpaaRating;
  @attr() runTime;
  @hasMany('genre') genres;
  @attr() releaseDate;
  @attr() description;
  @hasMany('person') cast;
  @hasMany('photo') photos;
}
