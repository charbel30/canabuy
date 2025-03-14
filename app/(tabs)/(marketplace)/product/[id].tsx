import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Card, Divider, IconButton, Text, useTheme } from 'react-native-paper'

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
    imageUrl: require('@/assets/images/products/electronics/smart-speaker.jpg'),
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
    name: 'Pure Canadian Maple Syrup',
    description:
      'Pure Canadian maple syrup harvested from Quebec maple forests. 100% natural and traditionally processed.',
    price: 19.99,
    imageUrl: require('@/assets/images/products/clothing/winter-jacket.jpg'),
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
  '301': {
    id: '301',
    name: 'Winter Down Jacket',
    description:
      'Premium winter jacket designed for extreme Canadian winters. Ethically sourced down filling and water-resistant exterior.',
    price: 199.99,
    imageUrl: require('@/assets/images/products/clothing/winter-jacket.jpg'),
    canadianScore: 90,
    seller: {
      id: 's3',
      name: 'Northern Outfitters',
      location: 'Alberta',
      isVerified: true,
    },
    features: [
      'Ethically sourced down filling',
      'Water-resistant exterior',
      'Designed for extreme cold',
      'Made in Canada',
    ],
  },
  '401': {
    id: '401',
    name: 'Handcrafted Wooden Bowl',
    description:
      'Handcrafted by Canadian artisans using locally sourced maple wood. Each piece is unique with natural grain patterns.',
    price: 49.99,
    imageUrl: require('@/assets/images/products/clothing/winter-jacket.jpg'),
    canadianScore: 88,
    seller: {
      id: 's4',
      name: 'Artisan Woodworks',
      location: 'British Columbia',
      isVerified: true,
    },
    features: [
      'Handcrafted by local artisans',
      'Sustainably sourced maple wood',
      'Food-safe finish',
      'Each piece is unique',
    ],
  },
  '501': {
    id: '501',
    name: 'Organic Blueberry Jam',
    description:
      'Made with wild Canadian blueberries harvested from pristine forests. No artificial preservatives or additives.',
    price: 12.99,
    imageUrl: require('@/assets/images/products/food/blueberry-jam.jpg'),
    canadianScore: 92,
    seller: {
      id: 's5',
      name: 'Wild Harvest',
      location: 'Nova Scotia',
      isVerified: true,
    },
    features: [
      'Wild Canadian blueberries',
      'No artificial preservatives',
      'Small-batch production',
      'Sustainable harvesting practices',
    ],
  },
  '601': {
    id: '601',
    name: 'Wireless Earbuds',
    description:
      'Premium wireless earbuds with noise cancellation and long battery life. Designed in Vancouver.',
    price: 129.99,
    imageUrl: require('@/assets/images/products/electronics/wireless-earbuds.jpg'),
    canadianScore: 82,
    seller: {
      id: 's6',
      name: 'West Coast Audio',
      location: 'British Columbia',
      isVerified: true,
    },
    features: [
      'Active noise cancellation',
      'Long battery life',
      'Water-resistant design',
      'Designed in Vancouver',
    ],
  },
}

const ProductScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const theme = useTheme()
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
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Image source={product.imageUrl} style={styles.image} />
        <View style={styles.details}>
          <Text variant="headlineMedium" style={styles.productName}>{product.name}</Text>
          <Text variant="headlineSmall" style={styles.price}>
            ${product.price.toFixed(2)}
          </Text>
          <View style={styles.badgeContainer}>
            <CanadianBadge score={product.canadianScore} />
          </View>
          <Text variant="bodyLarge" style={styles.description}>
            {product.description}
          </Text>

          <Divider style={styles.divider} />

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Features
          </Text>
          <View style={styles.featuresContainer}>
            {product.features.map((feature, index) => (
              <Text key={index} variant="bodyMedium" style={styles.feature}>
                • {feature}
              </Text>
            ))}
          </View>

          <Divider style={styles.divider} />

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Seller Information
          </Text>
          <Card style={styles.sellerCard} elevation={2}>
            <Card.Content>
              <View style={styles.sellerHeader}>
                <Text variant="titleMedium" style={styles.sellerName}>{product.seller.name}</Text>
                {product.seller.isVerified && (
                  <IconButton 
                    icon="check-decagram" 
                    size={20} 
                    iconColor={theme.colors.primary}
                  />
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
            icon="cart-plus"
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
  productName: {
    fontWeight: 'bold',
  },
  price: {
    marginTop: 8,
    color: '#e53935', // A nice red color for price
  },
  badgeContainer: {
    marginTop: 16,
    marginBottom: 16,
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
    fontWeight: 'bold',
  },
  featuresContainer: {
    marginBottom: 8,
  },
  feature: {
    marginBottom: 4,
  },
  sellerCard: {
    marginTop: 8,
    borderRadius: 12,
  },
  sellerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerName: {
    fontWeight: 'bold',
  },
  addToCartButton: {
    marginTop: 24,
  },
})

export default ProductScreen
