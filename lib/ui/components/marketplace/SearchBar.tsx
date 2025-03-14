import React, { useState } from 'react'
import { StyleSheet, View, Keyboard, Animated, Easing } from 'react-native'
import { Searchbar as PaperSearchbar, useTheme, IconButton, Surface } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface SearchBarProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  onSubmit?: () => void
  onFilterPress?: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search Canadian products...',
  onSubmit,
  onFilterPress,
}) => {
  const theme = useTheme()
  const [isFocused, setIsFocused] = useState(false)
  const animatedElevation = React.useRef(new Animated.Value(2)).current
  
  const handleFocus = () => {
    setIsFocused(true)
    Animated.timing(animatedElevation, {
      toValue: 4,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start()
  }
  
  const handleBlur = () => {
    setIsFocused(false)
    Animated.timing(animatedElevation, {
      toValue: 2,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start()
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Animated.View style={[
          styles.searchBarContainer,
          { 
            elevation: animatedElevation,
            shadowOpacity: animatedElevation.interpolate({
              inputRange: [2, 4],
              outputRange: [0.1, 0.2],
            }),
          }
        ]}>
          <PaperSearchbar
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSubmitEditing={() => {
              Keyboard.dismiss();
              onSubmit && onSubmit();
            }}
            style={[
              styles.searchBar,
              {
                backgroundColor: isFocused 
                  ? theme.colors.surface 
                  : theme.colors.surfaceVariant,
              },
            ]}
            inputStyle={styles.input}
            elevation={0}
            icon={({ size, color }) => (
              <MaterialCommunityIcons 
                name="magnify" 
                size={size} 
                color={isFocused ? theme.colors.primary : color} 
              />
            )}
            iconColor={theme.colors.onSurfaceVariant}
            clearIcon="close-circle"
            clearButtonMode="while-editing"
            theme={{ roundness: 16 }}
          />
        </Animated.View>
        
        {onFilterPress && (
          <Surface style={[styles.filterButtonContainer, { elevation: 3 }]}>
            <IconButton
              icon="filter-variant"
              mode="contained"
              size={24}
              onPress={onFilterPress}
              style={styles.filterButton}
              containerColor={theme.colors.primary}
              iconColor={theme.colors.onPrimary}
            />
          </Surface>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  searchBar: {
    borderRadius: 16,
    height: 52,
  },
  input: {
    fontSize: 16,
  },
  filterButtonContainer: {
    marginLeft: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  filterButton: {
    margin: 0,
    borderRadius: 16,
  },
})

export default SearchBar
