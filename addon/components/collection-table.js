import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class CollectionTableComponent extends Component {
  rowSelectionMode = "single";
  checkboxSelectionMode = "multiple";

  @tracked selection;
  @tracked sorts;
}
