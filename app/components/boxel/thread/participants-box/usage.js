import Component from '@glimmer/component';

const sampleParticipantGroup2 = [
  {
    "title": "Haley O’Connell",
    "imgURL": "/workflow/participants/thumb/Haley-OConnell.jpg",
    "role": "Writer"
  },
  {
    "title": "Rupert Grisham",
    "imgURL": "/workflow/participants/thumb/Rupert-Grisham.jpg",
    "role": "CEO"
  }
];

const sampleParticipantGroup = [
  {
    "title": "Gary Walker",
    "imgURL": "/workflow/participants/thumb/Gary-Walker.jpg",
  },
  {
    "title": "Lola Sampson",
    "imgURL": "/workflow/participants/thumb/Lola-Sampson.jpg"
  }
];

export default class ParticipantsBoxUsageComponent extends Component {
  sampleParticipantGroup = sampleParticipantGroup;
  sampleParticipantGroup2 = sampleParticipantGroup2;
}
