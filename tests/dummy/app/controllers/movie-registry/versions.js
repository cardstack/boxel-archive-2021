import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MovieRegistryVersionsController extends Controller {
  @tracked versions = this.model.versions;
  @tracked latest = this.versions[this.versions.length - 1].id;
  @tracked selected = this.latest;

  @action
  displayVersion(id) {
    this.selected = id;
  }
}
