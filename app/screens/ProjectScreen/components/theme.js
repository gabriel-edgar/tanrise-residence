import {useSelector} from 'react-redux';
// import {useDarkMode} from 'react-native-dark-mode';

/**
 * Define Const color use for whole application
 */
export const BaseColor = {
  grayColor: '#9B9B9B',
  dividerColor: '#BDBDBD',
  whiteColor: '#FFFFFF',
  fieldColor: '#F5F5F5',
  yellowColor: '#FDC60A',
  navyBlue: '#3C5A99',
  kashmir: '#5D6D7E',
  orangeColor: '#ff9500',
  blueColor: '#5DADE2',
  pinkColor: '#A569BD',
  greenColor: '#58D68D',
  pinkLightColor: '#FF5E80',
  pinkDarkColor: '#F90030',
  accentColor: '#4A90A4',
  redColor: 'red',
  blackColor: '#000000',
  goldColor: '#CDB04A',
  primaryColor: '#0D7C5D',
  textColor: '#212121',

  //primary gold color
  corn10: '#EAE6DC',
  corn30: '#CCC0A7',
  corn50: '#98804E',
  corn70: '#4C4027',
  corn90: '#1E1A10',

  //neutral color grey
  grey10: '#FDFDFC',
  grey30: '#CFCFCF',
  grey50: '#878787',
  grey70: '#363636',
  grey90: '#0E0E0E',

  //state color
  blueStateColor: '#0E0E0E',
  greenStateColor: '#27AE60',
  yellowStateColor: '#E2B93B',
  redStateColor: '#EB5757',
};

/**
 * Define Const list theme use for whole application
 */
export const ThemeSupport = [
  {
    theme: 'orange',
    light: {
      dark: false,
      colors: {
        primary: '#E5634D',
        primaryDark: '#C31C0D',
        primaryLight: '#FF8A65',
        accent: '#4A90A4',
        background: 'white',
        card: '#F5F5F5',
        text: '#212121',
        border: '#c7c7cc',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#E5634D',
        primaryDark: '#C31C0D',
        primaryLight: '#FF8A65',
        accent: '#4A90A4',
        background: '#010101',
        card: '#121212',
        text: '#e5e5e7',
        border: '#272729',
      },
    },
  },
  {
    theme: 'pink',
    light: {
      dark: false,
      colors: {
        primary: '#FF2D55',
        primaryDark: '#F90030',
        primaryLight: '#FF5E80',
        accent: '#4A90A4',
        background: 'white',
        card: '#F5F5F5',
        text: '#212121',
        border: '#c7c7cc',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#FF2D55',
        primaryDark: '#F90030',
        primaryLight: '#FF5E80',
        accent: '#4A90A4',
        background: '#010101',
        card: '#121212',
        text: '#e5e5e7',
        border: '#272729',
      },
    },
  },
  {
    theme: 'blue',
    light: {
      dark: false,
      colors: {
        primary: '#5DADE2',
        primaryDark: '#1281ac',
        primaryLight: '#68c9ef',
        accent: '#FF8A65',
        background: 'white',
        card: '#F5F5F5',
        text: '#212121',
        border: '#c7c7cc',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#5DADE2',
        primaryDark: '#1281ac',
        primaryLight: '#68c9ef',
        accent: '#FF8A65',
        background: '#010101',
        card: '#121212',
        text: '#e5e5e7',
        border: '#272729',
      },
    },
  },
  {
    theme: 'green',
    light: {
      dark: false,
      colors: {
        // primary: '#068444',
        primary: '#315447',
        primaryDark: '#388E3C',
        primaryLight: '#C8E6C9',
        accent: '#607D8B',
        background: 'white',
        card: '#F5F5F5',
        text: '#212121',
        border: '#c7c7cc',
      },
    },
    dark: {
      dark: true,
      colors: {
        // primary: '#068444',
        primary: '#315447',
        primaryDark: '#388E3C',
        primaryLight: '#C8E6C9',
        accent: '#607D8B',
        background: '#010101',
        card: '#121212',
        text: '#e5e5e7',
        border: '#272729',
      },
    },
  },
  {
    theme: 'yellow',
    light: {
      dark: false,
      colors: {
        primary: '#FDC60A',
        primaryDark: '#FFA000',
        primaryLight: '#FFECB3',
        accent: '#795548',
        background: 'white',
        card: '#F5F5F5',
        text: '#212121',
        border: '#c7c7cc',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#FDC60A',
        primaryDark: '#FFA000',
        primaryLight: '#FFECB3',
        accent: '#795548',
        background: '#010101',
        card: '#121212',
        text: '#e5e5e7',
        border: '#272729',
      },
    },
  },
];

