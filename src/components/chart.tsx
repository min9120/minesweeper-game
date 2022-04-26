import * as React from 'react';
import styled from 'styled-components';

function Chart() {
  const fakeData = [{ record: 31 }, { record: 102 }, { record: 200 }, { record: 535 }, { record: 312 }, { record: 42 }];
  const sortedData = fakeData.sort((a, b) => a.record - b.record);
  return (
    <>
      {sortedData.map((el, index) => {
        return (
          <CharItem key={`${index}-${el.record}`}>
            <p>{`${index + 1}.`}</p>
            <p>{el.record}</p>
          </CharItem>
        );
      })}
    </>
  );
}
export default Chart;

const CharItem = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
