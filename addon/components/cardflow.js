import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class CardflowComponent extends Component {
  tasklistCols = [
    {
      name: 'Assigned By',
      valuePath: 'assigned_by',
      width: 150
    },
    {
      name: 'Task',
      valuePath: 'title',
      width: 300
    },
    {
      name: 'Due Date',
      valuePath: 'due_date',
      width: 150
    },
    {
      name: 'Assignee',
      valuePath: 'assigned_to',
      width: 150
    },
    {
      name: 'Shortcut',
      valuePath: 'shortcut_link'
    }
  ];

  @tracked progress;
  @tracked actionSteps = this.args.actionSteps;
  @tracked lastUpdated = this.args.lastUpdated;

  get user() {
    return this.args.model.user;
  }

  get thread() {
    return this.args.model.thread;
  }

  get activeTasks() {
    if (!this.thread.tasks) { return null; }
    return this.thread.tasks.filter(el => !el.completed);
  }

  get completedTasks() {
    if (!this.thread.tasks) { return null; }
    return this.thread.tasks.filter(el => el.completed);
  }

  get userTasks() {
    if (!this.activeTasks || !this.user) { return null; }
    return this.activeTasks.filter(el => el.assigned_to === this.user.id);
  }

  get assignedTasks() {
    // tasks assigned from this user to others
    if (!this.activeTasks || !this.user) { return null; }
    // do not count self-assigned tasks
    return this.activeTasks.filter(el => el.assigned_by === this.user.id && el.assigned_to !== this.user.id);
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
    if (!this.milestone || !this.milestone.id) { return null; }
    return Number(this.milestone.id);
  }

  get progressPct() {
    if (!this.milestone || !this.milestone.pct) { return 0; }
    return Number(this.milestone.pct) / 100;
  }

  _getProgress() {
    if (this.thread.isCancelled) {
      return {
        "description": "Cancelled"
      };
    }
    if (this.thread.isCompleted || this.thread.progressPct === "100") {
      return this.args.model.workflow.completion;
    }
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
