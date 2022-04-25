import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Board from '../components/board';
import DisplayBox from '../components/displayBox';

function MainPage() {
  const WIDTH: number = 8;
  const TOTAL_MINE: number = 10;
  const [isOver, setOver] = useState(false);

  return (
    <PageWrapper>
      <TopContentWrapper>
        <DisplayBox value={4} />
        <StateButton onClick={() => setOver(false)}>{isOver ? '😈' : '🙂'}</StateButton>
        <DisplayBox value={40} />
      </TopContentWrapper>
      <p>다시 시작 하고 싶다면 이모지를 누르세요👆</p>
      <Board width={WIDTH} totalMine={TOTAL_MINE} setOver={(e) => setOver(e)}></Board>
    </PageWrapper>
  );
}

export default MainPage;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const TopContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
  width: 400px;
`;
const StateButton = styled.button`
  outline: none;
  font-size: 20px;
  border: none;
  background: none;
  cursor: pointer;
`;
