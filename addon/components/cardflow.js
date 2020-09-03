import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class CardflowComponent extends Component {
  @tracked project = this.args.org?.queueCards[0];
  @tracked actionSteps = this.args.actionSteps;
  @tracked lastUpdated = this.args.lastUpdated;

  @action
  setProgress(val) {
    this.args.updateProgress(val);
  }
}
