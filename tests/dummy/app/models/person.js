import Model, { attr } from '@ember-data/model';

export default class Person extends Model {
  @attr() firstName;
  @attr() lastName;
  @attr('boolean') isActor;
  @attr() role;
  @attr() profile;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
