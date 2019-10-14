import React from "react";

export const ControllerBadges = props => {
  let { controllers, zoom, themeColors, code } = props;
  controllers.sort();

  controllers = [...new Set(controllers)] ;

  const maxFontSize = 1.2;
  const minFontSize = 1;

  const fontSize = zoom / 5 > maxFontSize ? maxFontSize : zoom / 5 < minFontSize ? minFontSize : zoom / 5;
  
  
  const firstStyle = {
    fontSize: fontSize+'em',
    width: '2em',
    textAlign: "center",
    color: "white",
    borderRadius: ".5em",
    display: "inline",
    paddingLeft: ".5em",
    paddingRight: ".5em",
    position: "relative",
  };

  const otherStyle = {
    ...firstStyle,
    marginLeft: "-.5em",
    paddingLeft: '.75em',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  }


  
  return (
    <div>
      <div style={{ ...firstStyle, backgroundColor: themeColors.primary, color: themeColors.textPrimary, fontWeight: 'normal' }}>{code.icao}</div>
      {
        controllers.map((type, index) => {
          const badgeDetails = getBadgeDetails(type, themeColors.controllerBadgeColors);
          return (<div style={{ ...otherStyle, backgroundColor: badgeDetails.color, zIndex: (index+1) * -1 }}>{badgeDetails.letter}</div>);
        })
      }
    </div>
  );
};

export const CONTROLLER_TYPE = {
  DELIVERY: 1,
  GROUND: 2,
  TOWER: 3,
  APPROACH: 4,
  ATIS: 5,
}

const getBadgeDetails = (type, badgeColours) => {
  switch (type) {
    case CONTROLLER_TYPE.DELIVERY:
      return {letter: 'D', color: badgeColours.delivery};

    case CONTROLLER_TYPE.GROUND:
      return {letter: 'G', color: badgeColours.ground};

    case CONTROLLER_TYPE.TOWER:
      return {letter: 'T', color: badgeColours.tower};

    case CONTROLLER_TYPE.APPROACH:
      return {letter: 'A', color: badgeColours.approach};
    default:
      return {letter: 'N/A', color: 'black'};
  }
}

