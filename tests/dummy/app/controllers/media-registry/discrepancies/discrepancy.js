import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { typeOf } from '@ember/utils';

export default class MediaRegistryDiscrepanciesDiscrepancyController extends Controller {
  @tracked addedValues = [];
  @tracked changedFields = [];
  @tracked addedCards = [];
  @tracked modifiedValues = [];
  @tracked modifiedCards = [];
  @tracked removedValues = [];

  @action
  reset() {
    this.addedValues = [];
    this.changedFields = [];
    this.addedCards = [];
    this.modifiedValues = [];
    this.modifiedCards = [];
    this.removedValues = [];
  }

  @action
  compareFields(field, compField) {
    let [ json1, json2 ] = [ field, compField ].map(data => JSON.stringify(data));

    if (json1 === json2) {
      return;
    }

    // added field value
    if (!field.value && compField.value) {
      return this.addedValues.push(compField.title);
    }

    // removed field value
    if (field.value && !compField.value) {
      return this.removedValues.push(field.title);
    }

    if (typeOf(compField.value) === 'array') {
      let fieldJSON = JSON.stringify(field);

      for (let val of compField.value) {
        if (val.type === 'collection') {
          for (let v of val.value) {
            let vJSON = JSON.stringify(v);

            if (!fieldJSON.includes(vJSON)) {
              if (fieldJSON.includes(v.id)) {
                this.modifiedCards.push(v);
              } else {
                this.addedCards.push(v);
              }
            }
          }
        }
        else {
          this.modifiedValues.push(field.title);
        }
      }

      if (this.addedCards.length || this.modifiedCards.length || this.modifiedValues.length) {
        return 'hasValue';
      } else {
        return;
      }
    }

    return;
  }
}
