import React from "react";
import moment from "moment";
import queueList from "../data/queues.json";
import { champImg } from "./images-helper";

export function gameCreatedAt(date) {
  let x = date.toString().slice(0, -3);
  let y = parseInt(x);
  let z = moment.unix(y).format("YYYYMMDD HH:mm:ss");
  return moment(z, "YYYYMMDD HH:mm:ss").fromNow();
}

export function getGameDuration(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  let adjustedSeconds;

  if (seconds <= 9) {
    adjustedSeconds = "0" + seconds;
  } else {
    adjustedSeconds = seconds;
  }

  if (time < 241) {
    return minutes + ":" + adjustedSeconds + " Remake";
  } else {
    return minutes + ":" + adjustedSeconds;
  }
}

export function getGameQueue(gameQueueId) {
  let retour;
  queueList.map((oneQueue) => {
    if (oneQueue.queueId === gameQueueId) {
      retour = oneQueue.description;
    }
  });
  return retour;
}

export function getTeamsSide(participantsArray, teamsId) {
  const teamPicked = participantsArray.filter(
    (player) => player.teamId === teamsId
  );

  return teamsId === 100 ? (
    <div className="">
      {teamPicked.map((onePlayer) => {
        return (
          <div>
            <img
              src={champImg(onePlayer.championId)}
              className="matchdetails-champ-icon"
              alt="champion icon"
            />
            <span>{onePlayer.summonerName}</span>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="">
      {teamPicked.map((onePlayer) => {
        return (
          <div>
            <span>{onePlayer.summonerName}</span>
            <img
              src={champImg(onePlayer.championId)}
              className="matchdetails-champ-icon"
              alt="champion icon"
            />
          </div>
        );
      })}
    </div>
  );
}
