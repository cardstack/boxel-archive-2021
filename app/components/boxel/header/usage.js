import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class BoxelHeaderComponent extends Component {
  @tracked headerPadding = 'var(--boxel-s-1)';
  @tracked headerBackgroundColor = 'var(--boxel-purple-100)';
  @tracked headerMinHeight = 'var(--boxel-s2)';
}
