import React from 'react'
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native'

import ProductCard from './ProductCard'

interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  canadianScore: number
}

interface ProductGridProps {
  products: Product[]
  onWishlistToggle?: (productId: string) => void
  wishlistedProducts?: string[]
  numColumns?: number
  onEndReached?: () => void
  onProductPress?: (productId: string) => void
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onWishlistToggle,
  wishlistedProducts = [],
  numColumns = 2,
  onEndReached,
  onProductPress,
}) => {
  const { width } = useWindowDimensions()
  const columnWidth = (width - 32) / numColumns // 32 = padding (16) * 2

  return (
    <FlatList
      data={products}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <View style={[styles.column, { width: columnWidth }]}>
          <ProductCard
            id={item.id}
            name={item.name}
            price={item.price}
            imageUrl={item.imageUrl}
            canadianScore={item.canadianScore}
            onWishlist={wishlistedProducts.includes(item.id)}
            onWishlistToggle={
              onWishlistToggle ? () => onWishlistToggle(item.id) : undefined
            }
            onPress={onProductPress}
          />
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  column: {
    flex: 1,
  },
})

export default ProductGrid
