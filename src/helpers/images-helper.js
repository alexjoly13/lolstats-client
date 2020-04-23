import React from "react";
import Cookies from "js-cookie";
import summSpells from "../data/summoner-spells.json";

const version = Cookies.get("version");

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

export function champImg(key) {
  return `https://cdn.communitydragon.org/${version}/champion/${key}/square`;
}

export function champIconProvider(championName) {
  return `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}`;
}

export function profileIconProvider(iconId) {
  return `/images/profile-icons/${iconId}.png`;
}

export function summonerSpellShower(pickedSpell) {
  const spells = Object.values(summSpells[0].data);
  let address;
  spells.map((oneSpell) => {
    if (parseInt(oneSpell.key) === pickedSpell) {
      address =
        `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/` +
        oneSpell.image.full;
    }
  });
  return address;
}

export function itemImgGetter(itemId) {
  if (itemId > 0) {
    return (
      <img
        className="item-details-icon"
        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`}
        alt="item-mini"
      />
    );
  } else {
    return <div className="empty-item-block"></div>;
  }
}

// CHAMPION DETAILS

export function getFrameStyle(key) {
  let frameStyle;
  return (frameStyle = {
    width: "75%",
    height: "300px",
    color: "white",
    backgroundImage: `url(https://cdn.communitydragon.org/${version}/champion/${key}/splash-art/centered)`,
    backgroundPositionY: "-100px",
  });
}
