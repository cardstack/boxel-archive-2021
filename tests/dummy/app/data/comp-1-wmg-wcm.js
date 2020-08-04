const VALENTINO_SOLANO = {
  "id": "valentino-solano",
  "type": "participant",
  "title": "Valentino Solano",
  "description": "Lyricist",
  "imgURL": "",
  "ipi": "00815723492",
  "pro": "Global Music Rights",
  "email": "valentino@valsolanomusic.com",
  "website": "www.valsolanomusic.com"
};

export default {
  id: "mw-the-sun-comes-out-wmg-wcm",
  baseCard: {
    type: 'musical-work',
    owner: 'Warner Music Group',
    datetime: '2020-04-08T10:45',
    id: 'wmg-the-sun-comes-out',
    itemId: 'the-sun-comes-out',
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
          }
        ]
      },
      {
        title: 'iswc',
        value: "T-070237182-9"
      },
      {
        title: 'verifi_id',
        id: '0x2b4932f7c27d6ca5d8bd5601ba7c28071221165ac2f1b7928c22c2809d24183ca',
        type: 'card',
        component: 'cards/registration-embedded',
        value: {
          verifi_id: '0x2b4932f7c27d6ca5d8bd5601ba7c28071221165ac2f1b7928c22c2809d24183ca',
          verifi_reg_date: '2020-04-08',
          asset_type: 'Original work'
        }
      },
      {
        title: 'version_type',
        value: null
      },
      {
        title: 'ownership_splits',
        value: null
      },
      {
        title: 'publisher',
        value: null
      },
      {
        title: 'copyright_notice',
        value: null
      }
    ]
  },
  compCard: {
    type: 'musical-work',
    owner: 'Warner Chappell Music',
    datetime: '2019-11-11T13:54',
    id: 'wcm-the-sun-comes-out',
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
            value: [
              {
                "id": "emilio-rosso",
                "type": "participant",
                "title": "Emilio Rosso",
                "description": "Composer",
                "imgURL": null,
                "ipi": "00231925374",
                "pro": "Global Music Rights",
                "email": "emilio@rosso.com",
                "website": null
              }
            ]
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
  }
}
