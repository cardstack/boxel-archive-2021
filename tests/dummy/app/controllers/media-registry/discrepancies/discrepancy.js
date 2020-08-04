import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { typeOf } from '@ember/utils';

export default class MediaRegistryDiscrepanciesDiscrepancyController extends Controller {
  @tracked addedValues = [];
  @tracked changedFields = [];
  @tracked changedCards = [];
  @tracked addedCards = [];
  @tracked removedCards = [];
  @tracked modifiedValues = [];
  @tracked modifiedCard = {};

  @action
  reset() {
    this.addedValues = [];
    this.changedFields = [];
    this.changedCards = [];
    this.addedCards = [];
    this.removedCards = [];
    this.modifiedValues = [];
    this.modifiedCard = {};
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

    if (compField.type === 'card') {
      return this.modifiedCard = {
        value: compField.value,
        oldValue: field.value
      };
    }

    if (compField.type === 'collection') {
      return;
    }

    if (typeOf(compField.value) === 'array') {
      let fieldJSON = JSON.stringify(field);

      for (let val of compField.value) {
        let valJSON = JSON.stringify(val);

        if (val.type === 'card') {
          if (!fieldJSON.includes(valJSON)) {
            this.addedCards.push(val);
          }
        }
        else if (val.type === 'collection') {
          for (let v of val.value) {
            let vJSON = JSON.stringify(v);
            if (!fieldJSON.includes(vJSON)) {
              this.addedCards.push(v);
            }
          }
        }
        else {
          this.modifiedValues.push(field.title);
        }
      }

      if (this.addedCards.length || this.modifiedValues.length) {
        return 'hasValue';
      } else {
        return;
      }
    }

    return;
  }
}
