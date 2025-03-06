import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Card, Divider, IconButton, Text } from 'react-native-paper'

import { GradientBackground } from '@/lib'
import { CanadianBadge } from '@/lib/ui/components/marketplace'

// Mock products data (in real app, this would come from a store/API)
const mockProducts = {
  '101': {
    id: '101',
    name: 'Smart Speaker',
    description:
      'High-quality smart speaker designed and manufactured in Canada. Features voice control, premium sound, and seamless smart home integration.',
    price: 79.99,
    imageUrl: 'https://placekitten.com/400/400',
    canadianScore: 85,
    seller: {
      id: 's1',
      name: 'TechNorth',
      location: 'Ontario',
      isVerified: true,
    },
    features: [
      'Voice-activated controls',
      'Premium sound quality',
      'Smart home integration',
      'Made in Canada',
    ],
  },
  '201': {
    id: '201',
    name: 'Maple Syrup',
    description:
      'Pure Canadian maple syrup harvested from Quebec maple forests. 100% natural and traditionally processed.',
    price: 19.99,
    imageUrl: 'https://placekitten.com/400/400',
    canadianScore: 95,
    seller: {
      id: 's2',
      name: 'Canadian Delights',
      location: 'Quebec',
      isVerified: true,
    },
    features: [
      '100% pure maple syrup',
      'Harvested in Quebec',
      'Traditional processing',
      'Grade A quality',
    ],
  },
  // Add more products as needed
}

const ProductScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const product = mockProducts[id as keyof typeof mockProducts]

  if (!product) {
    return (
      <View style={styles.container}>
        <GradientBackground height="full" />
        <Text variant="bodyLarge">Product not found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <GradientBackground height="full" />
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          onPress={() => router.back()}
          style={styles.backButton}
        />
        <IconButton
          icon={isWishlisted ? 'heart' : 'heart-outline'}
          onPress={() => setIsWishlisted(!isWishlisted)}
          style={styles.wishlistButton}
        />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
        <View style={styles.details}>
          <Text variant="headlineMedium">{product.name}</Text>
          <Text variant="headlineSmall" style={styles.price}>
            ${product.price.toFixed(2)}
          </Text>
          <CanadianBadge score={product.canadianScore} />
          <Text variant="bodyLarge" style={styles.description}>
            {product.description}
          </Text>

          <Divider style={styles.divider} />

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Features
          </Text>
          {product.features.map((feature, index) => (
            <Text key={index} variant="bodyMedium" style={styles.feature}>
              • {feature}
            </Text>
          ))}

          <Divider style={styles.divider} />

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Seller Information
          </Text>
          <Card style={styles.sellerCard}>
            <Card.Content>
              <View style={styles.sellerHeader}>
                <Text variant="titleMedium">{product.seller.name}</Text>
                {product.seller.isVerified && (
                  <IconButton icon="check-decagram" size={20} />
                )}
              </View>
              <Text variant="bodyMedium">Location: {product.seller.location}</Text>
            </Card.Content>
          </Card>

          <Button
            mode="contained"
            onPress={() => {
              // Handle add to cart
            }}
            style={styles.addToCartButton}
          >
            Add to Cart
          </Button>
        </View>
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
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    margin: 0,
  },
  wishlistButton: {
    margin: 0,
  },
  content: {
    paddingBottom: 24,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  details: {
    padding: 16,
  },
  price: {
    marginTop: 8,
  },
  badge: {
    marginTop: 16,
    marginBottom: 16,
  },
  description: {
    marginTop: 8,
    lineHeight: 24,
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  feature: {
    marginBottom: 4,
  },
  sellerCard: {
    marginTop: 8,
  },
  sellerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartButton: {
    marginTop: 24,
  },
})

export default ProductScreen
