import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import resize from 'ember-animated/motions/resize';
import scale from 'ember-animated/motions/scale';
import move from 'ember-animated/motions/move';
import adjustCSS from 'ember-animated/motions/adjust-css';
import { printSprites } from 'ember-animated';

export default class MovieRegistryVersionsController extends Controller {
  @tracked versions = this.model.versions;
  @tracked latest = this.versions[this.versions.length - 1];
  @tracked selected = this.latest.id;
  @tracked baseCard;
  @tracked comparisonCard;
  @tracked addedFields;
  @tracked changedFields;
  @tracked removedFields;

  @action
  setPositions() {
    for (let v of this.versions) {
      set(v, 'position', `p${this.selected - v.id}`)
    }
  }

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
      this.setPositions();
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

  @action
  * transition({ keptSprites }) {
    // printSprites(arguments[0]);
    for (let sprite of keptSprites) {
      move(sprite);
      resize(sprite);
    }
  }

  @action
  * adjustOpacity({ keptSprites }) {
    printSprites(arguments[0]);
    for (let sprite of keptSprites) {
      adjustCSS('opacity', sprite);
      move(sprite);
      scale(sprite);
    }
  }
}
