import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CardflowQueueComponent extends Component {
  @tracked displayFormat = "list";
  @tracked displayQueue = "shared";
  @tracked updatedCards;

  _getCards() {
    return this.updatedCards ? this.updatedCards : this.args.model.orgQueueCards;
  }

  _setCards(val) {
    this.updatedCards = val;
  }

  get user() {
    if (!this.args.model) { return null; }
    return this.args.model.user;
  }

  get org() {
    if (!this.args.model) { return null; }
    return this.args.model.currentOrg;
  }

  get cards() {
    return this._getCards();
  }

  get unreadCards() {
    if (!this.args.model || !this.cards) { return null; }
    let unreadCards = this.cards.filter(el => el.status === 'unread');
    return this.sortedCards(unreadCards);
  }

  get actionReqCards() {
    if (!this.args.model || !this.cards) { return null; }
    let actionReqCards = this.cards.filter(el => el.status === 'needs-response');
    return this.sortedCards(actionReqCards);
  }

  get recentCards() {
    if (!this.args.model || !this.cards) { return null; }
    let recentCards = this.cards.filter(el => el.status === 'recent-activity');
    return this.sortedCards(recentCards);
  }

  sortedCards(cards) {
    if (!cards.length) { return; }
    return cards.sort((c1, c2) => c2.datetime - c1.datetime);
  }

  @action
  filterQueue(val) {
    if (!this.cards || !this.args.model.user) { return; }

    if (val) {
      let cards = this.cards.filter(el => el.participant_ids.includes(val));
      this._setCards(cards);
      this.displayQueue = "user";
      return;
    }

    this._setCards(this.args.model.queueCards);
    this.displayQueue = "shared";
  }
}
