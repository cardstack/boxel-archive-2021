import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class CardflowComponent extends Component {
  @tracked progress;
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

  get milestone() {
    return this._getProgress();
  }

  get milestoneId() {
    return Number(this.milestone.id);
  }

  get progressPct() {
    return Number(this.milestone.pct) / 100;
  }

  _getProgress() {
    return this.progress ? this.progress : this.args.model.workflow.milestones.find(el => el.pct === this.thread.progressPct);
  }

  _setProgress(val) {
    this.progress = val;
  }

  @action
  setProgress(val) {
    this.args.updateProgress(val);
  }
}