/**
 * Define default theme use for whole application
 */
export const DefaultTheme = {
  theme: 'green',
  light: {
    dark: false,
    colors: {
      primary: '#0D7C5D',
      accent: '#074735',
      background: '#F3F3F3',
      card: '#ffffff',
      text: '#0E0E0E',
      border: '#CFCFCF',

      softBlue: '#A9C2E9',
      yaleBlue: '#5484D3',
      navyBlue: '#1C3A6B',
      navyOldBlue: '#112544',
      //      primary: string;
      // background: string;
      // card: string;
      // text: string;
      // border: string;
      // notification: string;
      // softBlue: string;
    },
  },
  dark: {
    dark: true,
    colors: {
      // primary: '#068444',
      primary: '#074735',
      accent: '#607D8B',
      background: 'white',
      card: '#F5F5F5',
      text: '#212121',
      border: '#c7c7cc',
    },
  },
  // theme: 'green',
  // light: {
  //   dark: false,
  //   colors: {
  //     // primary: '#068444',
  //     primary: '#007638',
  //     primaryDark: '#013018',
  //     primaryLight: '#02ba59',
  //     accent: '#607D8B',
  //     background: '#f2f2f2',
  //     card: '#ffffff',
  //     text: '#1c1c1e',
  //     border: '#d8d8d8',
  //   },
  // },
  // dark: {
  //   dark: true,
  //   colors: {
  //     // primary: '#068444',
  //     primary: '#315447',
  //     primaryDark: '#388E3C',
  //     primaryLight: '#C8E6C9',
  //     accent: '#607D8B',
  //     background: 'white',
  //     card: '#F5F5F5',
  //     text: '#212121',
  //     border: '#c7c7cc',
  //   },
  // },
};

/**
 * Define list font use for whole application
 */
export const FontSupport = [
  // 'ProximaNova',
  // 'Raleway',
  // 'Roboto',
  // 'Merriweather',
  // 'DMSerifDisplay',
  // 'KaiseiHarunoUmi',
];

/**
 * Define font default use for whole application
 */
export const DefaultFont = 'Lato';

/**
 * export theme and colors for application
 * @returns theme,colors
 */
// export const useTheme = () => {
//   const isDarkMode = useDarkMode();
//   const forceDark = useSelector(state => state.application.force_dark);
//   console.log('forcedark?', forceDark);
//   const themeStorage = useSelector(state => state.application.theme);
//   console.log('theme storeage?', state.application);
//   const listTheme = ThemeSupport.filter(item => item.theme == themeStorage);
//   const theme = listTheme.length > 0 ? listTheme[0] : DefaultTheme;
//   if (forceDark) {
//     return {theme: theme.dark, colors: theme.dark.colors};
//   }
//   if (forceDark == false) {
//     return {theme: theme.light, colors: theme.light.colors};
//   }
//   return isDarkMode
//     ? {theme: theme.dark, colors: theme.dark.colors}
//     : {theme: theme.light, colors: theme.light.colors};
// };

/**
 * export font for application
 * @returns font
 */
export const useFont = () => {
  const font = useSelector(state => state.application.font);
  // console.log('font apasi', font);
  return font ?? DefaultFont;
};
