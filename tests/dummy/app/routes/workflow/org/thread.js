import Route from '@ember/routing/route';

export default class WorkflowOrgThreadRoute extends Route {
  async model({ threadId }) {
    const { orgQueueCards } = this.modelFor('workflow.org');
    return orgQueueCards.find(el => el.id === threadId);
  }
}
