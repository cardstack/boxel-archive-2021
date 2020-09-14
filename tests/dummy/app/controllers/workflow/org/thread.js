import Controller from '@ember/controller';

export default class WorkflowOrgThreadController extends Controller {
  get activeTasks() {
    if (!this.model.thread.tasks) { return null; }
    return this.model.thread.tasks.filter(el => !el.completed);
  }

  get completedTasks() {
    if (!this.model.thread.tasks) { return null; }
    return this.model.thread.tasks.filter(el => el.completed);
  }

  get userTasks() {
    if (!this.activeTasks || !this.model.user) { return null; }
    return this.activeTasks.filter(el => el.assigned_to === this.model.user.id);
  }

  get assignedTasks() {
    // tasks assigned from this user to others
    if (!this.activeTasks || !this.model.user) { return null; }
    // do not count self-assigned tasks
    return this.activeTasks.filter(el => el.assigned_by === this.model.user.id && el.assigned_to !== this.model.user.id);
  }
}
