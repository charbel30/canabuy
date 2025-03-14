import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Divider, IconButton, Text, useTheme } from 'react-native-paper'

import { GradientBackground } from '@/lib'
import { ProductGrid, SearchBar } from '@/lib/ui/components/marketplace'

// Enhanced mock search results with local images
const mockSearchResults = [
  {
    id: '1',
    name: 'Pure Canadian Maple Syrup',
    price: 19.99,
    imageUrl: require('@/assets/images/products/clothing/winter-jacket.jpg'),
    canadianScore: 95,
  },
  {
    id: '2',
    name: 'Winter Down Jacket',
    price: 199.99,
    imageUrl: require('@/assets/images/products/clothing/winter-jacket.jpg'),
    canadianScore: 90,
  },
  {
    id: '3',
    name: 'Smart Speaker',
    price: 79.99,
    imageUrl: require('@/assets/images/products/electronics/smart-speaker.jpg'),
    canadianScore: 85,
  },
  {
    id: '4',
    name: 'Wireless Earbuds',
    price: 129.99,
    imageUrl: require('@/assets/images/products/electronics/wireless-earbuds.jpg'),
    canadianScore: 82,
  },
]

const MarketplaceSearchScreen = () => {
  const { query } = useLocalSearchParams<{ query: string }>()
  const [searchQuery, setSearchQuery] = useState(query || '')
  const [wishlistedProducts, setWishlistedProducts] = useState<string[]>([])
  const router = useRouter()
  const theme = useTheme()

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

  const handleWishlistToggle = (productId: string) => {
    setWishlistedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <View style={styles.container}>
      <GradientBackground height="full" />
      
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search Canadian products..."
          onSubmit={handleSearchSubmit}
        />
      </View>
      
      <Divider style={styles.divider} />
      
      {/* Search Results */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text variant="titleMedium" style={styles.resultsTitle}>
          {searchQuery
            ? `Results for "${searchQuery}"`
            : 'Start searching for products'}
        </Text>
        
        {searchQuery && (
          <ProductGrid 
            products={mockSearchResults} 
            wishlistedProducts={wishlistedProducts}
            onWishlistToggle={handleWishlistToggle}
          />
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  backButton: {
    margin: 0,
  },
  headerTitle: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  divider: {
    marginHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  resultsTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
})

export default MarketplaceSearchScreen
