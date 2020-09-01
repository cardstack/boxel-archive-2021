import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
// import { action, get } from '@ember/object';
// import { compare, isBlank } from '@ember/utils';

export default class CardflowQueueComponent extends Component {
  @tracked displayFormat = "list";

  get user() {
    if (!this.args.model) { return null; }
    return this.args.user || this.args.model.user;
  }
}
