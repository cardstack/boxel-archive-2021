import Controller from '@ember/controller';
import { action } from '@ember/object';
import { filterBy } from '@ember/object/computed';
// import move from 'ember-animated/motions/move';
// import resize from 'ember-animated/motions/resize';
// import adjustCSS from 'ember-animated/motions/adjust-css';
// import { printSprites } from 'ember-animated';
// import { easeOut } from 'ember-animated/easings/cosine';
// import { default as opacity } from 'ember-animated/motions/opacity';
import fade from 'ember-animated/transitions/fade';

export default class EditDemoController extends Controller {
  fade = fade;
  editing = false;

  @filterBy('model', 'expanded', true) expandedCards;

  @action toggleEdit() {
    this.set('editing', !this.editing);
  }
}
