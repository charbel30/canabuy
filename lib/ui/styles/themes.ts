/**
 * CanaBuy Themes
 * Modern Material Design 3 themes with Canadian-inspired colors
 */

import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper'

import Colors from '@/lib/ui/styles/colors'

// Configure fonts with Noto Sans as the base font
const fonts = configureFonts({
  config: {
    fontFamily: 'NotoSans_400Regular',
  }
})

// Base themes with custom fonts
const BaseLightTheme = {
  ...MD3LightTheme,
  fonts,
}

const BaseDarkTheme = {
  ...MD3DarkTheme,
  fonts,
}

// Create the CanaBuy themes with our custom colors
const Themes = {
  light: {
    default: {
      ...BaseLightTheme,
      colors: {
        ...BaseLightTheme.colors,
        ...Colors.light.default,
      },
      // Add custom theme properties
      roundness: 12,
      animation: {
        scale: 1.0,
      },
    },
  },
  dark: {
    default: {
      ...BaseDarkTheme,
      colors: {
        ...BaseDarkTheme.colors,
        ...Colors.dark.default,
      },
      // Add custom theme properties
      roundness: 12,
      animation: {
        scale: 1.0,
      },
    },
  },
}

export default Themes
