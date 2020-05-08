import React from "react";
import Blink from "react-blink-text";

export function getLeagueLocation(id) {
  switch (id) {
    case 4198:
      return <span> (USA)</span>;
    case 4197:
      return <span> (Europe)</span>;
    case 294:
      return <span> (China)</span>;
    case 293:
      return <span> (Korea)</span>;
    default:
      return <span></span>;
  }
}

export function isMatchLive(gameToCheck) {
  const actualDate = new Date();

  if (
    new Date(gameToCheck.begin_at) < actualDate &&
    gameToCheck.end_at === null
  ) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Blink color="red" text="•" fontSize="40px"></Blink>
        <span>LIVE</span>
      </div>
    );
  }
}
