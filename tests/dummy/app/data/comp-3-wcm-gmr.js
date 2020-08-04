export const VALENTINO_SOLANO = {
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

export const VALENTINO_SOLANO_PRO = {
  "id": "valentino-solano",
  "type": "participant",
  "title": "Valentino Solano",
  "description": "Lyricist",
  "imgURL": "",
  "ipi": "00914256714",
  "pro": "Global Music Rights",
  "email": "valentino@valsolanomusic.com",
  "website": "www.valsolanomusic.com"
};

export const EMILIO_ROSSO = {
  "id": "emilio-rosso",
  "type": "participant",
  "title": "Emilio Rosso",
  "description": "Composer",
  "imgURL": null,
  "ipi": "00231925374",
  "pro": "Global Music Rights",
  "email": "emilio@rosso.com",
  "website": null
};

export const MARIA_BIANCHI = {
  "id": "maria-bianchi",
  "type": "participant",
  "title": "Maria Bianchi",
  "description": "Composer",
  "imgURL": null,
  "ipi": "00181928972",
  "pro": "Global Music Rights",
  "email": "m.bianchi@gmail.com",
  "website": null
};

export default {
  id: "the-sun-comes-out-wcm-gmr",
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
  },
  compCard: {
    type: 'musical-work',
    owner: 'Global Music Rights',
    datetime: '2020-06-09T16:18',
    id: 'gmr-the-sun-comes-out',
    itemId: 'gmr-the-sun-comes-out',
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
            value: [ VALENTINO_SOLANO_PRO ]
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
        id: '0x7cf232e7c48d6ba5d8bd3101fc7a28071091165de2f1b4542c37e2812d89154be',
        type: 'card',
        component: 'cards/registration-embedded',
        value: {
          verifi_id: '0x7cf232e7c48d6ba5d8bd3101fc7a28071091165de2f1b4542c37e2812d89154be',
          verifi_reg_date: '2020-06-09',
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
