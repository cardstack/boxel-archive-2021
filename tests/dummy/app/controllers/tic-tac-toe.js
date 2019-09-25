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

  @action beginDragging(piece, dragEvent) {
    let dragState;
    let self = this;

    this.set('finishDrag', (dropEvent) => {
      if (self.activeCell) {
        let { x, y } = dropEvent;
        let { offsetX, offsetY } = dragEvent;
        set(piece, 'dropCoords', { x: x - offsetX, y: y - offsetY });
        self.set(`ticTacToeCells.${self.activeCell}`, [piece]);
        self.set('activeCell', null);
      }

      set(piece, 'dragState', null);
    });

    dragState = {
      usingKeyboard: false,
      initialPointerX: dragEvent.x,
      initialPointerY: dragEvent.y,
      latestPointerX: dragEvent.x,
      latestPointerY: dragEvent.y
    };

    set(piece, 'dragState', dragState);
  }

  @action setActiveCell(cell) {
    this.set('activeCell', cell);
  }

  @action foo(event) {
    event.preventDefault();
  }

  @action dropPiece(event) {
    this.finishDrag(event);
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