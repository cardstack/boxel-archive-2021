import Route from '@ember/routing/route';

// workflow representative
const BOT = {
  "id": "cardbot",
  "title": "Cardbot",
  "imgURL": "/assets/images/icons/cardbot-lg.svg"
};

export default class CardPayWorkflowRoute extends Route {
  model({ workflowId }) {
    let cardpay = this.modelFor('card-pay');
    let { user, workflows } = cardpay;
    let workflow = workflows.find(el => el.id === workflowId);

    let thread = {
      id: workflowId,
      participants: [user],
      orgRepresentatives: [BOT],
      workflow
    }

    return thread;
  }
}
