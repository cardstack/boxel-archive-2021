import Component from '@glimmer/component';

const sampleParticipants = [
  {
    "type": "organization",
    "title": "Home Sweet Home",
    "imgURL": "/workflow/orgs/hsh-icon.png"
  },
  {
    "title": "Gary Walker",
    "imgURL": "/workflow/participants/thumb/Gary-Walker.jpg"
  },
  {
    "title": "Haley O’Connell",
    "imgURL": "/workflow/participants/thumb/Haley-OConnell.jpg",
    "role": "Writer"
  },
  {
    "title": "Rupert Grisham",
    "imgURL": "/workflow/participants/thumb/Rupert-Grisham.jpg",
    "role": "CEO"
  },
  {
    "title": "Lola Sampson",
    "imgURL": "/workflow/participants/thumb/Lola-Sampson.jpg"
  }
];

export default class ParticipantListUsageComponent extends Component {
  sampleParticipants = sampleParticipants;
}
