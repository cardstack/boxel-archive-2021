import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @tracked isComplete = false;
  @tracked header = 'Card Header';
  @tracked prompt = 'With optional prompt';
}
