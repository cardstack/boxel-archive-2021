import Route from '@ember/routing/route';
import { fetchData } from '@cardstack/boxel/data-workflow';

// assuming this user has started a session
const USER_ID = 'gary-walker';

export default class CardPayRoute extends Route {
  userId = USER_ID;

  async model() {
    let db = await fetchData('db-card-pay');
    let { users, orgs, queueCards, messages, workflows, threads } = db;

    let user = users.find(el => el.id === this.userId);
    let userOrgs = orgs.filter(el => user.org_ids.includes(el.id));

    return {
      user,
      users,
      userOrgs,
      queueCards,
      messages,
      workflows,
      threads
    };
  }
}
