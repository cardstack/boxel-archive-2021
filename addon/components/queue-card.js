import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class QueueCardComponent extends Component {
  @service router;

  get members() {
    let members = this.args.card.members;
    let maxMembers = 2;

    if (!members) { return null; }

    if (members.length > maxMembers) {
      let remaining = members.length - maxMembers;
      return `${members[0]}, ${members[1]}, +${remaining} more`;
    }

    return members.toString().replace(',', ', ');
  }

  get progress() {
    switch(this.args?.currentMilestone?.pct || this.args.card.progressPct) {
      case (0):
        return {
          status: 'not started',
          icon: '/media-registry/progress-pie/progress-circle-dark.svg',
          iconOpen: '/assets/images/icons/progress-circle.svg'
        }
      case (20):
        return {
          status: 'proposal',
          icon: '/media-registry/progress-pie/progress-20pct-dark.svg',
          iconOpen: '/media-registry/progress-pie/progress-20pct.svg'
        }
      case (40):
        return {
          status: 'under-review',
          icon: '/media-registry/progress-pie/progress-40pct-dark.svg',
          iconOpen: '/media-registry/progress-pie/progress-40pct.svg'
        }
      case (60):
        return {
          status: 'transfer-accepted',
          icon: '/media-registry/progress-pie/progress-60pct-dark.svg',
          iconOpen: '/media-registry/progress-pie/progress-60pct.svg'
        }
      case (80):
        return {
          status: 'redeliver',
          icon: '/media-registry/progress-pie/progress-80pct-dark.svg',
          iconOpen: '/media-registry/progress-pie/progress-80pct.svg'
        }
      case (100):
        return {
          status: 'complete',
          icon: '/media-registry/progress-pie/progress-100pct-dark.svg',
          iconOpen: '/media-registry/progress-pie/progress-100pct.svg'
        }
      default:
        return null;
    }
  }

  @action
  openThread() {
    let pct = this.args?.currentMilestone?.pct || this.args.card.progressPct;
    if (this.args.updateProgress && pct === 20 && this.args.orgId === 'crd_records') {
      // when steve opens the thread for the first time, thread should get to 40% completion
      this.args.updateProgress(40);
    }
    this.router.transitionTo('media-registry.cardflow', this.args.orgId);
  }
}
