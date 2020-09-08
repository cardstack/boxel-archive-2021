import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class CardflowComponent extends Component {
  @tracked actionSteps = this.args.actionSteps;
  @tracked lastUpdated = this.args.lastUpdated;

  get thread() {
    return this.args.model.thread;
  }

  get user() {
    return this.args.model.user;
  }

  get participants() {
    return this.args.model.participants;
  }

  get org() {
    return this.args.model.currentOrg;
  }

  get participatingOrgMembers() {
    if (!this.participants || !this.participants.length) { return null; }
    if (!this.org) { return null; }
    return this.participants.filter(el => el.org_ids && el.org_ids.includes(this.org.id));
  }

  get otherParticipants() {
    if (!this.participants) { return null; }
    if (!this.participatingOrgMembers || !this.participatingOrgMembers.length) {
      return this.participants;
    }
    return this.participants.filter(el => !el.org_ids || !el.org_ids.includes(this.org.id));
  }

  @action
  setProgress(val) {
    this.args.updateProgress(val);
  }
}
