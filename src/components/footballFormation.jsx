import React from "react";
import PropTypes from "prop-types";
import SoccerPitch from "./pitchView";
import PlayerView from "./playerView";

const FootballGroundFormation = ({ Team }) => {
  return <SoccerPitch size={"responsive"} color={"#3AA94C"} homeTeam={Team} />;
};

export default FootballGroundFormation;

FootballGroundFormation.propTypes = {
  Team: PropTypes.shape({
    squad: PropTypes.shape({
      gk: PlayerView.playerShape,
      df: PropTypes.arrayOf(PlayerView.playerShape),
      cdm: PropTypes.arrayOf(PlayerView.playerShape),
      cm: PropTypes.arrayOf(PlayerView.playerShape),
      cam: PropTypes.arrayOf(PlayerView.playerShape),
      fw: PropTypes.arrayOf(PlayerView.playerShape),
    }).isRequired,
  }),
};
