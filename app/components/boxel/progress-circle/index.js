import Component from '@glimmer/component';
import { reads } from 'macro-decorators';

const FONT_SIZE_RATIO = 25 / 120;

export default class extends Component {
  progressArcThickness = 12;
  outerCircleRadius = 60;
  innerCircleRadius = this.outerCircleRadius - this.progressArcThickness;
  strokeCircleRadius = (this.outerCircleRadius + this.innerCircleRadius) / 2;
  outerCircleDiameter = this.outerCircleRadius * 2;
  innerCircleDiameter = this.innerCircleRadius * 2;
  @reads('args.size', 120) size;

  get fontSize() {
    return this.size * FONT_SIZE_RATIO;
  }
  get scale() {
    return this.size / this.outerCircleDiameter;
  }
  get percentLabelDiameter() {
    return this.scale * this.innerCircleDiameter;
  }
  get humanPercentComplete() {
    if (this.args.percentComplete) {
      return Math.round(this.args.percentComplete);
    }
    return 0;
  }
}
