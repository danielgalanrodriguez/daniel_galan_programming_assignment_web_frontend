import React, { useState, useEffect } from "react";

function Countdown(props) {
  const [secondsRemaining, setSecondsRemaining] = useState(props.maxSeconds);

  // The interval is initialized and updates the countdown every second.
  // The interval is deleted once the component is unmounted.
  useEffect(() => {
    const intervalId = setInterval(
      () => setSecondsRemaining(prevSeconds => prevSeconds - 1),
      1000
    );
    return () => clearInterval(intervalId);
  }, []);

  // For each countdown update, we check if we have reached the end.
  // If so, it is reset and the function that handles the end is executed.
  useEffect(() => {
    if (secondsRemaining < 0) {
      setSecondsRemaining(props.maxSeconds);
      props.endHandler();
    }
  }, [secondsRemaining, props]);

  // If props changes, it means that the countdown needs to be modified.
  // I may be a time modification, so the seconds are changed.
  // Or it can be an extra reset.
  useEffect(() => {
    if (props.needModification) {
      setSecondsRemaining(prevSeconds => prevSeconds + props.secondsToModify);
      props.setNeedModification(false);
    }
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
