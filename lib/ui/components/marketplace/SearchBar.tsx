import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Searchbar as PaperSearchbar, useTheme } from 'react-native-paper'

interface SearchBarProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  onSubmit?: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search products...',
  onSubmit,
}) => {
  const theme = useTheme()

  return (
    <View style={styles.container}>
      <PaperSearchbar
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        onSubmitEditing={onSubmit}
        style={[
          styles.searchBar,
          {
            backgroundColor: theme.colors.surfaceVariant,
          },
        ]}
        inputStyle={styles.input}
        elevation={0}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchBar: {
    borderRadius: 8,
  },
  input: {
    fontSize: 16,
  },
})

export default SearchBar
