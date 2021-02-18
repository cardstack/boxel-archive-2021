import Component from '@glimmer/component';

export default class MilestoneProgressComponent extends Component {
  get percentComplete() {
    let totalMilestones = this.args.milestones
      ? this.args.milestones.length
      : undefined;
    let completedCount = this.args.completedCount || 0;

    if (!totalMilestones) {
      return 0;
    }

    return Math.round((completedCount / totalMilestones) * 100);
  }
}
