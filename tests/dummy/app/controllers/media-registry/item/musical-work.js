import Controller from '@ember/controller';

export default class MediaRegistryItemMusicalWorkController extends Controller {
  get headerFields() {
    if (!this.model) { return null; }

    return {
      image: '/media-registry/musical-work.svg',
      title: this.model.title,
      description: this.model.composer ? `by ${this.model.artist}, ${this.model.composer}` : `by ${this.model.artist}`
    }
  }

  get isolatedFields() {
    if (!this.model) { return null; }
    return [
      {
        title: 'title',
        value: this.model?.title
      },
      {
        title: 'writers',
        value: [
          {
            title: 'Lyricist',
            value: this.model?.artistName || this.model?.artist,
            type: this.model?.artistName ? 'card' : 'text',
            component: this.model?.artistName ? 'cards/composer' : null
          },
          {
            title: 'Composer',
            value: this.model?.composerName || this.model?.composer,
            type: this.model?.composerName ? 'card' : 'text',
            component: this.model?.composerName ? 'cards/composer' : null
          }
        ]
      },
      {
        title: 'iswc',
        value: this.model?.iswc
      },
      {
        title: 'verifi id',
        id: this.model?.verifi_id,
        type: 'card',
        component: 'cards/registration',
        value: {
          verifi_id: this.model?.verifi_id,
          verifi_reg_date: this.model?.verifi_reg_date,
          asset_type: this.model?.version_type
        }
      },
      {
        title: 'version type',
        value: this.model?.version_type
      },
      {
        title: 'publisher',
        value: this.model?.publisher
      },
      {
        title: 'copyright notice',
        value: this.model?.copyright_notice
      }
    ];
  }
}
