import Controller from '@ember/controller';
import { action } from '@ember/object';
import move from 'ember-animated/motions/move';
import drag from '../motions/drag';
import { printSprites } from 'ember-animated';

export default class DragDropController extends Controller {
  draggedCards = [];

  @action beginDragging(card, event) {
    let dragState;
    let self = this;

    function stopMouse() {
      self.set('draggableCards', []);
      self.set('draggedCards', [card]);
      card.set('dragState', null);
      window.removeEventListener('mouseup', stopMouse);
      window.removeEventListener('mousemove', updateMouse);
    }

    function updateMouse(event) {
      dragState.latestPointerX = event.x;
      dragState.latestPointerY = event.y;
    }

    dragState = {
      usingKeyboard: false,
      initialPointerX: event.x,
      initialPointerY: event.y,
      latestPointerX: event.x,
      latestPointerY: event.y
    };
    window.addEventListener('mouseup', stopMouse);
    window.addEventListener('mousemove', updateMouse);

    card.set('dragState', dragState);
  }

  * dragTransition ({ keptSprites, receivedSprites }) {
    printSprites(arguments[0], 'transition');

    keptSprites.forEach(sprite => {
      drag(sprite, { others: [] });
    });

    receivedSprites.forEach(move);
  }
}