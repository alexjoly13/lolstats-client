import React from "react";

export function winrateCalculator(wins, loss) {
  const result = Math.floor((wins / (wins + loss)) * 100);

  if (result >= 60) {
    return <span className="kills-text-color">{result}%</span>;
  } else if (result <= 30) {
    return <span className="deaths-text-color">{result}%</span>;
  } else {
    return <span>{result}%</span>;
  }
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

export function getAverageKDA(lastGamesArray, searchedSummonerName) {
  let globalKills = 0;
  let globalDeaths = 0;
  let globalAssists = 0;
  lastGamesArray.map((oneGame) => {
    oneGame.participants.map((oneParticipant) => {
      return oneParticipant.summonerName === searchedSummonerName
        ? ((globalKills += oneParticipant.stats.kills),
          (globalDeaths += oneParticipant.stats.deaths),
          (globalAssists += oneParticipant.stats.assists))
        : ((globalKills += 0), (globalDeaths += 0), (globalAssists += 0));
    });
  });
  const killAverage = globalKills / 10;
  const deathAverage = globalDeaths / 10;
  const assistAverage = globalAssists / 10;
  return (
    <div>
      <div>
        <span className="kills-text-color font-weight-bold">{killAverage}</span>{" "}
        <span> / </span>
        <span className="deaths-text-color font-weight-bold">
          {deathAverage}
        </span>{" "}
        <span> / </span>
        <span className="assists-text-color font-weight-bold">
          {assistAverage}
        </span>
      </div>

      <div>
        <span>{kdaCalculator(killAverage, assistAverage, deathAverage)}</span>
      </div>
    </div>
  );
}
