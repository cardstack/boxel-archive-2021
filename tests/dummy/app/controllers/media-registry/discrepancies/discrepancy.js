import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { typeOf } from '@ember/utils';

export default class MediaRegistryDiscrepanciesDiscrepancyController extends Controller {
  @tracked count = 0;
  @tracked addedValues = [];
  @tracked changedFields = [];
  @tracked addedCards = [];
  @tracked modifiedValues = [];
  @tracked modifiedCards = [];
  @tracked removedValues = [];

  @action
  reset() {
    this.count = 0;
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
    if (!field.value && compField.value && compField.type !== 'collection') {
      return this.addedValues.push(compField.title);
    }

    // removed field value
    if (field.value && !compField.value) {
      return this.removedValues.push(field.title);
    }

    if (compField.type === 'collection') {
      return this.collectionComparison(field, compField);
    }

    if (typeOf(compField.value) === 'array') {
      for (let val of compField.value) {
        if (val.type === 'collection') {
          this.collectionComparison(field, val.value);
        }
        else {
          this.modifiedValues.push(field.title);
        }
      }

      if (this.addedCards.length || this.modifiedCards.length || this.modifiedValues.length) {
        return true;
      } else {
        return;
      }
    }

    return;
  }

  @action
  collectionComparison(field, compField) {
    let fieldJSON = JSON.stringify(field);

    for (let v of compField.value) {
      let vJSON = JSON.stringify(v);

      if (!fieldJSON.includes(vJSON)) {
        if (fieldJSON.includes(v.id)) {
          this.modifiedCards.push(v);
        } else {
          this.addedCards.push(v);
        }
      }
    }

    if (this.addedCards.length || this.modifiedCards.length) {
      return true;
    } else {
      return;
    }
  }

  @action
  reconciliateField(field, compField) {
    set(field, 'new', {});
    set(field.new, 'title', compField.title);
    set(field.new, 'value', compField.value);

    if (compField.type) {
      set(field.new, 'type', compField.type);
    }

    if (compField.component) {
      set(field.new, 'component', compField.component);
    }

    this.count++;
  }

  @action
  revertField(field) {
    set(field, 'new', false);
    this.count--;
  }
}
