import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import move from 'ember-animated/motions/move';
import drag from '../motions/drag';
import { printSprites } from 'ember-animated';

export default class TicTacToeController extends Controller {
  ticTacToeCells = {
    topLeft: [],
    topCenter: [],
    topRight: [],
    middleLeft: [],
    middleCenter: [],
    middleRight: [],
    bottomLeft: [],
    bottomCenter: [],
    bottomRight: [],
  };

  pieceX = { symbol: '❌' };
  pieceO = { symbol: '⭕' };

  @action beginDragging(piece, event) {
    let dragState;
    let self = this;

    function finishDrag(event) {
      // copy piece to the active cell
      if (self.activeCell) {
        let { clientX: x, clientY: y } = event;
        set(piece, 'dropCoords', { x, y });
        self.set(`ticTacToeCells.${self.activeCell}`, [piece]);
        self.set('activeCell', null);
      }

      set(piece, 'dragState', null);
      window.removeEventListener('dragend', finishDrag);
    }

    dragState = {
      usingKeyboard: false,
      initialPointerX: event.x,
      initialPointerY: event.y,
      latestPointerX: event.x,
      latestPointerY: event.y
    };
    window.addEventListener('dragend', finishDrag);

    set(piece, 'dragState', dragState);
  }

  @action setActiveCell(cell) {
    this.set('activeCell', cell);
  }

  @action foo(event) {
    event.preventDefault();
  }

  * dragTransition ({ insertedSprites, keptSprites }) {
    printSprites(arguments[0], 'transition');

    keptSprites.forEach(sprite => {
      drag(sprite, { others: [] });
    });

    insertedSprites.forEach(sprite => {
      let dropCoords = sprite.owner.value.dropCoords;
      sprite.startAtPixel(dropCoords);
      move(sprite);
    })
  }
}