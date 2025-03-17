"use client"

import { router } from "expo-router"
import React from "react"
import { Image, StyleSheet, View, Pressable, Animated } from "react-native"
import { IconButton, Text, useTheme, Surface } from "react-native-paper"

import CanadianBadge from "./CanadianBadge"

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

  // Format price with commas for thousands
  const formattedPrice = price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          transform: [{ scale: scaleAnim }],
          shadowOpacity: 0.15,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
        },
      ]}
    >
      <Surface
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.surfaceVariant,
          },
        ]}
        elevation={3}
      >
        <Pressable
          android_ripple={{ color: theme.colors.surfaceVariant }}
          style={({ pressed }) => [styles.pressable, { opacity: pressed ? 0.9 : 1 }]}
          onPress={() => onPress(id)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          {/* Image container with wishlist button overlay */}
          <View style={styles.imageContainer}>
            <Image 
              source={typeof imageUrl === 'string' ? 
                (imageUrl.startsWith('http') ? { uri: imageUrl } : imageUrl) : 
                imageUrl} 
              style={styles.image} 
              resizeMode="cover" 
            />

            {/* Gradient overlay for better text visibility */}
            <View style={styles.imageGradient} />

            {/* Wishlist button */}
            {onWishlistToggle && (
              <View style={styles.wishlistButton}>
                <IconButton
                  icon={onWishlist ? "heart" : "heart-outline"}
                  iconColor={onWishlist ? theme.colors.error : "white"}
                  size={22}
                  onPress={(e) => {
                    e.stopPropagation()
                    onWishlistToggle()
                  }}
                  style={[styles.heartIcon, onWishlist && { backgroundColor: "rgba(255, 255, 255, 0.3)" }]}
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
            <Text variant="titleMedium" numberOfLines={2} style={[styles.name, { color: theme.colors.onSurface }]}>
              {name}
            </Text>

            {description && (
              <Text
                variant="bodySmall"
                numberOfLines={2}
                style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
              >
                {description}
              </Text>
            )}

            <View style={styles.priceRow}>
              <Text variant="titleLarge" style={[styles.price, { color: theme.colors.primary }]}>
                ${formattedPrice}
              </Text>

              {/* Quick add to cart button */}
              <IconButton
                icon="cart-plus"
                mode="contained"
                size={20}
                onPress={(e) => {
                  e.stopPropagation()
                  // Add to cart functionality would go here
                }}
                style={styles.cartButton}
                containerColor={theme.colors.primaryContainer}
                iconColor={theme.colors.primary}
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
    borderRadius: 20,
    shadowColor: "#000",
  },
  card: {
    overflow: "hidden",
    borderRadius: 20,
    borderWidth: 0.5,
  },
  pressable: {
    width: "100%",
  },
  imageContainer: {
    position: "relative",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#f0f0f0",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  wishlistButton: {
    position: "absolute",
    top: 4,
    right: 4,
    zIndex: 1,
  },
  heartIcon: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    margin: 0,
    borderRadius: 20,
  },
  badgeContainer: {
    position: "absolute",
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
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  description: {
    marginBottom: 8,
    height: 32, // Fixed height for 2 lines
    opacity: 0.7,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  price: {
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  cartButton: {
    margin: 0,
    borderRadius: 12,
  },
})

export default ProductCard
