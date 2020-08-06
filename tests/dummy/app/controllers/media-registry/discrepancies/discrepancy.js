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
    // assumption: cards have the same fields even if values might be null

    let [ json1, json2 ] = [ field, compField ].map(data => JSON.stringify(data));

    if (json1 === json2) {
      set(compField, 'status', 'same');
      return;
    }

    if (compField.type === 'collection' || field.type === 'collection') {
      this.collectionComparison(field, compField);
      return;
    }

    if (!field.value && compField.value) {
      if (compField.type === 'card') {
        set(compField, 'status', 'addedCard');
        return;
      }
      set(compField, 'status', 'addedValue');
      return;
    } // added

    if (field.value && !compField.value) {
      if (field.type === 'card') {
        set(compField, 'status', 'removedCard');
        set(compField, 'previousValue', field.value);
        return;
      }
      set(compField, 'status', 'removedValue');
      set(compField, 'previousValue', field.value);
      return;
    } // removed

    if (compField.type === 'card' || compField.id) {
      if (field.type === 'card' || field.id) {
        set(compField, 'status', 'modifiedCard');
        set(compField, 'previousValue', field.value);
        return;
      }
    } // modified

    set(compField, 'status', 'modifiedValue');
    set(compField, 'previousValue', field.value);
    return;
  }

  @action
  collectionComparison(field, compField) {
    if (!field.value && !compField.value) {
      set(compField, 'status', 'same');
      return;
    }

    if (!field.value) {
      for (let card of compField.value) {
        set(card, 'status', 'addedCard');
      }
      return;
    }

    if (!compField.value) {
      set (compField, 'compCollection', []);
      set (compField, 'type', field.type);
      set (compField, 'component', field.component);

      for (let card of field.value) {
        set(card, 'status', 'removedCard');
        set(compField, 'compCollection', [ ...compField.compCollection, card ]);
      }
      return;
    }

    if (field.value.length && compField.value.length) {
      set (compField, 'compCollection', [ ...compField.value ]);

      for (let card of compField.value) {
        let eqCard = field.value.find(el => el.id === card.id);
        if (eqCard) {
          this.compareFields(eqCard, card);
        } else {
          set(card, 'status', 'addedCard');
        }
      }

      for (let card of field.value) {
        let eqCard = compField.value.find(el => el.id === card.id);
        if (!eqCard) {
          set(card, 'status', 'removedCard');
          set(compField, 'compCollection', [ ...compField.compCollection, card ]);
        }
      }
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
