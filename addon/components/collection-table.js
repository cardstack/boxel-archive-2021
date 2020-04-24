import CollectionIsolated from './collection-isolated';
import { tracked } from '@glimmer/tracking';

export default class CollectionTableComponent extends CollectionIsolated {
  rowSelectionMode = "single";
  @tracked selection;
  @tracked sorts;
}
