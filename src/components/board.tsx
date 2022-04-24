import styled from 'styled-components';

function Board() {
  let mineMap = [];
  for (let i = 0; i < 64; i++) {
    mineMap.push(`${i}`);
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
