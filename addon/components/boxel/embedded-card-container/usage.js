import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @tracked displayHeader = true;
  @tracked header = 'Card';
  @tracked noHeaderBackground = false;
}
