import moment from "moment";

export function gameCreatedAt(date) {
  let x = date.toString().slice(0, -3);
  let y = parseInt(x);
  let z = moment.unix(y).format("YYYYMMDD HH:mm:ss");
  return moment(z, "YYYYMMDD HH:mm:ss").fromNow();
}

export function getGameDuration(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;

  if (time < 241) {
    return minutes + ":" + seconds + " Remake";
  } else {
    return minutes + ":" + seconds;
  }
}
