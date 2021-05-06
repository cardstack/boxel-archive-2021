import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

let inProgressTimeout: number;
export default class CtaBlockUsage extends Component {
  @tracked stepNumber = 1;
  @tracked canCancel = true;
  @tracked canEdit = false;
  @tracked state = 'default';

  @action changeState(str: string): void {
    console.log(str, this.state);
    let prevState = this.state;
    this.state = str;
    if (str === 'in-progress') {
      inProgressTimeout = window.setTimeout(() => {
        if (prevState === 'memorialized') {
          this.state = 'default';
        } else {
          this.state = 'memorialized';
        }
      }, 1500);
    }

    if (this.state === 'memorialized' || this.state === 'default') {
      window.clearTimeout(inProgressTimeout);
    }
  }

  @action toggleComplete() {
    if (this.state === 'default') {
      this.state = 'memorialized';
    } else {
      this.state = 'default';
    }
  }
}
