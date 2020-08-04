import { VALENTINO_SOLANO, EMILIO_ROSSO, MARIA_BIANCHI } from './profiles';

export default {
  id: "the-sun-comes-out-wcm-amp",
  baseCard: {
    type: 'musical-work',
    owner: 'Warner Chappell Music',
    datetime: '2019-11-11T13:54',
    id: 'wcm-the-sun-comes-out',
    itemId: 'wcm-the-sun-comes-out',
    title: 'The Sun Comes Out',
    isolatedFields: [
      {
        title: "title",
        value: "The Sun Comes Out"
      },
      {
        title: "writers",
        value: [
          {
            title: 'Lyricist',
            type: 'collection',
            component: 'cards/composer',
            value: [ VALENTINO_SOLANO ]
          },
          {
            title: 'Composer',
            type: 'collection',
            component: 'cards/composer',
            value: [ EMILIO_ROSSO ]
          }
        ]
      },
      {
        title: 'iswc',
        value: "T-070237182-9"
      },
      {
        title: 'verifi_id',
        id: '0xab5332b7a35d6ca5d8bd3781fb7c28071341127dc2f1b6928c38e2809e89179ce',
        type: 'card',
        component: 'cards/registration-embedded',
        value: {
          verifi_id: '0xab5332b7a35d6ca5d8bd3781fb7c28071341127dc2f1b6928c38e2809e89179ce',
          verifi_reg_date: '2019-11-11',
          asset_type: 'Original work'
        }
      },
      {
        title: 'version_type',
        value: 'Original work'
      },
      {
        title: 'ownership_splits',
        value: [
          {
            title: 'Valentino Solano (Lyricist)',
            value: '50%'
          },
          {
            title: 'Emilio Rosso (Composer)',
            value: '50%'
          }
        ]
      },
      {
        title: 'publisher',
        type: 'collection',
        value: [
          {
            type: 'publisher',
            title: 'Warner Chappel Music',
            fields: [
              {
                title: 'website',
                value: 'www.warnerchappell.com'
              },
              {
                title: 'main office',
                value: 'Los Angeles, USA'
              }
            ]
          },
          {
            type: 'publisher',
            title: 'Allegro Music Publishing',
            fields: [
              {
                title: 'website',
                value: 'www.allegromusic.com'
              },
              {
                title: 'main office',
                value: 'New York, USA'
              }
            ]
          }
        ]
      },
      {
        title: 'copyright_notice',
        value: ['© 2019 Warner Chappell Music', '© 2019 Allegro Music Publishing']
      }
    ]
  },
  compCard: {
    type: 'musical-work',
    owner: 'Allegro Music Publishing',
    datetime: '2020-05-18T11:36',
    id: 'amp-the-sun-comes-out',
    itemId: 'amp-the-sun-comes-out',
    title: 'The Sun Comes Out',
    isolatedFields: [
      {
        title: "title",
        value: "The Sun Comes Out"
      },
      {
        title: "writers",
        value: [
          {
            title: 'Lyricist',
            type: 'collection',
            component: 'cards/composer',
            value: [ VALENTINO_SOLANO ]
          },
          {
            title: 'Composers',
            type: 'collection',
            component: 'cards/composer',
            value: [ EMILIO_ROSSO, MARIA_BIANCHI ]
          }
        ]
      },
      {
        title: 'iswc',
        value: "T-070237182-9"
      },
      {
        title: 'verifi_id',
        id: '0x31ef32b4c27f6ca5d6bd6201fa7c14071228965dc2f1b4328c22e5609e8912ab4',
        type: 'card',
        component: 'cards/registration-embedded',
        value: {
          verifi_id: '0x31ef32b4c27f6ca5d6bd6201fa7c14071228965dc2f1b4328c22e5609e8912ab4',
          verifi_reg_date: '2020-05-18',
          asset_type: 'Original work'
        }
      },
      {
        title: 'version_type',
        value: 'Original work'
      },
      {
        title: 'ownership_splits',
        value: [
          {
            title: 'Valentino Solano (Lyricist)',
            value: '50%'
          },
          {
            title: 'Emilio Rosso (Composer)',
            value: '25%'
          },
          {
            title: 'Maria Bianchi (Composer)',
            value: '25%'
          }
        ]
      },
      {
        title: 'publisher',
        type: 'collection',
        value: [
          {
            type: 'publisher',
            title: 'Warner Chappel Music',
            fields: [
              {
                title: 'website',
                value: 'www.warnerchappell.com'
              },
              {
                title: 'main office',
                value: 'Los Angeles, USA'
              }
            ]
          },
          {
            type: 'publisher',
            title: 'Allegro Music Publishing',
            fields: [
              {
                title: 'website',
                value: 'www.allegromusic.com'
              },
              {
                title: 'main office',
                value: 'New York, USA'
              }
            ]
          }
        ]
      },
      {
        title: 'copyright_notice',
        value: ['© 2019 Warner Chappell Music', '© 2019 Allegro Music Publishing']
      }
    ]
  }
}
