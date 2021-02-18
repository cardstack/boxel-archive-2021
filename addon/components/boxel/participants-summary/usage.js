import Component from '@glimmer/component';
import HaleyOConnellThumb from '@cardstack/boxel/usage-support/images/workflow/participants/thumb/Haley-OConnell.jpg';
import JuliaMasonThumb from '@cardstack/boxel/usage-support/images/workflow/participants/thumb/Julia-Mason.jpg';
import LolaSampsonThumb from '@cardstack/boxel/usage-support/images/workflow/participants/thumb/Lola-Sampson.jpg';
import RupertGrishamThumb from '@cardstack/boxel/usage-support/images/workflow/participants/thumb/Rupert-Grisham.jpg';
import HSHIcon from '@cardstack/boxel/usage-support/images/workflow/orgs/hsh-icon.png';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

const SAMPLE_PARTICIPANTS = [
  {
    type: 'organization',
    title: 'Home Sweet Home',
    imgURL: HSHIcon,
  },
  {
    title: 'Lola Sampson',
    imgURL: LolaSampsonThumb,
  },
  {
    title: 'Haley O’Connell',
    imgURL: HaleyOConnellThumb,
    role: 'Writer',
  },
  {
    title: 'Rupert Grisham',
    imgURL: RupertGrishamThumb,
  },
  {
    title: 'Julia Mason',
    imgURL: JuliaMasonThumb,
  },
];
export default class extends Component {
  @tracked participants = A(SAMPLE_PARTICIPANTS);
}