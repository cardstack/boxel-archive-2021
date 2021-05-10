import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

let inProgressTimeout: number;
export default class CtaBlockUsage extends Component {
  @tracked stepNumber = 1;
  @tracked canCancel = true;
  @tracked canEdit = false;
  @tracked state = 'default';
  @tracked isComplete = false;
  @tracked depositState = 'disabled';

  get depositIsDisabled(): boolean {
    return this.state !== 'memorialized' || this.depositState === 'disabled';
  }

  @action changeState(str: string): void {
    console.log(str);
    this.state = str;
    if (str === 'in-progress') {
      inProgressTimeout = window.setTimeout(() => {
        this.changeState('memorialized');
        this.depositState = 'default';
      }, 1500);
    }

    if (str === 'memorialized' || str === 'default') {
      window.clearTimeout(inProgressTimeout);
    }
  }

  @action toggleComplete(): void {
    this.isComplete = !this.isComplete;
  }
}
