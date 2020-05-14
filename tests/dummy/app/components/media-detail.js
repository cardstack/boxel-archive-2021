import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { dasherize } from '@ember/string';

export default class MediaDetailComponent extends Component {
  @tracked model = this.args.model;
  @tracked isEditMode = this.args?.mode === 'edit';

  set cardId(field) {
    return String(dasherize(field.trim()));
  }

  keyDates = [
    {
      title: 'recording session date',
      value: 'Jan 16, 2020'
    },
    {
      title: 'original release date',
      value: 'Feb 17, 2020'
    }
  ];

  codes = [
    {
      title: 'isrc',
      value: [
        {
          title: 'Primary',
          value: ['US-S1Z-22-05001']
        },
        {
          title: 'Secondary',
          value: ['US-S1Z-22-05018', 'US-S1Z-22-05025', 'US-S1Z-22-05038']
        }
      ]
    },
    {
      title: 'catalog number',
      value: 'BRN-19230-1239049'
    },
  ];

  get artistCard() {
    let artist = this.model.artist;
    if (artist === 'Pia Midina') {
      return {
        id: this.cardId = artist,
        type: 'profile',
        title: artist,
        imgURL: `/media-registry/profiles/${dasherize(artist)}.jpg`,
        fields: [
          {
            title: 'url',
            value: `www.piamidina.com`
          },
          {
            title: 'no. of recordings',
            value: 13
          }
        ]
      };
    } else {
      return artist;
    }
  }

  get producerCard() {
    let artist = 'Francesco Midina';
    if (this.model.artist === 'Pia Midina') {
      return {
        id: this.cardId = artist,
        type: 'profile',
        title: artist,
        imgURL: `/media-registry/profiles/${dasherize(artist)}.svg`,
        fields: [
          {
            title: 'url',
            value: `www.${dasherize(artist)}.com`
          },
          {
            title: 'no. of recordings',
            value: 13
          }
        ]
      };
    } else {
      return this.model.artist;
    }
  }

  get detailSections() {
    return [
      {
        title: "Recording Details",
        content: this.recordingDetails
      },
      {
        title: "Musical Work",
        content: this.musicalWork
      },
      {
        title: "Registrations",
        content: this.registrations
      },
      {
        title: "Key Dates",
        content: this.keyDates
      },
      {
        title: "Files",
        content: this.files
      },
      {
        title: "Agreements",
        content: this.agreements
      },
      {
        title: "Codes",
        content: this.codes
      },
      {
        title: "Credits",
        content: this.credits
      },
    ];
  }

  get recordingDetails() {
    return [
      {
        title: 'title',
        value: this.model.song_title
      },
      {
        title: 'writer',
        value: this.artistCard
      },
      {
        title: 'label',
        value: [ this.model.owner ]
      },
      {
        title: 'genre, sub genre',
        value: [ this.model.genre, 'Dream Pop' ]
      },
      {
        title: 'duration',
        value: this.model.length
      },
      {
        title: 'language performance',
        value: 'English (en_US)'
      },
      {
        title: 'recording year',
        value: 2020
      },
      {
        title: 'parental advisory',
        value: 'No'
      },
      {
        title: 'copyright notice',
        value: `℗ 2020 ${this.model.owner}`
      }
    ];
  }

  get musicalWork() {
    return [
      {
        title: 'musical work',
        value: {
          id: this.cardId = this.model.song_title,
          type: 'musical-work',
          imgURL: '/media-registry/musical-work.svg',
          title: this.model.song_title,
          description: `by ${this.model.artist}, Miles Ponia`,
          fields: [
            {
              title: 'writers',
              value: `${this.model.artist} (1 more)`
            },
            {
              title: 'iswc',
              value: 'T-030248890-1'
            },
            {
              title: 'verifi id',
              value: '0x8a45...ab18'
            }
          ]
        }
      }
    ]
  }

  get registrations() {
    return [
      {
        title: 'verifi registry',
        value: {
          id: 'verifi-registry',
          type: 'registration',
          imgURL: '/media-registry/verifi-logo.svg',
          title: 'Verifi Registry',
          fields: [
            {
              title: 'verifi id',
              value: '0x9b21...ca26'
            },
            {
              title: 'asset-type',
              value: 'Master Recording'
            },
            {
              title: 'created',
              value: 'Feb 17, 2020'
            },
          ]
        }
      },
      {
        title: 'library of congress',
        value: {
          id: 'library-of-congress',
          type: 'registration',
          imgURL: '/media-registry/library-congress-logo.svg',
          title: this.model.song_title,
          fields: [
            {
              title: 'type of work',
              value: 'Sound Recording (Form SR)'
            },
            {
              title: 'registration no.',
              value: 'SR0000320716'
            },
          ]
        }
      }
    ];
  }

  get files() {
    return [
      {
        title: 'cover art',
        value: {
          id: this.cardId = this.model.album,
          type: 'cover-art',
          imgURL: `/media-registry/covers/${this.model.cover_art}`,
          title: this.model.album,
          description: 'Created May 5, 2019',
        }
      },
      {
        title: 'booklet',
        value: [
          {
            id: 'booklet-the-leaves-are-changing-color',
            type: 'file',
            imgURL: `/media-registry/file.svg`,
            title: 'booklet-the-leaves-are-changing-color.pdf',
            description: 'Created May 5, 2019',
          },
          {
            id: 'booklet-the-leaves-are-changing-color-translated',
            type: 'file',
            imgURL: `/media-registry/file.svg`,
            title: 'booklet-the-leaves-are-changing-color-translated.pdf',
            description: 'Created May 5, 2019',
          }
        ]
      },
      {
        title: 'files',
        value: [
          {
            id: 'the-leaves-are-changing-color',
            type: 'file',
            imgURL: `/media-registry/file.svg`,
            title: 'the-leaves-are-changing-color.aiff',
            description: 'Created May 5, 2019',
          },
          {
            id: 'booklet-the-leaves-are-changing-color-watermarked',
            type: 'file',
            imgURL: `/media-registry/file.svg`,
            title: 'the-leaves-are-changing-color-watermarked.aiff',
            description: 'Created May 5, 2019',
          }
        ]
      },
    ];
  }

  get agreements() {
    return [
      {
        title: 'active',
        value: {
          id: 'exclusive-recording-agreement',
          type: 'agreement',
          imgURL: '/media-registry/bunny-records-logo.svg',
          title: 'Exclusive Recording Agreement',
          fields: [
            {
              title: 'assigner',
              value: `${this.model.artist} (Ref)`
            },
            {
              title: 'assignee',
              value: `${this.model.owner} (Ref)`
            },
            {
              title: 'active through',
              value: 'Dec 2023'
            }
          ]
        }
      },
    ];
  }

  get credits() {
    return [
      {
        title: 'main artist',
        value: this.artistCard
      },
      {
        title: 'producer',
        value: this.producerCard
      },
      {
        title: 'mastering engineer',
        value: 'Joel Kaplan'
      },
      {
        title: 'mixing engineer',
        value: 'Mariah Solis'
      },
      {
        title: 'recording engineer',
        value: 'Ian Adams'
      },
      {
        title: 'background singer',
        value: 'Jenny Sparks'
      },
    ];
  }
}
