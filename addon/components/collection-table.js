import CollectionIsolated from './collection-isolated';
import { tracked } from '@glimmer/tracking';

export default class CollectionTableComponent extends CollectionIsolated {
  rowSelectionMode = "single";
  checkboxSelectionMode = "multiple";

  @tracked selection;
  @tracked sorts;
}
