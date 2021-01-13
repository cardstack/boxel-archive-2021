import bunnyLogo from '@cardstack/boxel/images/media-registry/bunny-logo.svg'
import crdRecordsLogo from '@cardstack/boxel/images/media-registry/crd_records_logo.svg'
import bunnyLogoIcon from '@cardstack/boxel/images/media-registry/button-bunny-records.svg'
import crdRecordsIcon from '@cardstack/boxel/images/media-registry/button-crd-records.svg';
import lisaTrackProfile  from "@cardstack/boxel/images/media-registry/profiles/Lisa-Track.jpg";
import steveRightsProfile  from "@cardstack/boxel/images/media-registry/profiles/Steve-Rights.jpg";
import deezerLogo from '@cardstack/boxel/images/media-registry/deezer-logo.png';
import ampLogo from '@cardstack/boxel/images/media-registry/amp-logo.png';
import gmrLogo from '@cardstack/boxel/images/media-registry/gmr-logo.svg';
import wcmLogo from '@cardstack/boxel/images/media-registry/wcm-logo.png';
import wmgLogo from '@cardstack/boxel/images/media-registry/wmg-logo.svg';

export { ampLogo, deezerLogo, gmrLogo, wcmLogo, wmgLogo, lisaTrackProfile, steveRightsProfile }

export default [
    {
      id: 'bunny_records',
      type: 'label',
      title: 'Bunny Records',
      iconURL: bunnyLogoIcon,
      logoURL: bunnyLogo,
      user: {
        title: "Lisa Track",
        role: "Administrator",
        imgURL: lisaTrackProfile
      },
      queueCards: [
        {
          id: "1",
          status: "unread",
          title: "Catalog transfer",
          description: "Catalog transfer from Bunny Records to CRD Records for 16 masters",
          datetime: "2020-08-31T14:46",
          project: "Rights transfer, CRD Records",
          progressPct: 20
        },
        {
          id: "2",
          status: "needs-response",
          title: "Interesting band | Jelly Club",
          datetime: "2020-08-31T13:26",
          project: "Potential artist, Hard rock",
          progressPct: 40
        },
        {
          id: "3",
          status: "needs-response",
          title: "Cover art | GG Greatest Hits",
          datetime: "2020-08-25T17:02",
          project: "New album, Golden Girl",
          progressPct: 40
        },
        {
          id: "4",
          status: "complete",
          title: "Agreements | BB Clarke",
          datetime: "2020-08-20T15:11",
          project: "Rights transfer, CRD Records",
          progressPct: 100
        },
        {
          id: "5",
          status: "complete",
          title: "Agreements | Pia Midina",
          datetime: "2020-07-31T11:40",
          project: "Rights transfer, CRD Records",
          progressPct: 100
        },
        {
          id: "6",
          status: "recent-activity",
          title: "Registration | GG Greatest Hits",
          datetime: "2020-07-30T09:22",
          project: "New album, Golden Girl",
          progressPct: 40
        },
        {
          id: "7",
          status: "complete",
          title: "Request | Pia Midina",
          datetime: "2020-07-16T13:38",
          project: "Rights transfer, CRD Records",
          progressPct: 100
        },
        {
          id: "8",
          status: "recent-activity",
          title: "Tracks | GG Greatest Hits",
          datetime: "2020-07-15T12:21",
          project: "New album, Golden Girl",
          progressPct: 40
        }
      ]
    },
    {
      id: 'crd_records',
      type: 'label',
      title: 'CRD Records',
      iconURL: crdRecordsIcon,
      logoURL: crdRecordsLogo,
      user: {
        title: "Steve Rights",
        role: "Catalog Manager",
        imgURL: steveRightsProfile
      },
      queueCards: [
        {
          id: "1",
          status: "unread",
          title: "Catalog transfer",
          description: "Catalog transfer from Bunny Records to CRD Records for 16 masters",
          datetime: "2020-08-31T14:56",
          project: "Rights transfer, Bunny Records",
          progressPct: 40
        },
        {
          id: "2",
          status: "needs-response",
          title: "Radio interview | FM8",
          datetime: "2020-08-25T11:00",
          project: "Interviews, CEO",
          progressPct: 20
        },
        {
          id: "3",
          status: "complete",
          title: "To Dos",
          datetime: "2020-08-13T10:10",
          project: "Rights transfer, Bunny Records",
          progressPct: 100
        },
        {
          id: "4",
          status: "recent-activity",
          title: "TV interview | ZBZ",
          datetime: "2020-08-12T16:38",
          project: "Interviews, CEO",
          progressPct: 40
        },
        {
          id: "5",
          status: "recent-activity",
          title: "Newspaper interview | New Times",
          datetime: "2020-07-29T17:01",
          project: "Interviews, CEO",
          progressPct: 40
        }
      ]
    },
    {
      id: 'warner-music-group',
      type: 'label',
      title: 'Warner Music Group',
      iconURL: wmgLogo,
      logoURL: wmgLogo
    },
    {
      id: 'allegro-music-publishing',
      type: 'publisher',
      title: 'Allegro Music Publishing',
      iconURL: ampLogo,
      logoURL: ampLogo,
      territory: 'worldwide',
      ipi: '00170191322',
      website: 'www.allegromusic.com',
      main_office: 'New York, USA',
      musicalWorkOnly: true
    },
    {
      id: 'warner-chappell-music',
      type: 'publisher',
      title: 'Warner Chappell Music',
      iconURL: wcmLogo,
      logoURL: wcmLogo,
      territory: 'worldwide',
      ipi: '00160187388',
      website: 'www.warnerchappell.com',
      main_office: 'Los Angeles, USA',
      musicalWorkOnly: true
    },
    {
      id: 'global-music-rights',
      title: 'Global Music Rights',
      iconURL: gmrLogo,
      logoURL: gmrLogo,
      musicalWorkOnly: true
    },
    {
      id: 'deezer',
      title: 'Deezer',
      iconURL: deezerLogo,
      logoURL: deezerLogo
    },
  ];