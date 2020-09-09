import Route from '@ember/routing/route';
import { set } from '@ember/object';

export default class WorkflowOrgThreadRoute extends Route {
  async model({ threadId }) {
    const { user, currentOrg, userOrgs, orgQueueCards } = this.modelFor('workflow.org');
    const { users, messages, workflows } = this.modelFor('workflow');

    let thread = orgQueueCards.find(el => el.id === threadId);
    let participants = [];
    let posts = messages.filter(el => el.threadId === threadId);
    let flow;

    if (thread.workflow_id) {
      flow = workflows.find(el => el.id === thread.workflow_id);
    }

    if (thread.participant_ids && thread.participant_ids.length) {
      for (const userId of thread.participant_ids) {
        let participant = users.find(el => el.id === userId);
        if (participant) {
          participants = [...participants, participant];
        } else {
          participants = [...participants, { id: userId, type: "participant", title: userId } ];
        }
      }
    }

    for (let post of posts) {
      let sender;
      if (post.participantType === 'bot') {
        sender = userOrgs.find(el => el.id === post.participantId);
      } else {
        sender = users.find(el => el.id === post.participantId);
      }
      if (sender) {
        set(post, 'sender', sender);
      }
    }

    return {
      user,
      thread,
      posts,
      participants,
      currentOrg,
      workflow: flow
    }
  }
}
