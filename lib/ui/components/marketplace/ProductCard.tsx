import { router } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Card, IconButton, Text, useTheme } from 'react-native-paper'

import { CanadianBadge } from '@/lib/ui/components/marketplace'

interface ProductCardProps {
  id: string
  name: string
  price: number
  imageUrl: string
  canadianScore: number
  onWishlist?: boolean
  onWishlistToggle?: () => void
  onPress?: (id: string) => void
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  canadianScore,
  onWishlist = false,
  onWishlistToggle,
  onPress = (productId) => router.push(`/product/${productId}`),
}) => {
  const theme = useTheme()

  return (
    <Card style={styles.card} onPress={() => onPress(id)}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text variant="titleMedium" numberOfLines={2}>
          {name}
        </Text>
        <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
          ${price.toFixed(2)}
        </Text>
        <View style={styles.footer}>
          <CanadianBadge score={canadianScore} />
          {onWishlistToggle && (
            <IconButton
              icon={onWishlist ? 'heart' : 'heart-outline'}
              iconColor={onWishlist ? theme.colors.error : theme.colors.onSurface}
              onPress={onWishlistToggle}
            />
          )}
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default ProductCard
