import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MovieRegistryVersionsController extends Controller {
  @tracked versions = this.model.versions;
  @tracked latest = this.versions[this.versions.length - 1].id;
  @tracked selected = this.latest;

  @action
  displayVersion(id) {
    if (this.baseCard && this.baseCard === id) {
      this.baseCard = null;
      this.comparisonCard = null;
      this.selected = id;
    } else if (this.baseCard) {
      this.comparisonCard = id;
    } else {
      this.selected = id;
    }
  }

  @action
  setComparison(id) {
    if (this.baseCard && this.baseCard === id) {
      this.baseCard = null;
      this.comparisonCard = null;
    } else if (this.baseCard) {
      this.comparisonCard = id;
    } else {
      this.baseCard = id;
      this.selected = id;
    }
  }
}
