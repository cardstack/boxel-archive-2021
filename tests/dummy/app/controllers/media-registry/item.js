import Controller from '@ember/controller';

export default class MediaRegistryItemController extends Controller {
  recordingFieldNames = [
    "song_title",
    "writer",
    "album",
    "type_of_album",
    "genre",
    "length",
    "owner",
  ];

  musicalWork = [
    {
      title: 'Musical Work',
      value: null
    }
  ];

  registrations = [
    {
      title: 'Verify Registry',
      value: null
    },
    {
      title: 'Library of Congress',
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
        title: 'Catalog No.',
        value: 'BRN-19230-1239049'
      },
      {
        title: 'Verify Id',
        value: '0x9b21…ca26'
      },
      {
        title: 'Label',
        value: this.model.owner
      },
    ]
  }

  get recordingDetails() {
    return this.recordingFieldNames.map(field => {
      return {
        title: field,
        value: this.model[field] || null
      }
    });
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
    ]
  }
}
