import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { typeOf } from '@ember/utils';

export default class MediaRegistryDiscrepanciesDiscrepancyController extends Controller {
  @tracked addedValues = [];
  @tracked removedModifiedValues = [];
  @tracked changedFields = [];
  @tracked changedCards = [];
  @tracked addedCards = [];
  @tracked removedCards = [];
  @tracked modifiedCard = {};

  @action
  compareFields(field, compField) {
    if (!field.value && compField.value) {
      this.addedValues.push(compField.title);
    }

    // using 'removedModifiedValues' instead of 'removedValues'
    else if (field.value && !compField.value) {
      this.removedModifiedValues.push(field.title);
    }

    else if (field.type === 'card' && compField.type === 'card') {
      this.modifiedCard = {
        value: compField.value,
        oldValue: field.value
      };
    }

    else {
      this.changedFields.push({
        title: field.title,
        oldValue: field.value,
        value: compField.value
      });
    }
  }
}
