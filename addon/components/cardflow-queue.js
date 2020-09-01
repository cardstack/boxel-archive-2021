import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class CardflowQueueComponent extends Component {
  @tracked displayFormat = "list";

  get user() {
    if (!this.args.model) { return null; }
    return this.args.user || this.args.model.user;
  }

  get unreadCards() {
    if (!this.args.model || !this.args.model.queueCards) { return null; }
    let unreadCards = this.args.model.queueCards.filter(el => el.status === 'unread');
    return this.sortedCards(unreadCards);
  }

  get actionReqCards() {
    if (!this.args.model || !this.args.model.queueCards) { return null; }
    let actionReqCards = this.args.model.queueCards.filter(el => el.status === 'needs-response');
    return this.sortedCards(actionReqCards);
  }

  get recentCards() {
    if (!this.args.model || !this.args.model.queueCards) { return null; }
    let recentCards = this.args.model.queueCards.filter(el => el.status !== 'unread' && el.status !== 'needs-response');
    return this.sortedCards(recentCards);
  }

  sortedCards(cards) {
    if (!cards.length) { return; }
    return cards.sort((c1, c2) => c2.datetime - c1.datetime);
  }
}
