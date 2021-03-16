import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @tracked displayHeader = true;
  @tracked displayBoundaries = true;
  @tracked header = 'Card';
  @tracked selectionHeader = false;
  @tracked isSelected = false;
  @tracked editable = false;
  @tracked hasContextMenu = false;
  @tracked expandable = false;
  @tracked noHeaderBackground = false;
}
