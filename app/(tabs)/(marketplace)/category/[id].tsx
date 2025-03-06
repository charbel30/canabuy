import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'

import { GradientBackground } from '@/lib'
import { ProductGrid } from '@/lib/ui/components/marketplace'

// Mock categories data (in real app, this would come from a store/API)
const mockCategories = {
  '1': { name: 'Electronics', icon: 'laptop' },
  '2': { name: 'Food & Beverage', icon: 'food' },
  '3': { name: 'Clothing', icon: 'tshirt-crew' },
  '4': { name: 'Home & Garden', icon: 'home' },
}

// Mock products by category
const mockCategoryProducts = {
  '1': [
    {
      id: '101',
      name: 'Smart Speaker',
      price: 79.99,
      imageUrl: 'https://placekitten.com/200/200',
      canadianScore: 85,
    },
    {
      id: '102',
      name: 'Wireless Earbuds',
      price: 129.99,
      imageUrl: 'https://placekitten.com/200/200',
      canadianScore: 88,
    },
  ],
  '2': [
    {
      id: '201',
      name: 'Maple Syrup',
      price: 19.99,
      imageUrl: 'https://placekitten.com/200/200',
      canadianScore: 95,
    },
    {
      id: '202',
      name: 'Ice Wine',
      price: 49.99,
      imageUrl: 'https://placekitten.com/200/200',
      canadianScore: 92,
    },
  ],
  '3': [
    {
      id: '301',
      name: 'Winter Jacket',
      price: 199.99,
      imageUrl: 'https://placekitten.com/200/200',
      canadianScore: 90,
    },
    {
      id: '302',
      name: 'Wool Toque',
      price: 24.99,
      imageUrl: 'https://placekitten.com/200/200',
      canadianScore: 94,
    },
  ],
  '4': [
    {
      id: '401',
      name: 'Cedar Planter',
      price: 59.99,
      imageUrl: 'https://placekitten.com/200/200',
      canadianScore: 89,
    },
    {
      id: '402',
      name: 'Garden Tools Set',
      price: 89.99,
      imageUrl: 'https://placekitten.com/200/200',
      canadianScore: 87,
    },
  ],
}

const CategoryScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const category = mockCategories[id as keyof typeof mockCategories]
  const products = mockCategoryProducts[id as keyof typeof mockCategoryProducts]

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground height="full" />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <IconButton
          icon="arrow-left"
          onPress={() => router.back()}
          style={{ marginRight: 8 }}
        />
        <Text variant="headlineMedium">{category?.name}</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {products ? (
          <ProductGrid products={products} />
        ) : (
          <Text variant="bodyLarge">No products found in this category</Text>
        )}
      </ScrollView>
    </View>
  )
}

export default CategoryScreen
