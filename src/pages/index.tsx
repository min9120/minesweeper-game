import * as React from 'react';
import styled from 'styled-components';
import Board from '../components/board';

function MainPage() {
  return (
    <Wrapper>
      <Board></Board>
    </Wrapper>
  );
}

export default MainPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
