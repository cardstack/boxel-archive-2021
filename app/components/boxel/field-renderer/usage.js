import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { VALENTINO_PR } from '@cardstack/boxel/data/comp-data';
import emilioRossoThumb from '@cardstack/boxel/images/media-registry/profiles/thumb/Emilio-Rosso.jpg';
import autumnLeavesMedium from '@cardstack/boxel/images/media-registry/covers/medium/Autumn-Leaves.jpg';

const VALENTINO_SOLANO_V1 = {
  id: 'valentino-solano',
  type: 'participant',
  title: 'Valentino Solano',
  imgURL: VALENTINO_PR.writer.imgURL,
  ipi: '00815723492',
  pro: 'Global Music Rights',
  email: 'valentino@valsolanomusic.com',
  website: 'www.valsolanomusic.com',
  expandable: true,
};

const EMILIO_ROSSO = {
  id: 'emilio-rosso',
  type: 'participant',
  title: 'Emilio Rosso',
  imgURL: emilioRossoThumb,
  ipi: '00231925374',
  pro: 'Global Music Rights',
  email: 'emilio@rosso.com',
  website: null,
  expandable: true,
};

class Usage extends Component {
  @tracked mode = 'view';
  @tracked cardFieldValue = VALENTINO_SOLANO_V1;
  @tracked collectionFieldValue = [EMILIO_ROSSO, VALENTINO_SOLANO_V1];
  @tracked rating = 'PG-13';
  ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
  @tracked collectionFormat = 'grid';
  collectionFormats = ['grid', 'table', 'table-list'];
  @tracked component = 'cards/artist';
  @tracked comparisonMode = false;
  @tracked
  biography = `Marie Skłodowska Curie, born Maria Salomea Skłodowska (7 November 1867 – 4 July 1934), was a Polish and naturalized-French physicist and chemist who conducted pioneering research on radioactivity. As the first of the Curie family legacy of five Nobel Prizes, she was the first woman to win a Nobel Prize, the first person and the only woman to win the Nobel Prize twice, and the only person to win the Nobel Prize in two scientific fields.`;
  albumLeavesSrc = autumnLeavesMedium;
  @tracked comparisonMode = false;
}

export default Usage;
