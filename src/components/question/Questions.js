import React, { useState, useEffect } from "react";
import Countdown from "../countdown/Countdown";

const secondsToAnswer = 15;
const secondsToAdd = 10;

function Questions(params) {
  const countdownEndHandler = () => alert("finished!");
  return (
    <div className="player-panel">
      <button
        className={"btn-more-time " /*+ (useTimeLifeline && "btn-red")*/}
        onClick={() => alert("used!")}
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
        endHandler={countdownEndHandler}
        needReset={false}
      />
    </div>
  );
}

export default Questions;
