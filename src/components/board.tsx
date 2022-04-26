import * as React from 'react';
import styled from 'styled-components';
type BoardPropsType = {
  width: number;
  totalMine: number;
  mineCount: number;
  isStart: boolean;
  setOver: (e: boolean) => void;
  setMineCount: (e: number) => void;
  setWin: (e: boolean) => void;
  setStart: (e: boolean) => void;
};
interface MineMap {
  cell: number;
  isOpen: boolean;
}

function Board(props: BoardPropsType) {
  const WIDTH = props.width;
  const TOTAL_MINE = props.totalMine;
  const TOTAL_CELL = WIDTH * WIDTH;
  const mineCount = props.mineCount;
  const [mineMap, setMineMap] = React.useState(initMineMap());

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  function initRandomMine(mineMap: MineMap[][]) {
    for (let i = 0; i < TOTAL_MINE; i++) {
      const randomIntX = getRandomInt(WIDTH);
      const randomIntY = getRandomInt(WIDTH);

      if (mineMap[randomIntX][randomIntY].cell === -1) {
        i--;
        continue;
      }

      mineMap[randomIntX][randomIntY].cell = -1;
    }

    return mineMap;
  }
  function initMineMap() {
    let mineMap = Array.from(Array(WIDTH), () => {
      return Array(WIDTH)
        .fill(undefined)
        .map(() => {
          return {
            cell: 0,
            isOpen: false,
          };
        });
    });
    mineMap = initRandomMine(mineMap);

    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < WIDTH; y++) {
        let mineCount: number = 0;
        if (mineMap[x][y].cell === -1) continue;
        // 윗줄
        if (x > 0) {
          mineMap[x - 1][y].cell === -1 ? mineCount++ : null;
          if (y > 0) {
            mineMap[x - 1][y - 1].cell === -1 ? mineCount++ : null;
          }
          if (y < WIDTH - 1) {
            mineMap[x - 1][y + 1].cell === -1 ? mineCount++ : null;
          }
        }
        // 왼쪽
        if (y > 0) {
          mineMap[x][y - 1].cell === -1 ? mineCount++ : null;
        }
        // 오른쪽
        if (y < WIDTH - 1) {
          mineMap[x][y + 1].cell === -1 ? mineCount++ : null;
        }
        // 아랫줄
        if (x < WIDTH - 1) {
          mineMap[x + 1][y].cell === -1 ? mineCount++ : null;
          if (y > 0) {
            mineMap[x + 1][y - 1].cell === -1 ? mineCount++ : null;
          }
          if (y < WIDTH - 1) {
            mineMap[x + 1][y + 1].cell === -1 ? mineCount++ : null;
          }
        }

        mineMap[x][y].cell = mineCount;
      }
    }
    return mineMap;
  }
  function openSafeZone(x: number, y: number) {
    const newMineMap = [...mineMap];
    const zeroInCell: { x: number; y: number }[] = [];

    function cellOpen(x: number, y: number) {
      if (newMineMap[x][y].isOpen === false) {
        newMineMap[x][y].isOpen = true;
        newMineMap[x][y].cell === 0 && zeroInCell.push({ x, y });
      }
    }

    if (x > 0) {
      cellOpen(x - 1, y);

      if (y > 0) {
        cellOpen(x - 1, y - 1);
      }
      if (y < WIDTH - 1) {
        cellOpen(x - 1, y + 1);
      }
    }
    // 왼쪽
    if (y > 0) {
      cellOpen(x, y - 1);
    }
    // 오른쪽
    if (y < WIDTH - 1) {
      cellOpen(x, y + 1);
    }
    // 아랫줄
    if (x < WIDTH - 1) {
      cellOpen(x + 1, y);

      if (y > 0) {
        cellOpen(x + 1, y - 1);
      }
      if (y < WIDTH - 1) {
        cellOpen(x + 1, y + 1);
      }
    }
    if (zeroInCell.length) {
      zeroInCell.forEach((cell) => {
        openSafeZone(cell.x, cell.y);
      });
    } else {
      setMineMap(newMineMap);
    }
  }
  function openMines() {
    const newMineMap = [...mineMap];
    for (let x = 0; x < newMineMap.length; x++) {
      for (let y = 0; y < newMineMap[0].length; y++) {
        if (newMineMap[x][y].cell !== -1) continue;
        newMineMap[x][y].cell === -1 ? (newMineMap[x][y].isOpen = true) : null;
      }
    }
    setMineMap(newMineMap);
  }
  function getOpenCellCount() {
    return mineMap.map((value) => value.filter((v) => v.isOpen === true).length).reduce((pre, curr) => pre + curr);
  }

  const onClickHandler = (el: MineMap, pos: { x: number; y: number }) => {
    if (el.cell === 0) {
      openSafeZone(pos.x, pos.y);
    } else if (el.cell === -1) {
      openMines();
      props.setOver(true);
    } else {
      const newMineMap = [...mineMap];
      newMineMap[pos.x][pos.y].isOpen = true;
      setMineMap(newMineMap);
    }
    if (getOpenCellCount() === TOTAL_CELL - TOTAL_MINE) {
      props.setWin(true);
    }
    if (!props.isStart) {
      props.setStart(true);
    }
  };
  return (
    <GridWrapper>
      {mineMap.map((elements, indexX) =>
        elements.map((el, indexY) => {
          return (
            <GridItemWrapper key={indexY}>
              <GridButton
                style={{
                  display: el.isOpen ? 'none' : 'block',
                }}
                onClick={() => {
                  onClickHandler(el, { x: indexX, y: indexY });
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (e.currentTarget.innerText === '') {
                    e.currentTarget.innerText = '🚩';
                    e.currentTarget.disabled = true;
                    props.setMineCount(mineCount - 1);
                  } else {
                    e.currentTarget.innerText = '';
                    e.currentTarget.disabled = false;
                    props.setMineCount(mineCount + 1);
                  }
                }}
              ></GridButton>
              <GridItem>{el.cell === 0 ? '' : el.cell === -1 ? '💣' : el.cell}</GridItem>
            </GridItemWrapper>
          );
        }),
      )}
    </GridWrapper>
  );
}
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
const GridButton = styled.button`
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
