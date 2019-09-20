import Controller from '@ember/controller';
import { action } from '@ember/object';
import move from 'ember-animated/motions/move';
import drag from '../motions/drag';
import { printSprites } from 'ember-animated';

export default class DragDropController extends Controller {
  draggedCard = {};

  @action beginDragging(card, event) {
    let dragState;

    function stopMouse() {
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

  * transition ({ keptSprites }) {
    printSprites(arguments[0], 'transition');
    let activeSprite = keptSprites.find(sprite => sprite.owner.value.dragState);
    let others = keptSprites.filter(sprite => sprite !== activeSprite);
    if (activeSprite) {
      drag(activeSprite, {
        others,
        onCollision(otherSprite) {
          let myModel = activeSprite.owner.value;
          let otherModel = otherSprite.owner.value;
          let myPriority = myModel.sortPriorityWithDefault;
          myModel.set('sortPriority', otherModel.sortPriorityWithDefault);
          otherModel.set('sortPriority', myPriority);
        }
      });
    }
    others.forEach(move);
  }
}