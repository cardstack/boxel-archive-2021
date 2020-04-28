import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MovieRegistryVersionsController extends Controller {
  @tracked versions = this.model.versions;
  @tracked latest = this.versions[this.versions.length - 1].id;
  @tracked selected = this.latest;
  @tracked baseCard;
  @tracked comparisonCard;
  @tracked addedFields;
  @tracked changedFields;
  @tracked removedFields;

  @action
  reset() {
    this.baseCard = null;
    this.comparisonCard = null;
    this.addedFields = [];
    this.changedFields = [];
    this.removedFields = [];
  }

  @action
  displayVersion(id) {
    if (this.baseCard && this.baseCard === id) {
      this.reset();
      this.selected = id;
    } else if (this.baseCard) {
      this.comparisonCard = id;
      this.compareCards();
    } else {
      this.selected = id;
    }
  }

  @action
  setComparison(id) {
    if (this.baseCard && this.baseCard === id) {
      this.reset();
    } else if (this.baseCard) {
      this.comparisonCard = id;
      this.compareCards();
    } else {
      this.baseCard = id;
      this.selected = id;
    }
  }

  @action
  compareCards() {
    this.addedFields = [];
    this.changedFields = [];
    this.removedFields = [];

    let baseCard = this.versions.filter(v => v.id === this.baseCard)[0];
    let comparisonCard = this.versions.filter(v => v.id === this.comparisonCard)[0];

    let card1, card2;
    if (baseCard.id < comparisonCard.id) {
      card1 = baseCard.savedData;
      card2 = comparisonCard.savedData;
    } else {
      card1 = comparisonCard.savedData;
      card2 = baseCard.savedData;
    }

    let [ json1, json2 ] = [ card1, card2 ].map(data => JSON.stringify(data));

    if (json1 === json2) {
      console.log('no change');
      return;
    }

    for (let field in card1) {
      if (card2[field] === undefined) {
        this.removedFields.push(field);
      }

      for (let f in card2) {
        if (field === f) {
          if (card1[field].value !== card2[f].value) {
            this.changedFields.push(field);
          }
        }
      }
    }

    for (let field in card2) {
      if (card1[field] === undefined) {
        this.addedFields.push(field);
      }
    }
  }
}
