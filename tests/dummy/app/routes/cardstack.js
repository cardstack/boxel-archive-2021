import Route from '@ember/routing/route';
import CardstackLogo from '../../../public/@cardstack/boxel/images/icons/cardstack-logo.svg';

const ORGS = [
  {
    id: 'card-space',
    title: 'Card Space',
    url: 'cardstack.card-space',
  },
  {
    id: 'card-pay',
    title: 'Card Pay',
    url: 'cardstack.card-pay',
  },
  {
    id: 'card-catalog',
    title: 'Card Catalog',
  },
  {
    id: 'card-membership',
    title: 'Card Membership',
  },
];

export default class CardstackRoute extends Route {
  async model() {
    return {
      logo: CardstackLogo,
      orgs: ORGS,
    };
  }
}
