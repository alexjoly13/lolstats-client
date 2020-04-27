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

export function getTotalKills(participantsArray, scoreTeamId) {
  let totalKills = 0;
  participantsArray.forEach((oneParticipant) => {
    if (oneParticipant.teamId === scoreTeamId) {
      totalKills += oneParticipant.stats.kills;
    }
  });
  return totalKills;
}

export function getTotalDeaths(participantsArray, scoreTeamId) {
  let totalDeaths = 0;
  participantsArray.forEach((oneParticipant) => {
    if (oneParticipant.teamId === scoreTeamId) {
      totalDeaths += oneParticipant.stats.deaths;
    }
  });
  return totalDeaths;
}

export function getTotalAssists(participantsArray, scoreTeamId) {
  let totalAssists = 0;
  participantsArray.forEach((oneParticipant) => {
    if (oneParticipant.teamId === scoreTeamId) {
      totalAssists += oneParticipant.stats.assists;
    }
  });
  return totalAssists;
}

export function winOrLose(team) {
  return team.win === "Win" ? (
    <span className="victory-text">VICTORY</span>
  ) : (
    <span className="defeat-text">DEFEAT</span>
  );
}

export function KPCalculator(totalTeamKills, playerKills, playerAssists) {
  return Math.floor(((playerKills + playerAssists) / totalTeamKills) * 100);
}
