import React from "react";

export function getLeagueLocation(id) {
  switch (id) {
    case 4198:
      return <span> (USA)</span>;
    case 4197:
      return <span> (Europe)</span>;
    case 294:
      return <span> (China)</span>;
    case 293:
      return <span> (Korea)</span>;
    default:
      return <span></span>;
  }
}
