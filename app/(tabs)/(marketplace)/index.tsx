import { router } from 'expo-router'
import React, { useState } from 'react'
import { View, ScrollView, StyleSheet, Image } from 'react-native'
import { Text, useTheme, Button, Divider, Surface, IconButton, Modal, Portal } from 'react-native-paper'

import { GradientBackground } from '@/lib'
import {
  CategoryList,
  ProductGrid,
  SearchBar,
} from '@/lib/ui/components/marketplace'

// Enhanced mock data for demonstration
const mockCategories = [
  { id: '1', name: 'Electronics', icon: 'laptop', productCount: 150 },
  { id: '2', name: 'Food & Beverage', icon: 'food-apple', productCount: 200 },
  { id: '3', name: 'Clothing', icon: 'tshirt-crew', productCount: 180 },
  { id: '4', name: 'Home & Garden', icon: 'home', productCount: 120 },
  { id: '5', name: 'Sports', icon: 'basketball', productCount: 95 },
  { id: '6', name: 'Books', icon: 'book-open-variant', productCount: 210 },
  { id: '7', name: 'Beauty', icon: 'face-woman', productCount: 130 },
]

// More realistic product data with local images
const mockProducts = [
  {
    id: '1',
    name: 'Pure Canadian Maple Syrup',
    price: 19.99,
    imageUrl: require('@/assets/images/products/clothing/winter-jacket.jpg'),
    canadianScore: 95,
    description: 'Pure Canadian maple syrup harvested from Quebec maple forests. 100% natural and traditionally processed.',
  },
  {
    id: '2',
    name: 'Winter Down Jacket',
    price: 199.99,
    imageUrl: require('@/assets/images/products/clothing/winter-jacket.jpg'),
    canadianScore: 90,
    description: 'Premium winter jacket designed for extreme Canadian winters. Ethically sourced down filling and water-resistant exterior.',
  },
  {
    id: '3',
    name: 'Handcrafted Wooden Bowl',
    price: 49.99,
    imageUrl: require('@/assets/images/products/clothing/winter-jacket.jpg'),
    canadianScore: 88,
    description: 'Handcrafted by Canadian artisans using locally sourced maple wood. Each piece is unique with natural grain patterns.',
  },
  {
    id: '4',
    name: 'Organic Blueberry Jam',
    price: 12.99,
    imageUrl: require('@/assets/images/products/food/blueberry-jam.jpg'),
    canadianScore: 92,
    description: 'Made with wild Canadian blueberries harvested from pristine forests. No artificial preservatives or additives.',
  },
  {
    id: '5',
    name: 'Smart Speaker',
    price: 79.99,
    imageUrl: require('@/assets/images/products/electronics/smart-speaker.jpg'),
    canadianScore: 85,
    description: 'High-quality smart speaker designed and manufactured in Canada with premium sound quality.',
  },
  {
    id: '6',
    name: 'Wireless Earbuds',
    price: 129.99,
    imageUrl: require('@/assets/images/products/electronics/wireless-earbuds.jpg'),
    canadianScore: 82,
    description: 'Premium wireless earbuds with noise cancellation and long battery life. Designed in Vancouver.',
  },
]

// Featured deals with local images
const featuredDeals = [
  {
    id: 'deal1',
    title: 'Summer Sale',
    description: 'Up to 40% off on Canadian-made products',
    imageUrl: require('@/assets/images/products/featured/summer-sale.jpg'),
  },
  {
    id: 'deal2',
    title: 'Free Shipping',
    description: 'On orders over $50',
    imageUrl: require('@/assets/images/products/clothing/winter-jacket.jpg'),
  },
]

const MarketplaceScreen = () => {
  const theme = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [wishlistedProducts, setWishlistedProducts] = useState<string[]>([])

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '/search',
        params: { query: searchQuery },
      })
    }
  }

  const handleWishlistToggle = (productId: string) => {
    setWishlistedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleFilterPress = () => {
    setFilterModalVisible(true)
  }

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground height="full" />
      
      {/* Main Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search Canadian products..."
            onSubmit={handleSearchSubmit}
            onFilterPress={handleFilterPress}
          />
        </View>
        
        {/* Featured Deals Carousel */}
        <View style={styles.featuredContainer}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Featured Deals
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredScroll}
            decelerationRate="fast"
            snapToInterval={316} // card width + margin
            snapToAlignment="center"
          >
            {featuredDeals.map(deal => (
              <Surface 
                key={deal.id} 
                style={styles.dealCard}
                elevation={4}
              >
                <View style={styles.dealContent}>
                  <Text variant="titleMedium" style={styles.dealTitle}>{deal.title}</Text>
                  <Text variant="bodyMedium" style={styles.dealDescription}>{deal.description}</Text>
                  <Button 
                    mode="contained" 
                    style={styles.dealButton}
                    onPress={() => router.push('/search')}
                  >
                    Shop Now
                  </Button>
                </View>
              </Surface>
            ))}
          </ScrollView>
        </View>
        
        {/* Categories Section */}
        <View style={styles.categoriesContainer}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Browse Categories
            </Text>
            <Button 
              mode="text" 
              compact 
              onPress={() => console.log('View all categories')}
            >
              See All
            </Button>
          </View>
          <CategoryList categories={mockCategories} />
        </View>
        
        <Divider style={styles.divider} />
        
        {/* Featured Products Section */}
        <View style={styles.productsContainer}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Featured Products
            </Text>
            <Button 
              mode="text" 
              compact 
              onPress={() => console.log('View all products')}
            >
              See All
            </Button>
          </View>
          <ProductGrid 
            products={mockProducts} 
            useScrollView={true} 
            wishlistedProducts={wishlistedProducts}
            onWishlistToggle={handleWishlistToggle}
          />
        </View>
      </ScrollView>
      
      {/* Filter Modal */}
      <Portal>
        <Modal
          visible={filterModalVisible}
          onDismiss={() => setFilterModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalHeader}>
            <Text variant="titleLarge">Filter Products</Text>
            <IconButton
              icon="close"
              onPress={() => setFilterModalVisible(false)}
            />
          </View>
          <Divider />
          <View style={styles.modalContent}>
            <Text variant="titleMedium">Price Range</Text>
            {/* Price range slider would go here */}
            <View style={styles.modalActions}>
              <Button 
                mode="outlined" 
                style={styles.modalButton}
                onPress={() => setFilterModalVisible(false)}
              >
                Reset
              </Button>
              <Button 
                mode="contained" 
                style={styles.modalButton}
                onPress={() => setFilterModalVisible(false)}
              >
                Apply
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  searchBarContainer: {
    marginBottom: 8,
  },
  featuredContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  featuredScroll: {
    paddingHorizontal: 8,
  },
  dealCard: {
    width: 300,
    marginHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  dealImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  dealContent: {
    padding: 16,
  },
  dealTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dealDescription: {
    opacity: 0.8,
  },
  dealButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  productsContainer: {
    marginTop: 8,
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    padding: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  },
  modalButton: {
    marginLeft: 8,
  },
})

export default MarketplaceScreen
