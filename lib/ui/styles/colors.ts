/**
 * Custom colors for using with themes
 * Inspired by Canadian nature and landscapes
 */

import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'

// Modern Canadian-inspired color palette
// Maple red, forest green, lake blue, and neutral tones
const CanaBuyColors = {
  // Primary colors
  mapleRed: {
    light: 'rgb(198, 40, 40)',
    dark: 'rgb(255, 158, 158)',
  },
  forestGreen: {
    light: 'rgb(46, 125, 50)',
    dark: 'rgb(131, 207, 135)',
  },
  lakeBlue: {
    light: 'rgb(30, 136, 229)',
    dark: 'rgb(144, 202, 249)',
  },
  // Neutral tones
  stone: {
    light: 'rgb(245, 245, 240)',
    dark: 'rgb(30, 30, 30)',
  },
  bark: {
    light: 'rgb(121, 85, 72)',
    dark: 'rgb(188, 170, 164)',
  },
}

const Colors = {
  light: {
    default: {
      // Modern Material Design 3 inspired theme with Canadian flair
      primary: CanaBuyColors.mapleRed.light,
      onPrimary: 'rgb(255, 255, 255)',
      primaryContainer: 'rgb(255, 218, 218)',
      onPrimaryContainer: 'rgb(65, 0, 0)',
      
      secondary: CanaBuyColors.forestGreen.light,
      onSecondary: 'rgb(255, 255, 255)',
      secondaryContainer: 'rgb(220, 237, 220)',
      onSecondaryContainer: 'rgb(0, 42, 0)',
      
      tertiary: CanaBuyColors.lakeBlue.light,
      onTertiary: 'rgb(255, 255, 255)',
      tertiaryContainer: 'rgb(220, 242, 255)',
      onTertiaryContainer: 'rgb(0, 55, 95)',
      
      error: 'rgb(186, 26, 26)',
      onError: 'rgb(255, 255, 255)',
      errorContainer: 'rgb(255, 218, 214)',
      onErrorContainer: 'rgb(65, 0, 2)',
      
      background: CanaBuyColors.stone.light,
      onBackground: 'rgb(28, 27, 31)',
      
      surface: 'rgb(255, 251, 255)',
      onSurface: 'rgb(28, 27, 31)',
      surfaceVariant: 'rgb(243, 237, 237)',
      onSurfaceVariant: 'rgb(73, 69, 79)',
      
      outline: 'rgb(121, 116, 126)',
      outlineVariant: 'rgb(204, 196, 206)',
      
      shadow: 'rgb(0, 0, 0)',
      scrim: 'rgb(0, 0, 0)',
      inverseSurface: 'rgb(49, 48, 51)',
      inverseOnSurface: 'rgb(244, 239, 244)',
      inversePrimary: 'rgb(255, 179, 179)',
      
      elevation: {
        level0: 'transparent',
        level1: 'rgb(248, 246, 251)',
        level2: 'rgb(244, 241, 248)',
        level3: 'rgb(240, 238, 246)',
        level4: 'rgb(239, 236, 245)',
        level5: 'rgb(236, 233, 243)',
      },
      
      surfaceDisabled: 'rgba(28, 27, 31, 0.12)',
      onSurfaceDisabled: 'rgba(28, 27, 31, 0.38)',
      backdrop: 'rgba(50, 47, 55, 0.4)',
    },
  },
  
  dark: {
    default: {
      // Modern Material Design 3 inspired dark theme with Canadian flair
      primary: CanaBuyColors.mapleRed.dark,
      onPrimary: 'rgb(68, 0, 0)',
      primaryContainer: 'rgb(147, 0, 0)',
      onPrimaryContainer: 'rgb(255, 218, 218)',
      
      secondary: CanaBuyColors.forestGreen.dark,
      onSecondary: 'rgb(0, 42, 0)',
      secondaryContainer: 'rgb(0, 85, 0)',
      onSecondaryContainer: 'rgb(220, 237, 220)',
      
      tertiary: CanaBuyColors.lakeBlue.dark,
      onTertiary: 'rgb(0, 55, 95)',
      tertiaryContainer: 'rgb(0, 80, 130)',
      onTertiaryContainer: 'rgb(220, 242, 255)',
      
      error: 'rgb(255, 180, 171)',
      onError: 'rgb(105, 0, 5)',
      errorContainer: 'rgb(147, 0, 10)',
      onErrorContainer: 'rgb(255, 180, 171)',
      
      background: CanaBuyColors.stone.dark,
      onBackground: 'rgb(230, 225, 229)',
      
      surface: 'rgb(28, 27, 31)',
      onSurface: 'rgb(230, 225, 229)',
      surfaceVariant: 'rgb(73, 69, 79)',
      onSurfaceVariant: 'rgb(204, 196, 206)',
      
      outline: 'rgb(150, 142, 152)',
      outlineVariant: 'rgb(73, 69, 79)',
      
      shadow: 'rgb(0, 0, 0)',
      scrim: 'rgb(0, 0, 0)',
      inverseSurface: 'rgb(230, 225, 229)',
      inverseOnSurface: 'rgb(49, 48, 51)',
      inversePrimary: 'rgb(198, 40, 40)',
      
      elevation: {
        level0: 'transparent',
        level1: 'rgb(35, 34, 39)',
        level2: 'rgb(40, 38, 45)',
        level3: 'rgb(44, 42, 50)',
        level4: 'rgb(46, 43, 52)',
        level5: 'rgb(49, 46, 55)',
      },
      
      surfaceDisabled: 'rgba(230, 225, 229, 0.12)',
      onSurfaceDisabled: 'rgba(230, 225, 229, 0.38)',
      backdrop: 'rgba(50, 47, 55, 0.4)',
    },
  },
}

export default Colors
