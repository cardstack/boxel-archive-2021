import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MovieRegistryVersionsController extends Controller {
  @tracked versions = this.model.versions;
  @tracked latest = this.model.movie.version;
  @tracked base = this.model.movie.version;

  @action
  displayVersion(id) {
    this.base = id;
  }
}
