import { observer } from 'mobx-react-lite';
import * as React from 'react';
import styled from 'styled-components';
import Board from '../components/board';
import DisplayBox from '../components/displayBox';
import Timer from '../components/timer';
import { GlobalStateContext } from '../modules';

const MainPage = observer(() => {
  const game = React.useContext(GlobalStateContext);

  return (
    <PageWrapper>
      <TopContentWrapper>
        <DisplayBox value={game.mineCount} />
        <StateButton
          onClick={() => {
            game.reset();
          }}
        >
          {game.isOver ? '😈' : game.isWin ? '😎' : '🙂'}
        </StateButton>
        <Timer isOver={game.isOver} isStart={game.isStart} isWin={game.isWin} />
      </TopContentWrapper>
      <p>다시 시작 하고 싶다면 이모지를 누르세요👆</p>
      <Board />
    </PageWrapper>
  );
});
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
