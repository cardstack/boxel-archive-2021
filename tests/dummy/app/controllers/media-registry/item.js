import Controller from '@ember/controller';

export default class MediaRegistryItemController extends Controller {
  musicalWork = [
    {
      title: 'musical work',
      value: null
    }
  ];

  registrations = [
    {
      title: 'verify registry',
      value: null
    },
    {
      title: 'library of congress',
      value: null
    }
  ];

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

  files = [
    {
      title: 'cover art',
      value: null
    },
    {
      title: 'booklet',
      value: null
    },
    {
      title: 'files',
      value: null
    },
  ];

  agreements = [
    {
      title: 'active',
      value: null
    },
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

  credits = [
    {
      title: 'main artist',
      value: null
    },
    {
      title: 'producer',
      value: null
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


  get headerDetailFields() {
    return [
      {
        title: 'catalog no.',
        value: 'BRN-19230-1239049'
      },
      {
        title: 'verify id',
        value: '0x9b21…ca26'
      },
      {
        title: 'label',
        value: this.model.owner
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
        value: null
      },
      {
        title: 'label',
        value: this.model.owner
      },
      {
        title: 'genre, sub genre',
        value: this.model.genre
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
}
