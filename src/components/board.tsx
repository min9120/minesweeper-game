import * as React from 'react';
import styled from 'styled-components';
type BoardPropsType = {
  width: number;
  totalMine: number;
  setOver: (e: boolean) => void;
};
function Board(props: BoardPropsType) {
  const WIDTH = props.width;
  const TOTAL_MINE = props.totalMine;
  const mineMap = Array.from(Array(WIDTH), () => Array(WIDTH).fill(0));

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  function initRandomMine() {
    for (let i = 0; i < TOTAL_MINE; i++) {
      const randomIntX = getRandomInt(WIDTH);
      const randomIntY = getRandomInt(WIDTH);

      if (mineMap[randomIntX][randomIntY] === -1) {
        i--;
        continue;
      }

      mineMap[randomIntX][randomIntY] = -1;
    }
  }
  function initMineMap() {
    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < WIDTH; y++) {
        let mineCount: number = 0;
        if (mineMap[x][y] === -1) continue;
        // 윗줄
        if (x > 0) {
          mineMap[x - 1][y] === -1 ? mineCount++ : null;
          if (y > 0) {
            mineMap[x - 1][y - 1] === -1 ? mineCount++ : null;
          }
          if (y < WIDTH - 1) {
            mineMap[x - 1][y + 1] === -1 ? mineCount++ : null;
          }
        }
        // 왼쪽
        if (y > 0) {
          mineMap[x][y - 1] === -1 ? mineCount++ : null;
        }
        // 오른쪽
        if (y < WIDTH - 1) {
          mineMap[x][y + 1] === -1 ? mineCount++ : null;
        }
        // 아랫줄
        if (x < WIDTH - 1) {
          mineMap[x + 1][y] === -1 ? mineCount++ : null;
          if (y > 0) {
            mineMap[x + 1][y - 1] === -1 ? mineCount++ : null;
          }
          if (y < WIDTH - 1) {
            mineMap[x + 1][y + 1] === -1 ? mineCount++ : null;
          }
        }

        mineMap[x][y] = mineCount;
      }
    }
  }

  initRandomMine();
  initMineMap();
  return (
    <GridWrapper>
      {mineMap.map((elements) =>
        elements.map((el, index) => {
          return (
            <GridItemWrapper key={`${index}-${el}`}>
              <GridButton
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (el === -1) {
                    props.setOver(true);
                  }
                  e.currentTarget.style.display = 'none';
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (e.currentTarget.innerText === '') {
                    e.currentTarget.innerText = '📌';
                  } else {
                    e.currentTarget.innerText = '';
                  }
                }}
              ></GridButton>
              <GridItem>{el}</GridItem>
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
  font-size: 12px;
  font-weight: bold;
`;
