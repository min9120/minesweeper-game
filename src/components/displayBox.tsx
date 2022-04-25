import * as React from 'react';
import styled from 'styled-components';

type DisplayBoxProps = {
  value: number;
};
function DisplayBox(props: DisplayBoxProps) {
  return <BoxWrapper>{props.value}</BoxWrapper>;
}
export default DisplayBox;

const BoxWrapper = styled.div`
  height: 40px;
  width: 100px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  color: pink;
`;
