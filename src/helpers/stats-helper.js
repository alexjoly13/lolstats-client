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

export function getTeamStats(participantsArray) {
  let blueTeamKills = 0;
  let blueTeamDeaths = 0;
  let blueTeamAssists = 0;
  // let redTeamKills = 0;
  // let redTeamDeaths = 0;
  // let redTeamAssists = 0;

  participantsArray.forEach((oneParticipant) => {
    if (oneParticipant.teamId === 100) {
      blueTeamKills += oneParticipant.stats.kills;
      blueTeamDeaths += oneParticipant.stats.deaths;
      blueTeamAssists += oneParticipant.stats.assists;
    }
  });

  return blueTeamKills + " / " + blueTeamDeaths + " / " + blueTeamAssists;
}
