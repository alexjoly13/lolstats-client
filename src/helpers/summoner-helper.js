export function rankImgProvider(rankedTier) {
  switch (rankedTier) {
    case "IRON":
      return "/images/ranked-emblems/Emblem_Iron.png";
    case "BRONZE":
      return "/images/ranked-emblems/Emblem_Bronze.png";
    case "SILVER":
      return "/images/ranked-emblems/Emblem_Silver.png";
    case "GOLD":
      return "/images/ranked-emblems/Emblem_Gold.png";
    case "PLATINUM":
      return "/images/ranked-emblems/Emblem_Platinum.png";
    case "DIAMOND":
      return "/images/ranked-emblems/Emblem_Diamond.png";
    case "MASTER":
      return "/images/ranked-emblems/Emblem_Master.png";
    case "GRANDMASTER":
      return "/images/ranked-emblems/Emblem_Grandmaster.png";
    case "CHALLENGER":
      return "/images/ranked-emblems/Emblem_Challenger.png";
    default:
      console.log("Sorry something went wrong");
  }
}

export function champIconProvider(championName) {
  return `/images/champion-icons/${championName}`;
}

export function profileIconProvider(iconId) {
  return `/images/profile-icons/${iconId}.png`;
}
