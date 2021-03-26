import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { reads } from 'macro-decorators';

import move from 'ember-animated/motions/move';
import { fadeIn } from 'ember-animated/motions/opacity';
import { parallel, wait } from 'ember-animated';
import { easeOut } from 'ember-animated/easings/cosine';

export default class WorkflowThread extends Component {
  @tracked progress = 0;
  @tracked displayCompletionMessage = false;
  @reads('args.milestones.0.datetime') startTimestamp;
  @reads('args.milestones.length') milestonesLength;

  get milestone() {
    return this.args.milestones[this.progress];
  }

  get progressStatus() {
    if (!this.milestonesLength) {
      return null;
    }

    if (this.progress === 0) {
      return 'Workflow started';
    }

    return this.args.milestones[this.progress - 1].statusOnCompletion;
  }

  @action
  toggleComplete(milestone) {
    set(milestone, 'complete', !milestone.complete);
  }

  @action
  updateProgress() {
    if (this.progress === this.milestonesLength) {
      return;
    }

    this.progress++;

    if (this.progress === this.milestonesLength) {
      this.displayCompletionMessage = true;
    }
  }

  *revealCard({ insertedSprites, duration }) {
    for (let sprite of insertedSprites) {
      yield wait(duration);
      sprite.startTranslatedBy(0, 30);
      parallel(
        fadeIn(sprite, { easing: easeOut, duration: 400 }),
        move(sprite, { easing: easeOut, duration: 400 })
      );
    }
  }

  *bannerTransition({ insertedSprites }) {
    for (let sprite of insertedSprites) {
      sprite.startTranslatedBy(0, 30);
      parallel(
        fadeIn(sprite, { easing: easeOut, duration: 1000 }),
        move(sprite, { easing: easeOut, duration: 1000 })
      );
    }
  }
}
