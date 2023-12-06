/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import PlayerView from "./playerView";
import { context } from "../App";

const TeamView = ({ team, away }) => {
  const DEFAULT_HOME_COLOR = "#2D2D2D";
  const DEFAULT_AWAY_COLOR = "lightblue";
  const DEFAULT_HOME_NUMBER_COLOR = "#ffffff";
  const DEFAULT_AWAY_NUMBER_COLOR = "#333333";
  const { selectedPlayer, setSelectedPlayer, setIsRenderable } =
    useContext(context);
  const buildPlayer = (player, away) => {
    return {
      ...player,
      color:
        selectedPlayer?.number === player?.number
          ? "#fea013"
          : getPlayerColor(player, away),
      numberColor: getPlayerNumberColor(player, away),
      nameColor: getPlayerNameColor(player, away),
      onClick: () => handlePlayerSelect(player),
    };
  };
  const getPlayerColor = (player, away) => player.color || getTeamColor(away);

  const getTeamColor = (away) => {
    const style = team.style;
    return (
      (style && style.color) || (away ? DEFAULT_AWAY_COLOR : DEFAULT_HOME_COLOR)
    );
  };

  const getPlayerNumberColor = (player, away) =>
    player.numberColor || getTeamNumberColor(away);

  const getTeamNumberColor = (away) => {
    const style = team.style;
    return (
      (style && style.numberColor) ||
      (away ? DEFAULT_AWAY_NUMBER_COLOR : DEFAULT_HOME_NUMBER_COLOR)
    );
  };

  const getPlayerNameColor = (player, away) =>
    player.nameColor || getTeamNameColor(away);

  const getTeamNameColor = (away) => {
    const style = team.style;
    return (
      (style && style.nameColor) ||
      (away ? DEFAULT_AWAY_NUMBER_COLOR : DEFAULT_HOME_NUMBER_COLOR)
    );
  };

  const handlePlayerSelect = (playerClicked) => {
    setSelectedPlayer(playerClicked);
    setIsRenderable(true);
  };



  const { gk, df, cdm, cm, cam, fw } = team.squad;

  useEffect(() => {
    setSelectedPlayer(buildPlayer(gk, away));
  }, [gk]);

  return (
    <div className={classnames("team", { away: away })}>
      {gk && (
        <div className="goalkeeper">
          <PlayerView player={buildPlayer(gk, away)} />
        </div>
      )}
      <div className="lines">
        {df && (
          <div className="line">
            {df.map((df, i) => (
              <PlayerView player={buildPlayer(df, away)} key={i} />
            ))}
          </div>
        )}
        {cdm && (
          <div className="line">
            {cdm.map((cdm, i) => (
              <PlayerView player={buildPlayer(cdm, away)} key={i} />
            ))}
          </div>
        )}
        {cm && (
          <div className="line">
            {cm.map((cm, i) => (
              <PlayerView player={buildPlayer(cm, away)} key={i} />
            ))}
          </div>
        )}
        {cam && (
          <div className="line">
            {cam.map((cam, i) => (
              <PlayerView player={buildPlayer(cam, away)} key={i} />
            ))}
          </div>
        )}
        {fw && (
          <div className="line">
            {fw.map((fw, i) => (
              <PlayerView player={buildPlayer(fw, away)} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

TeamView.propTypes = {
  team: PropTypes.shape({
    squad: PropTypes.shape({
      gk: PlayerView.playerShape,
      df: PropTypes.arrayOf(PlayerView.playerShape),
      cdm: PropTypes.arrayOf(PlayerView.playerShape),
      cm: PropTypes.arrayOf(PlayerView.playerShape),
      cam: PropTypes.arrayOf(PlayerView.playerShape),
      fw: PropTypes.arrayOf(PlayerView.playerShape),
    }).isRequired,
    style: PropTypes.shape({
      color: PropTypes.string.isRequired,
      numberColor: PropTypes.string.isRequired,
      nameColor: PropTypes.string,
    }),
  }),
  away: PropTypes.bool,
};

export default TeamView;
