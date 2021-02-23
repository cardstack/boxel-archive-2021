import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import CRDLogo from '@cardstack/boxel/usage-support/images/media-registry/orgs/crd_records_logo.svg';

export default class BoxelOrgHeaderComponent extends Component {
  @tracked title = 'CRD Records';
  @tracked logoURL = CRDLogo;
  @tracked headerBackgroundColor = 'var(--boxel-blue)';
  @tracked headerTextColor = 'var(--boxel-light)';
  @tracked headerLogoSize = 'auto 2rem';
  @tracked headerLogoPosition = 'center';
}
