import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'

import { GradientBackground } from '@/lib'
import { ProductGrid, SearchBar } from '@/lib/ui/components/marketplace'

// Mock search results
const mockSearchResults = [
  {
    id: '1',
    name: 'Maple Syrup',
    price: 19.99,
    imageUrl: 'https://placekitten.com/200/200',
    canadianScore: 95,
  },
  {
    id: '2',
    name: 'Winter Jacket',
    price: 199.99,
    imageUrl: 'https://placekitten.com/200/200',
    canadianScore: 90,
  },
]

const MarketplaceSearchScreen = () => {
  const { query } = useLocalSearchParams<{ query: string }>()
  const [searchQuery, setSearchQuery] = useState(query || '')
  const router = useRouter()

  useEffect(() => {
    if (query) {
      setSearchQuery(query)
    }
  }, [query])

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      // Update URL with new search query
      router.setParams({ query: searchQuery })
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground height="full" />
      <View style={{ padding: 16 }}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search products..."
          onSubmit={handleSearchSubmit}
        />
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text variant="titleMedium" style={{ marginBottom: 16 }}>
          {searchQuery
            ? `Search results for "${searchQuery}"`
            : 'Start searching for products'}
        </Text>
        {searchQuery && <ProductGrid products={mockSearchResults} />}
      </ScrollView>
    </View>
  )
}

export default MarketplaceSearchScreen
