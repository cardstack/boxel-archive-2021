import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { dropTask } from 'ember-concurrency-decorators';
import { assetUrl } from '@cardstack/boxel/helpers/asset-url'

export default class PlayButtonComponent extends Component {
  url = '/assets/demo_flac.flac';
  @tracked isPlaying = false;

  willDestroy() {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  @action
  setupAudio() {
    this.audio = new Audio(assetUrl(this.url));
    this.audio.addEventListener('play', () => this.isPlaying = true);
    this.audio.addEventListener('pause', () => this.isPlaying = false);
  }

  @dropTask * playPause() {
    if (this.isPlaying) {
      yield this.audio.pause();
    } else {
      yield this.audio.play();
    }
  }
}
