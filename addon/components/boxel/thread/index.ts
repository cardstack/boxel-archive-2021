import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class ThreadMessageUsageComponent extends Component {
  @tracked watchedElement: HTMLElement | null = null;
  @tracked scrollEl: HTMLElement | null = null;
  @tracked showFooter = false;

  @action setWatchedElement(element: HTMLElement): void {
    this.watchedElement = element;
  }

  @action setScrollEl(element: HTMLElement): void {
    this.scrollEl = element;
  }

  @action onElementVisible(): void {
    this.showFooter = false;
  }
  @action onElementHidden(): void {
    this.showFooter = true;
  }

  @action scrollDownToFirst(elements: HTMLElement[]): void {
    let element = elements[0];
    if (element) {
      let elementBounds = element.getBoundingClientRect();
      let scrollBounds = this.scrollEl?.getBoundingClientRect() || {
        bottom: -Infinity,
      };

      let diff = elementBounds.top - scrollBounds.bottom;

      // need to handle for when the scroll element touches bottom of screen
      if (diff < 40 && diff >= -40) {
        this.scrollEl?.scrollTo({
          top: element.offsetTop,
          left: 0,
          behavior: 'smooth',
        });
      }
    }
  }
}
