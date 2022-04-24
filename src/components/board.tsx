import * as React from 'react';
import styled from 'styled-components';

function Board() {
  const WIDTH: number = 8;
  const TOTAL_CELL: number = WIDTH * WIDTH;
  const TOTAL_MINE: number = 10;
  const mineMap = new Array(TOTAL_CELL).fill(0);

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  for (let i = 0; i < TOTAL_MINE; i++) {
    const randomInt = getRandomInt(TOTAL_CELL);

    if (mineMap[randomInt] === -1) {
      i--;
      continue;
    }

    mineMap[randomInt] = -1;
  }

  return (
    <Wrapper>
      {mineMap.map((el, index) => {
        return <Cell key={`${index}-${el}`}>{el}</Cell>;
      })}
    </Wrapper>
  );
}
export default Board;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  width: 160px;
  height: 160px;
  border: solid 1px green;
`;
const Cell = styled.button`
  width: 100%;
  height: 100%;
  background-color: #bdbdbd;
`;
