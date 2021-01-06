import { helper } from '@ember/component/helper';

import cssUrl from 'ember-css-url';
import { assetUrl } from './asset-url';

export default helper(function([propertyName, url]/*, hash*/) {
  return cssUrl(propertyName, assetUrl(url));
});
