import Component from '@glimmer/component';

export default class QueueCardComponent extends Component {
  get participants() {
    let participants = this.args.card.participants;
    let max = 2;

    if (!participants) { return null; }

    if (participants.length > max) {
      let remaining = participants.length - max;
      return `${participants[0]}, ${participants[1]}, +${remaining} more`;
    }

    return participants.toString().replace(',', ', ');
  }

  get progress() {
    return this.args.card.currentMilestone;
  }

  get progressPct() {
    let pct = this.args.card.progressPct;
    return Number(pct) / 100;
  }
}
