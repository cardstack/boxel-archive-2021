import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { dasherize } from '@ember/string';
import { truncateVerifiId } from '@cardstack/boxel/utils/truncate-verifi-id';

export default class MusicDetailCardComponent extends Component {
  @tracked model = this.args.model;
  @tracked itemId = this.args.itemId;

  get headerDetailFields() {
    return [
      {
        title: 'isrc',
        value: this.model?.details?.isrc || this.model?.fields?.isrc
      },
      {
        title: 'verifi id',
        value: truncateVerifiId(this.model?.details?.verifi_id || this.model?.verifi_id)
      },
      {
        title: 'label',
        value: this.model.owner || this.model?.fields?.label
      },
    ];
  }

  get detailSections() {
    if (this.args.noTemplate) {
      if (!this.args.fields) { return []; }
      return [{ content: this.args.fields }];
    }

    return [
      {
        title: "Master Details",
        content: this.recordingDetails
      },
      {
        title: "Musical Work",
        content: [ this.musicalWork ]
      },
      {
        title: "Registrations",
        content: [ this.verifiRegistration ]
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
    if (!this.model || this.args.fields) { return null; }
    return [
      {
        title: 'title',
        value: this.model.song_title
      },
      {
        title: 'main artist',
        value: [ this.model.artist_info || this.model.artist ]
      },
      {
        title: 'label',
        value: [ this.model.owner ]
      },
      {
        title: 'genre',
        value: [ this.model?.details?.genre || this.model.genre ]
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
        type: 'dropdown',
        options: [
          { value: 2019 },
          { value: 2020 }
        ]
      },
      {
        title: 'release date',
        value: this.model?.details?.original_release_date,
        type: 'date'
      },
      {
        title: 'recording session date',
        value: this.model?.details?.recording_date,
        type: 'date'
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
        value: this.model?.details?.copyright_notice
      }
    ];
  }

  get musicalWork() {
    if (!this.model || this.args.fields) { return null; }
    return {
      id: this.model?.details?.iswc_id,
      type: 'card',
      component: 'cards/musical-work-embedded',
      title: 'Musical Work',
      value: this.model?.musicalWork
    }
  }

  get verifiRegistration() {
    if (!this.model || this.args.fields) { return null; }
    let title = 'Verifi Registry';
    let verifi_id = this.model?.details?.verifi_id;
    if (!verifi_id) { return { title, type: 'card' }; }
    return {
      id: verifi_id,
      type: 'card',
      component: 'cards/registration-embedded',
      title,
      value: { verifi_id }
    }
  }

  get codes() {
    if (!this.model || this.args.fields) { return null; }
    return [
      {
        title: 'isrc',
        value: [
          {
            title: 'Primary',
            value: this.model?.details?.isrc
          },
          {
            title: 'Secondary',
            value: []
          }
        ]
      },
      {
        title: 'catalog number',
        value: this.model?.details?.catalog_no
      },
    ];
  }

  get credits() {
    if (!this.model || this.args.fields) { return null; }
    return [
      {
        title: 'main artist',
        value: [ this.model.artist_info || this.model.artist ]
      },
      {
        title: 'producer',
        value: this.model?.producer,
        type: 'card'
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


  // Hardcoded sections (file names, dates, agreements section)

  get coverArtCard() {
    if (!this.model || !this.model.album || this.args.fields) { return null; }
    return {
      id: String(dasherize(this.model.album.trim())),
      type: 'file',
      category: 'cover-art',
      fields: {
        title: this.model.album,
        imgURL: this.model.cover_art_thumb,
        date: '2020-02-25'
      },
    }
  }

  get audioFileCards() {
    if (!this.model || this.args.fields) { return null; }
    return [
      {
        id: `${this.itemId}.aiff`,
        type: 'file',
        category: 'audio-file',
        fields: {
          title: `${this.itemId}.aiff`,
          imgURL: '/media-registry/file.svg',
          date: '2020-02-16'
        }
      },
      {
        id: `${this.itemId}-watermarked.aiff`,
        type: 'file',
        category: 'audio-file',
        fields: {
          title: `${this.itemId}-watermarked.aiff`,
          imgURL: '/media-registry/file.svg',
          date: '2020-02-16'
        }
      }
    ];
  }

  get files() {
    if (!this.model || this.args.fields) { return null; }
    return [
      {
        title: 'cover art',
        format: 'grid',
        type: 'card',
        value: this.coverArtCard
      },
      {
        title: 'audio',
        type: 'collection',
        value: this.audioFileCards
      }
    ];
  }

  get agreements() {
    if (!this.model || this.args.fields) { return null; }
    let searchResults = [{
      id: 'exclusive-recording-agreement-2',
      type: 'agreement',
      imgURL: '/media-registry/bunny-records-logo.svg',
      title: 'Second Recording Agreement',
      fields: [
        {
          title: 'assigner',
          value: `${this.model.artist}`
        },
        {
          title: 'assignee',
          value: `${this.model.owner}`
        },
        {
          title: 'active through',
          value: 'Dec 2024'
        }
      ],
    }];
    return [
      {
        title: 'active',
        search: async function() {
          return searchResults;
        },
        value: [ this.model.agreementCard || {
          id: 'exclusive-recording-agreement',
          type: 'agreement',
          imgURL: '/media-registry/bunny-records-logo.svg',
          title: 'Exclusive Recording Agreement',
          fields: [
            {
              title: 'assigner',
              value: `${this.model.artist}`
            },
            {
              title: 'assignee',
              value: `${this.model.owner}`
            },
            {
              title: 'active through',
              value: 'Dec 2023'
            }
          ],
        }
        ]
      },
    ];
  }
}