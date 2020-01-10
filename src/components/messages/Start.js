import React from "react";

function Start(props) {
  return (
    <div className="player-panel">
      <button
        className="btn-new"
        onClick={props.startHandler }
        disabled={props.loading}
      >
        <i className="ion-ios-plus-outline"></i>
        NYYT SPEL!
      </button>

      <h1 className="player-name">
        Välkommen till Jayway Quiz!<br/>Redo att börja?
      </h1>
    </div>
  );
}

export default Start;
