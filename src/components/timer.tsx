import * as React from 'react';
import { useEffect, useState } from 'react';
import DisplayBox from './displayBox';
type TimerPropsType = {
  isStart: boolean;
  isOver: boolean;
  isWin: boolean;
};
function Timer(props: TimerPropsType) {
  const [sec, setSec] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (props.isOver || props.isWin) {
        return;
      }
      if (props.isStart) {
        setSec(sec + 1);
      }
    }, 1000);
  }, [sec, props.isStart, props.isOver, props.isWin]);

  return <DisplayBox value={sec}></DisplayBox>;
}
export default Timer;
