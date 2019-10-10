const COLORS = {
    blackish: "#1a1a1a",
    lessBlackish: "#262626",
    white: "#fff",
    whitesmoke: "whitesmoke",
    blueIThink: "#006fe6",
    sortaBlack: "#4f4f4f",
}

export const LIGHT_MODE = {
    primary: COLORS.white,
    secondary: COLORS.whitesmoke,
    accent: COLORS.blueIThink, 
    textPrimary: 'black',
    textSecondary: 'gray',
    airportMarker: {
        outside: 'lightblue',
        inside: 'darkblue'
    },
    controllerBadgeColors: {
        delivery: '#29ABE2',
        ground: '#0071BC',
        tower: '#2E3192',
        approach: '#1B1464',
    }
    
}

export const DARK_MODE = {
    primary: COLORS.blackish,
    secondary: COLORS.lessBlackish,
    accent: COLORS.sortaBlack,
    textPrimary: 'white',
    textSecondary: 'gray',
    airportMarker: {
        outside: '#FF0000',
        inside: '#8B0000'
    },
    controllerBadgeColors: {
        delivery: '#F08080',
        ground: '#DC143C',
        tower: '#FF0000',
        approach: '#800000',
    }
}

export default COLORS;