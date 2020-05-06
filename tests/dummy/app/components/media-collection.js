import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MediaCollectionComponent extends Component {
  @action
  changeFormat() {}

  @action
  toggleSelectAll() {}
}
