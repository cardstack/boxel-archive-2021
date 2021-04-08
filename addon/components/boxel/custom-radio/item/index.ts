import Component from '@glimmer/component';
import { reads } from 'macro-decorators';
import { tracked } from '@glimmer/tracking';

const DEFAULT_FOCUSED_CLASS = 'boxel-custom-radio__focused-item';

export default class CustomRadioItem extends Component {
  @reads('args.focusedClass', DEFAULT_FOCUSED_CLASS) 
  declare focusedClass: string;
  @tracked focused = false;
}
