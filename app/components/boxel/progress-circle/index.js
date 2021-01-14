import Component from '@glimmer/component';

const FONT_SIZE_RATIO = 25/120;

export default class extends Component {
  get fontSize() {
    return this.args.size * FONT_SIZE_RATIO;
  }
  get humanPercentComplete() {
    if (this.args.percentComplete) {
      return Math.round(this.args.percentComplete);
    }
    return 0;
  }
}
