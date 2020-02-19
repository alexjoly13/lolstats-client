import axios from "axios";

const backendApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true
});

function errorHandler(err) {
  if (err.response && err.response.data) {
    console.log("API Error", err.response.data);
  } else {
    console.log("React Code Error", err);
  }

  alert("Sorry! Something went wrong. Try again later");

  throw err;
}

export function postSummonerName(SummonerName) {
  return backendApi.post("/summoner", SummonerName).catch(errorHandler);
}

export function getChampionsList(championList) {
  return backendApi.get("/champions", championList).catch(errorHandler);
}
