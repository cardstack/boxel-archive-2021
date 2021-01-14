import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

const FONT_SIZE_RATIO = 25/120;

export default class extends Component {
  @tracked size = this.args.size ? this.args.size : 120;
  get fontSize() {
    return this.size * FONT_SIZE_RATIO;
  }
  get innerCircleSize() {
    return this.size - this.fontSize;
  }
  get humanPercentComplete() {
    if (this.args.percentComplete) {
      return Math.round(this.args.percentComplete);
    }
    return 0;
  }
}
