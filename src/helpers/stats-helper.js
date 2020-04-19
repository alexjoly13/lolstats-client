import React from "react";

export function winrateCalculator(wins, loss) {
  return Math.floor((wins / (wins + loss)) * 100) + "%";
}

export function kdaCalculator(kills, assists, deaths) {
  if (kills === 0 && assists === 0 && deaths === 0) {
    return "0:00 KDA";
  } else if (kills > 0 && assists > 0 && deaths === 0) {
    return "Perfect KDA";
  } else {
    return Math.floor(((kills + assists) / deaths) * 100) / 100 + " :1 KDA";
  }
}

export function getTeamStats(participantsArray, scoreTeamId) {
  let Kills = 0;
  let Deaths = 0;
  let Assists = 0;

  participantsArray.forEach((oneParticipant) => {
    if (oneParticipant.teamId === scoreTeamId) {
      Kills += oneParticipant.stats.kills;
      Deaths += oneParticipant.stats.deaths;
      Assists += oneParticipant.stats.assists;
    }
  });

  return Kills + " / " + Deaths + " / " + Assists;
}

export function winOrLose(team) {
  return team.win === "Win" ? (
    <span className="victory-text">VICTORY</span>
  ) : (
    <span className="defeat-text">DEFEAT</span>
  );
}
