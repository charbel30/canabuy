import { router } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, View, Pressable, Animated } from 'react-native'
import { Card, IconButton, Text, useTheme, Surface } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import CanadianBadge from './CanadianBadge'

interface ProductCardProps {
  id: string
  name: string
  price: number
  imageUrl: string
  canadianScore: number
  description?: string
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
  description,
  onWishlist = false,
  onWishlistToggle,
  onPress = (productId) => router.push(`/product/${productId}`),
}) => {
  const theme = useTheme()
  const scaleAnim = React.useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        { transform: [{ scale: scaleAnim }] }
      ]}
    >
      <Surface
        style={[styles.card, { elevation: 3, backgroundColor: theme.colors.surface }]}
        elevation={3}
      >
        <Pressable
          android_ripple={{ color: theme.colors.surfaceVariant }}
          style={({ pressed }) => [
            styles.pressable,
            { opacity: pressed ? 0.9 : 1 }
          ]}
          onPress={() => onPress(id)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          {/* Image container with wishlist button overlay */}
          <View style={styles.imageContainer}>
          <Image source={{ uri: String(imageUrl) }} style={styles.image} />
            
            {/* Wishlist button */}
            {onWishlistToggle && (
              <View style={styles.wishlistButton}>
                <IconButton
                  icon={onWishlist ? 'heart' : 'heart-outline'}
                  iconColor={onWishlist ? theme.colors.error : 'white'}
                  size={22}
                  onPress={(e) => {
                    e.stopPropagation();
                    onWishlistToggle();
                  }}
                  style={styles.heartIcon}
                />
              </View>
            )}
            
            {/* Canadian badge overlay */}
            <View style={styles.badgeContainer}>
              <CanadianBadge score={canadianScore} size="small" showLabel={false} />
            </View>
          </View>
          
          {/* Content */}
          <View style={styles.content}>
            <Text variant="titleMedium" numberOfLines={2} style={styles.name}>
              {name}
            </Text>
            
            {description && (
              <Text variant="bodySmall" numberOfLines={2} style={styles.description}>
                {description}
              </Text>
            )}
            
            <View style={styles.priceRow}>
              <Text variant="titleLarge" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                ${price.toFixed(2)}
              </Text>
              
              {/* Quick add to cart button */}
              <IconButton
                icon="cart-plus"
                mode="contained"
                size={20}
                onPress={(e) => {
                  e.stopPropagation();
                  // Add to cart functionality would go here
                }}
                style={{ margin: 0 }}
              />
            </View>
          </View>
        </Pressable>
      </Surface>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 8,
  },
  card: {
    overflow: 'hidden',
    borderRadius: 16,
  },
  pressable: {
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  wishlistButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  heartIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    margin: 0,
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    zIndex: 1,
  },
  content: {
    padding: 16,
  },
  name: {
    marginBottom: 4,
    height: 48, // Fixed height for 2 lines
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 8,
    height: 32, // Fixed height for 2 lines
    opacity: 0.7,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
})

export default ProductCard
