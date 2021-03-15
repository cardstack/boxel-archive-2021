import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @tracked displayHeader = false;
  @tracked header = 'Card';
  @tracked noHeaderBackground = false;
}
