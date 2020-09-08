import Route from '@ember/routing/route';

export default class WorkflowOrgThreadRoute extends Route {
  async model({ threadId }) {
    const { user, currentOrg, orgQueueCards } = this.modelFor('workflow.org');
    let thread = orgQueueCards.find(el => el.id === threadId);
    let participants = [];

    if (thread.participant_ids && thread.participant_ids.length) {
      const { users } = this.modelFor('workflow');
      for (const userId of thread.participant_ids) {
        let participant = users.find(el => el.id === userId);
        if (participant) {
          participants = [...participants, participant];
        } else {
          participants = [...participants, { id: userId, type: "participant", title: userId } ];
        }
      }
    }

    return {
      user,
      thread,
      participants,
      currentOrg
    }
  }
}
