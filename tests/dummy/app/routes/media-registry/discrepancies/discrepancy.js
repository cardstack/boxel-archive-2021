import Route from '@ember/routing/route';
import DISCREPANCIES from '../../../data/comp-1-wmg-wcm';

export default class MediaRegistryDiscrepanciesDiscrepancyRoute extends Route {
  model({ compId }) {
    return DISCREPANCIES.find(el => el.id === compId);
  }
}
