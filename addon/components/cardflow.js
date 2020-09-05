import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class CardflowComponent extends Component {
  @tracked actionSteps = this.args.actionSteps;
  @tracked lastUpdated = this.args.lastUpdated;

  get project() {
    return this.args.model;
  }

  @action
  setProgress(val) {
    this.args.updateProgress(val);
  }
}
