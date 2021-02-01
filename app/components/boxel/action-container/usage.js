/* eslint-disable ember/no-empty-glimmer-component-classes */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @tracked isComplete = false;
}
