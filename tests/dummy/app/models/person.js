import Model, { attr } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';

export default class Person extends Model {
  @attr() firstName;
  @attr() lastName;

  @tracked firstName;
  @tracked lastName;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
