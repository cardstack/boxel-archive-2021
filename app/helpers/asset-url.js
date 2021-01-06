import { helper } from '@ember/component/helper';
import ENV from '@cardstack/boxel/config/environment';

export function assetUrl(url) {
  if (!url) {
    return;
  }
  url = url.replace(/^\//, '').replace(ENV.rootUrl, '');
  if (ENV.environment === 'production') {
    return url;
  } else {
    return `${ENV.rootURL}${url}`;
  }
}

export default helper(function([url]) { return assetUrl(url) });
