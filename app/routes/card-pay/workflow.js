import Route from '@ember/routing/route';

export default class CardPayWorkflowRoute extends Route {
  model({ workflowId }) {
    let cardpay = this.modelFor('card-pay');
    let { user, workflows } = cardpay;
    let currentWorkflow = workflows.find(el => el.id === workflowId);

    return {
      id: workflowId,
      user,
      workflow: currentWorkflow
    }
  }
}
