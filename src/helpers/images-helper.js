import React from "react";
// import Cookies from "js-cookie";
import summSpells from "../data/summoner-spells.json";

// const version = Cookies.get("version");
const version = "10.8.1";

export function rankImgProvider(rankedTier) {
  switch (rankedTier) {
    case "IRONIV":
      return "/images/ranked-emblems/Iron_4.png";
    case "IRONIII":
      return "/images/ranked-emblems/Iron_3.png";
    case "IRONII":
      return "/images/ranked-emblems/Iron_2.png";
    case "IRONI":
      return "/images/ranked-emblems/Iron_1.png";
    case "BRONZEIV":
      return "/images/ranked-emblems/Bronze_4.png";
    case "BRONZEIII":
      return "/images/ranked-emblems/Bronze_3.png";
    case "BRONZEII":
      return "/images/ranked-emblems/Bronze_2.png";
    case "BRONZEI":
      return "/images/ranked-emblems/Bronze_1.png";
    case "SILVERIV":
      return "/images/ranked-emblems/Silver_4.png";
    case "SILVERIII":
      return "/images/ranked-emblems/Silver_3.png";
    case "SILVERII":
      return "/images/ranked-emblems/Silver_2.png";
    case "SILVERI":
      return "/images/ranked-emblems/Silver_1.png";
    case "GOLDIV":
      return "/images/ranked-emblems/Gold_4.png";
    case "GOLDIII":
      return "/images/ranked-emblems/Gold_3.png";
    case "GOLDII":
      return "/images/ranked-emblems/Gold_2.png";
    case "GOLDI":
      return "/images/ranked-emblems/Gold_1.png";
    case "PLATINUMIV":
      return "/images/ranked-emblems/Platinum_4.png";
    case "PLATINUMIII":
      return "/images/ranked-emblems/Platinum_3.png";
    case "PLATINUMII":
      return "/images/ranked-emblems/Platinum_2.png";
    case "PLATINUMI":
      return "/images/ranked-emblems/Platinum_1.png";
    case "DIAMONDIV":
      return "/images/ranked-emblems/Diamond_4.png";
    case "DIAMONDIII":
      return "/images/ranked-emblems/Diamond_3.png";
    case "DIAMONDII":
      return "/images/ranked-emblems/Diamond_2.png";
    case "DIAMONDI":
      return "/images/ranked-emblems/Diamond_1.png";
    case "MASTERI":
      return "/images/ranked-emblems/Master.png";
    case "GRANDMASTERI":
      return "/images/ranked-emblems/Grandmaster.png";
    case "CHALLENGERI":
      return "/images/ranked-emblems/Challenger.png";
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
      return (address =
        `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/` +
        oneSpell.image.full);
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

export function getFrameStyle(key) {
  let frameStyle;
  return (frameStyle = {
    width: "100%",
    height: "300px",
    color: "white",
    backgroundImage: `url(https://cdn.communitydragon.org/${version}/champion/${key}/splash-art/centered)`,
    backgroundPositionY: "-100px",
  });
}
