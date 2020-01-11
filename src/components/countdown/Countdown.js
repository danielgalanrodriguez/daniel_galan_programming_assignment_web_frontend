import React, { useState, useEffect } from "react";

function Countdown(props) {
  const [secondsRemaining, setSecondsRemaining] = useState(props.maxSeconds);

  useEffect(() => {
    const intervalId = setInterval(
      () => setSecondsRemaining(prevSeconds => prevSeconds - 1),
      1000
    );
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (secondsRemaining < 0) {
      setSecondsRemaining(props.maxSeconds);
      props.endHandler();
    }
  }, [secondsRemaining, props]);

  useEffect(() => {
    if (props.needModification) {
      setSecondsRemaining(prevSeconds => prevSeconds + props.secondsToModify);
      props.setNeedModification(false);
    }
  }, [props]);

  useEffect(() => {
    if (props.needReset) {
      setSecondsRemaining(props.maxSeconds);
      props.setNeedReset(false);
    }
  }, [props]);

  return (
    <div>
      <div className="player-time player-time-label">Time Left:</div>
      <div className="player-time">{secondsRemaining}</div>
    </div>
  );
}

export default Countdown;
