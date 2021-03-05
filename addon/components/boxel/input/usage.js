import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Component {
  @tracked id = 'sample-input';
  @tracked value = 'Hello Boxel';
  @tracked disabled = false;
}
