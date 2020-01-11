import React, { useState, useEffect } from "react";
import Countdown from "../countdown/Countdown";

const secondsToAnswer = 10;
const secondsToAdd = 10;

function Questions(params) {
  const [countdownNeedReset, setCountdownNeedReset] = useState(false);
  const [countdownNeedModification, setCountdownNeedModification] = useState(
    false
  );

  const countdownEndHandler = () => alert("finished!");
  return (
    <div className="player-panel">
      <button
        className={"btn-more-time " /*+ (useTimeLifeline && "btn-red")*/}
        onClick={() => setCountdownNeedModification(true)}
        disabled={false}
      >
        +10 s
      </button>
      <button
        className={"btn-50-50 " /*+ (useFiftyLifeline && "btn-red")*/}
        onClick={() => alert("used!")}
        disabled={false}
      >
        50/50
      </button>

      <Countdown
        maxSeconds={secondsToAnswer}
        secondsToModify={secondsToAdd}
        endHandler={countdownEndHandler}
        needReset={countdownNeedReset}
        needModification={countdownNeedModification}
        setNeedReset={setCountdownNeedReset}
        setNeedModification={setCountdownNeedModification}
      />
    </div>
  );
}

export default Questions;
