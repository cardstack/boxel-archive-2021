import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class EditDemoController extends Controller {
  editing = false;

  @action toggleEdit() {
    this.set('editing', !this.editing);
  }
}
