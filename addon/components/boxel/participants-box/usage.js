import Component from '@glimmer/component';
import HaleyOConnellThumb from '@cardstack/boxel/usage-support/images/workflow/participants/thumb/Haley-OConnell.jpg';
import JuliaMasonThumb from '@cardstack/boxel/usage-support/images/workflow/participants/thumb/Julia-Mason.jpg';
import LolaSampsonThumb from '@cardstack/boxel/usage-support/images/workflow/participants/thumb/Lola-Sampson.jpg';
import RupertGrishamThumb from '@cardstack/boxel/usage-support/images/workflow/participants/thumb/Rupert-Grisham.jpg';
import { action } from '@ember/object';

const sampleParticipantGroup2 = [
  {
    title: 'Haley O’Connell',
    imgURL: HaleyOConnellThumb,
    role: 'Writer',
  },
  {
    title: 'Rupert Grisham',
    imgURL: RupertGrishamThumb,
    role: 'CEO',
  },
];

const sampleParticipantGroup = [
  {
    title: 'Julia Mason',
    imgURL: JuliaMasonThumb,
  },
  {
    title: 'Lola Sampson',
    imgURL: LolaSampsonThumb,
  },
];

export default class ParticipantsBoxUsageComponent extends Component {
  sampleParticipantGroup = sampleParticipantGroup;
  sampleParticipantGroup2 = sampleParticipantGroup2;
  @action addAction() {
    // eslint-disable-next-line no-console
    console.log('addAction triggered');
  }
}
