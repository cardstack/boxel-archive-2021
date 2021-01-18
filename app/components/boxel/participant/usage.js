import Component from '@glimmer/component';

const sampleParticipant = {
  "title": "Haley O’Connell",
  "imgURL": "/workflow/participants/thumb/Haley-OConnell.jpg",
  "role": "Writer"
};

const sampleParticipant2 = {
  "title": "Carl Stack",
  "role": "Accountant"
};

export default class ParticipantUsageComponent extends Component {
  sampleParticipant = sampleParticipant;
  sampleParticipant2 = sampleParticipant2;
}
