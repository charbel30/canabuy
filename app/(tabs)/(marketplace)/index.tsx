import { router } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'

import { GradientBackground } from '@/lib'
import {
  CategoryList,
  ProductGrid,
  SearchBar,
} from '@/lib/ui/components/marketplace'

// Mock data for demonstration
const mockCategories = [
  { id: '1', name: 'Electronics', icon: 'laptop', productCount: 150 },
  { id: '2', name: 'Food & Beverage', icon: 'food', productCount: 200 },
  { id: '3', name: 'Clothing', icon: 'tshirt-crew', productCount: 180 },
  { id: '4', name: 'Home & Garden', icon: 'home', productCount: 120 },
]

const mockProducts = [
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

const MarketplaceScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '/search',
        params: { query: searchQuery },
      })
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground height="full" />
      <ScrollView>
        <View style={{ padding: 16 }}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search Canadian products..."
            onSubmit={handleSearchSubmit}
          />

          <Text variant="titleMedium" style={{ marginVertical: 16 }}>
            Browse Categories
          </Text>
          <CategoryList categories={mockCategories} />

          <Text variant="titleMedium" style={{ marginVertical: 16 }}>
            Featured Products
          </Text>
          <ProductGrid products={mockProducts} />
        </View>
      </ScrollView>
    </View>
  )
}

export default MarketplaceScreen
