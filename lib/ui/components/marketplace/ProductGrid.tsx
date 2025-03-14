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
  useScrollView?: boolean
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onWishlistToggle,
  wishlistedProducts = [],
  numColumns = 2,
  onEndReached,
  onProductPress,
  useScrollView = false,
}) => {
  const { width } = useWindowDimensions()
  const columnWidth = (width - 32) / numColumns // 32 = padding (16) * 2

  // Render product item
  const renderProductItem = (item: Product, index: number) => (
    <View 
      key={item.id}
      style={[
        styles.column, 
        { width: columnWidth },
        // If using grid layout, add appropriate margins
        useScrollView && {
          marginLeft: index % numColumns === 0 ? 0 : 8,
          marginRight: index % numColumns === numColumns - 1 ? 0 : 8,
        }
      ]}
    >
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
  )

  // If useScrollView is true, render a grid layout without FlatList
  if (useScrollView) {
    // Create rows of products
    const rows = [];
    for (let i = 0; i < products.length; i += numColumns) {
      const rowItems = products.slice(i, i + numColumns);
      rows.push(
        <View key={`row-${i}`} style={{ flexDirection: 'row', marginBottom: 8 }}>
          {rowItems.map((item, index) => renderProductItem(item, i + index))}
        </View>
      );
    }

    return <View style={styles.container}>{rows}</View>;
  }

  // Otherwise use FlatList (for standalone usage)
  return (
    <FlatList
      data={products}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      renderItem={({ item, index }) => renderProductItem(item, index)}
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
