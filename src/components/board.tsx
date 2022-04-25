import * as React from 'react';
import styled from 'styled-components';

function Board() {
  const WIDTH: number = 8;
  const TOTAL_MINE: number = 10;
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
    <Wrapper>
      {mineMap.map((elements) =>
        elements.map((el, index) => {
          return <Cell key={`${index}-${el}`}>{el}</Cell>;
        }),
      )}
    </Wrapper>
  );
}
export default Board;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  width: 400px;
  height: 400px;
  border: solid 1px green;
`;
const Cell = styled.button`
  width: 100%;
  height: 100%;
  background-color: #bdbdbd;
  font-size: 12px;
  font-weight: bold;
`;
