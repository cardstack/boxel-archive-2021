import Component from '@glimmer/component';
import { reads } from 'macro-decorators';

export default class ParticipantComponent extends Component {
  @reads('args.iconSize', '2rem') declare iconSize: string;
}
