import Component from '@glimmer/component';
import { action } from '@ember/object';

interface BoxelInputComponentArgs {
  onInput?(value: string): void;
}

export default class BoxelInputComponent extends Component<BoxelInputComponentArgs> {
  @action handleInput(event: InputEvent): void {
    this.args.onInput?.((event.target as HTMLInputElement).value);
  }
}
