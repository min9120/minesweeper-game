import { observer } from 'mobx-react-lite';
import * as React from 'react';

import styled from 'styled-components';
import { GlobalStateContext } from '../modules';
import { Cell } from '../modules/gameStore';

const Board = observer(() => {
  const game = React.useContext(GlobalStateContext);

  function onClickHandler(cell: Cell, pos: { x: number; y: number }) {
    if (!game.isStart) {
      game.start();
    }

    if (cell.isZero()) {
      game.openSafeCells(pos.x, pos.y);
    } else if (cell.isMine()) {
      game.openMines();
    } else {
      game.openCell(pos.x, pos.y);
    }
    game.checkWin();
  }

  function onRightClickHandler(cell: Cell, pos: { x: number; y: number }) {
    if (cell.isPicked) {
      game.removeFlag(pos.x, pos.y);
      game.saveMineCount(game.mineCount + 1);
      return;
    }
    game.pickFlag(pos.x, pos.y);
    game.saveMineCount(game.mineCount - 1);
  }

  return (
    <GridWrapper>
      {game.board.map((rows, x) =>
        rows.map((cell, y) => {
          return (
            <GridItemWrapper key={y}>
              <GridButton
                disabled={cell.isPicked}
                isOpen={cell.isOpen}
                onClick={() => {
                  onClickHandler(cell, { x, y });
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  onRightClickHandler(cell, { x, y });
                }}
              >
                {cell.isPicked ? '🚩' : ''}
              </GridButton>
              <GridItem>{cell.isZero() ? '' : cell.isMine() ? '💣' : cell.cell}</GridItem>
            </GridItemWrapper>
          );
        }),
      )}
    </GridWrapper>
  );
});
0;
export default Board;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  width: 400px;
  height: 400px;
  border-top: 2px solid pink;
  border-left: 2px solid pink;
  background-color: #bdbdbd;
  > div {
    border-right: 2px solid pink;
    border-bottom: 2px solid pink;
  }
`;
const GridItemWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const GridItem = styled.div`
  width: 100%;
  height: 100%;
  background-color: #bdbdbd;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const GridButton = styled.button<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'none' : 'block')};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #bdbdbd;
  font-size: 20px;
  font-weight: bold;
  :disabled {
    background-color: #bdbdbd;
    color: #000000;
  }
`;
