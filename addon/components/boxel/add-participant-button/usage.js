import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class AddParticipantButtonUsageComponent extends Component {
  @action addAction() {
    // eslint-disable-next-line no-console
    console.log('addAction triggered');
  }
}
