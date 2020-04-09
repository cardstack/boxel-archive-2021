import Model, { attr } from '@ember-data/model';

export default class Photo extends Model {
  @attr() src;
  @attr() title;
  @attr() altText;
  @attr() width;
  @attr() height;
}
