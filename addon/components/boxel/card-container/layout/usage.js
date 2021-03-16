import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @tracked displayTools = false;
  @tracked isSelected = false;
}
