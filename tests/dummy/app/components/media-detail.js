import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { dasherize } from '@ember/string';

export default class MediaDetailComponent extends Component {
  @tracked model = this.args.model;
  @tracked isEditMode = this.args?.mode === 'edit';

  cardId = function(field) {
    return String(dasherize(field.trim()));
  }

  truncatedVerifiId = function(id) {
    if (id) {
      return `${id.slice(0, 6)}...${id.slice(-4)}`;
    }
  };

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
        value: [ this.model.artist_info || this.model.artist ]
      },
      {
        title: 'label',
        value: [ this.model.owner ]
      },
      {
        title: 'genre',
        value: this.model?.details?.genre || this.model.genre
      },
      {
        title: 'duration',
        value: this.model.length
      },
      {
        title: 'language performance',
        value: this.model?.details?.language
      },
      {
        title: 'recording year',
        value: this.model?.details?.year,
        type: 'dropdown'
      },
      {
        title: 'parental advisory',
        value: this.model?.details?.parental_advisory,
        type: 'dropdown',
        options: [
          { value: "N/A" },
          { value: "Yes" },
          { value: "No" }
        ]
      },
      {
        title: 'copyright notice',
        value: this.model?.details?.copyright ? `© ${this.model.details.copyright}` : null
      }
    ];
  }

  get musicalWork() {
    let work = this.model?.details?.musical_work;
    if (!work) {
      return [{ title: 'musical work' }];
    }

    let id = this.truncatedVerifiId(work.verifi_id);
    return [
      {
        title: 'musical work',
        value: [{
          id,
          type: 'musical-work',
          imgURL: work.cover_art || '/media-registry/musical-work.svg',
          title: work.title,
          description: work.composer ? `by ${work.artist}, ${work.composer}` : `by ${work.artist}`,
          fields: [
            {
              title: 'writers',
              value: work.writers.length > 1 ? `${work.writers[0]} (${work.writers.length - 1} more)` : work.writers[0],
            },
            {
              title: 'iswc',
              value: work.iswc
            },
            {
              title: 'verifi id',
              value: id
            }
          ]
        }]
      }
    ]
  }

  get registrations() {
    let verifiReg = this.model?.details?.verifi_registration;
    let congressReg = this.model?.details?.library_of_congress_registration;

    if (verifiReg) {
      let id = this.truncatedVerifiId(this.model.details.verifi_id);

      verifiReg = {
        id: `verifi-registry-${id}`,
        type: 'registration',
        imgURL: '/media-registry/verifi-logo.svg',
        title: 'Verifi Registry',
        fields: [
          {
            title: 'verifi id',
            value: id
          },
          {
            title: 'asset-type',
            value: verifiReg.asset_type
          },
          {
            title: 'created',
            value: verifiReg.created_date,
            type: 'date'
          },
        ]
      };
    }

    if (congressReg) {
      congressReg = {
        id: `library-of-congress-${congressReg.registration_no}`,
        type: 'registration',
        imgURL: '/media-registry/library-congress-logo.svg',
        title: congressReg.title,
        fields: [
          {
            title: 'type of work',
            value: congressReg.type_of_work
          },
          {
            title: 'registration no.',
            value: congressReg.registration_no
          },
        ]
      };
    }

    return [
      {
        title: 'verifi registry',
        value: verifiReg
      },
      {
        title: 'library of congress',
        value: congressReg
      }
    ];
  }

  get formattedFiles() {
    let filesArr = [];
    let files = this.model?.details?.files;
    if (files && files.length) {
      filesArr = files.map(file => {
        let type = file.title.toLowerCase().trim().split('.')[1] || 'file';
        if (type === 'aiff') {
          return {
            id: file.title,
            title: file.title,
            type,
            imgURL: '/media-registry/file.svg',
            fields: [
              {
                title: 'bitrate',
                value: file.bitrate
              }
            ]
          }
        }

        return {
          id: file.title,
          title: file.title,
          type,
          imgURL: this.model.cover_art || '/media-registry/file.svg',
          description: 'Created',
          descriptionDate: file.date
        }
      });
    }
    return filesArr;
  }

  get files() {
    let pdfFiles = this?.formattedFiles.filter(file => file.type === 'pdf');
    let audioFiles = this?.formattedFiles.filter(file => file.type === 'aiff');

    return [
      {
        title: 'cover art',
        format: 'grid',
        value: {
          id: this.cardId(this.model.album),
          type: 'cover-art',
          imgURL: this.model.cover_art,
          title: this.model.album,
          description: 'Created',
          descriptionDate: '2019-02-19'
        }
      },
      {
        title: 'booklet',
        format: 'grid',
        value: pdfFiles
      },
      {
        title: 'files',
        value: audioFiles
      },
    ];
  }

  get agreements() {
    return [
      {
        title: 'active',
        value: [{
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
        }]
      },
    ];
  }

  keyDates = [
    {
      title: 'recording session date',
      value: this.model?.details?.recording_date,
      type: 'date'
    },
    {
      title: 'original release date',
      value: this.model?.details?.original_release_date,
      type: 'date'
    }
  ];

  codes = [
    {
      title: 'isrc',
      value: [
        {
          title: 'Primary',
          value: [ this.model.isrc || 'US-S1Z-22-05001' ]
        },
        {
          title: 'Secondary',
          value: ['US-S1Z-22-05018', 'US-S1Z-22-05025', 'US-S1Z-22-05038']
        }
      ]
    },
    {
      title: 'catalog number',
      value: ['BRN-19230-1239049']
    },
  ];

  credits = [
    {
      title: 'main artist',
      value: [ this.model.artist_info || this.model.artist ]
    },
    {
      title: 'producer',
      value: this.model?.producer
    },
    {
      title: 'mastering engineer',
      value: this.model?.details?.mastering_engineer
    },
    {
      title: 'mixing engineer',
      value: this.model?.details?.mixing_engineer
    },
    {
      title: 'recording engineer',
      value: this.model?.details?.recording_engineer
    },
    {
      title: 'background singer',
      value: this.model?.details?.background_singer
    },
  ];
}
