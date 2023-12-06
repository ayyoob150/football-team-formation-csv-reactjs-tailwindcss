import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const PlayerView = ({ player }) => {
  return (
    <div className="player-view">
      <div
        className={classnames('player', { 'clickable': player.onClick })}
        style={{ backgroundColor: player.color }}
        onClick={player.onClick}
      >
        <div className="number" style={{ color: player.numberColor }}>
          {player.number}
        </div>
        <div className="name" style={{ color: player.nameColor }}>
          {player.name}
        </div>
      </div>
    </div>
  );
};

PlayerView.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.number,
    color: PropTypes.string,
    numberColor: PropTypes.string,
    nameColor: PropTypes.string,
    onClick: PropTypes.func,
  }),
};

export default PlayerView;
