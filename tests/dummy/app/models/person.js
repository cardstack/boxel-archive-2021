import Model, { attr, hasMany } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';

export default class Person extends Model {
  @attr() firstName;
  @attr() lastName;
  @attr('boolean') isActor;
  @attr() role;
  @hasMany('movie') movies;

  @tracked firstName;
  @tracked lastName;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
