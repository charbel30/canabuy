"use client"

import { router } from "expo-router"
import React, { useState } from "react"
import { View, ScrollView, StyleSheet, Image, Animated } from "react-native"
import { Text, useTheme, Button, Divider, Surface, IconButton, Modal, Portal } from "react-native-paper"

import { GradientBackground } from "@/lib"
import { CategoryList, ProductGrid, SearchBar } from "@/lib/ui/components/marketplace"

// Enhanced mock data for demonstration
const mockCategories = [
  { id: "1", name: "Electronics", icon: "laptop", productCount: 150 },
  { id: "2", name: "Food & Beverage", icon: "food-apple", productCount: 200 },
  { id: "3", name: "Clothing", icon: "tshirt-crew", productCount: 180 },
  { id: "4", name: "Home & Garden", icon: "home", productCount: 120 },
  { id: "5", name: "Sports", icon: "basketball", productCount: 95 },
  { id: "6", name: "Books", icon: "book-open-variant", productCount: 210 },
  { id: "7", name: "Beauty", icon: "face-woman", productCount: 130 },
]

// More realistic product data with local images
const mockProducts = [
  {
    id: "1",
    name: "Pure Canadian Maple Syrup",
    price: 19.99,
    imageUrl: require("@/assets/images/products/clothing/winter-jacket.jpg"),
    canadianScore: 95,
    description:
      "Pure Canadian maple syrup harvested from Quebec maple forests. 100% natural and traditionally processed.",
  },
  {
    id: "2",
    name: "Winter Down Jacket",
    price: 199.99,
    imageUrl: require("@/assets/images/products/clothing/winter-jacket.jpg"),
    canadianScore: 90,
    description:
      "Premium winter jacket designed for extreme Canadian winters. Ethically sourced down filling and water-resistant exterior.",
  },
  {
    id: "3",
    name: "Handcrafted Wooden Bowl",
    price: 49.99,
    imageUrl: require("@/assets/images/products/clothing/winter-jacket.jpg"),
    canadianScore: 88,
    description:
      "Handcrafted by Canadian artisans using locally sourced maple wood. Each piece is unique with natural grain patterns.",
  },
  {
    id: "4",
    name: "Organic Blueberry Jam",
    price: 12.99,
    imageUrl: require("@/assets/images/products/food/blueberry-jam.jpg"),
    canadianScore: 92,
    description:
      "Made with wild Canadian blueberries harvested from pristine forests. No artificial preservatives or additives.",
  },
  {
    id: "5",
    name: "Smart Speaker",
    price: 79.99,
    imageUrl: require("@/assets/images/products/electronics/smart-speaker.jpg"),
    canadianScore: 85,
    description: "High-quality smart speaker designed and manufactured in Canada with premium sound quality.",
  },
  {
    id: "6",
    name: "Wireless Earbuds",
    price: 129.99,
    imageUrl: require("@/assets/images/products/electronics/wireless-earbuds.jpg"),
    canadianScore: 82,
    description: "Premium wireless earbuds with noise cancellation and long battery life. Designed in Vancouver.",
  },
]

// Featured deals with local images

const MarketplaceScreen = () => {
  const theme = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [wishlistedProducts, setWishlistedProducts] = useState<string[]>([])

  // Animation values
  const scrollY = React.useRef(new Animated.Value(0)).current
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [1, 0.8, 0],
    extrapolate: "clamp",
  })

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: "clamp",
  })

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: "/(tabs)/(marketplace)/search",
        params: { query: searchQuery },
      })
    }
  }

  const handleWishlistToggle = (productId: string) => {
    setWishlistedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleFilterPress = () => {
    setFilterModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <GradientBackground height="half" />

      {/* Animated Header */}
      <Animated.View
        style={[
          styles.headerContainer,
          {
            opacity: headerOpacity,
            transform: [{ translateY: headerTranslateY }],
          },
        ]}
      >
        <Text variant="headlineMedium" style={styles.headerTitle}>
          CanaBuy
        </Text>
        <Text variant="bodyLarge" style={styles.headerSubtitle}>
          Discover Canadian Excellence
        </Text>
      </Animated.View>

      {/* Main Content */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
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

        {/* Categories Section */}
        <View style={styles.categoriesContainer}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Browse Categories
            </Text>
            <Button
              mode="text"
              compact
              onPress={() => console.log("View all categories")}
              labelStyle={styles.seeAllButton}
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
              onPress={() => console.log("View all products")}
              labelStyle={styles.seeAllButton}
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
      </Animated.ScrollView>

      {/* Filter Modal */}
      <Portal>
        <Modal
          visible={filterModalVisible}
          onDismiss={() => setFilterModalVisible(false)}
          contentContainerStyle={[styles.modalContainer, { backgroundColor: theme.colors.surface }]}
        >
          <View style={styles.modalHeader}>
            <Text variant="titleLarge" style={styles.modalTitle}>
              Filter Products
            </Text>
            <IconButton icon="close" onPress={() => setFilterModalVisible(false)} style={styles.modalCloseButton} />
          </View>
          <Divider />
          <View style={styles.modalContent}>
            <Text variant="titleMedium" style={styles.modalSectionTitle}>
              Price Range
            </Text>
            {/* Price range slider would go here */}
            <View style={styles.priceRangeContainer}>
              <Surface style={[styles.priceInput, { backgroundColor: theme.colors.surfaceVariant }]}>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  Min
                </Text>
                <Text variant="bodyLarge" style={{ color: theme.colors.onSurface }}>
                  $0
                </Text>
              </Surface>
              <Text variant="bodyLarge" style={{ marginHorizontal: 8 }}>
                -
              </Text>
              <Surface style={[styles.priceInput, { backgroundColor: theme.colors.surfaceVariant }]}>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  Max
                </Text>
                <Text variant="bodyLarge" style={{ color: theme.colors.onSurface }}>
                  $500
                </Text>
              </Surface>
            </View>

            <Text variant="titleMedium" style={[styles.modalSectionTitle, { marginTop: 24 }]}>
              Canadian Score
            </Text>
            <View style={styles.scoreFilterContainer}>
              {[70, 80, 90].map((score) => (
                <Surface key={score} style={[styles.scoreFilterItem, { backgroundColor: theme.colors.surfaceVariant }]}>
                  <Text variant="bodyMedium">{score}% and above</Text>
                  <IconButton icon="check-circle" size={20} iconColor={theme.colors.primary} style={{ margin: 0 }} />
                </Surface>
              ))}
            </View>

            <View style={styles.modalActions}>
              <Button mode="outlined" style={styles.modalButton} onPress={() => setFilterModalVisible(false)}>
                Reset
              </Button>
              <Button mode="contained" style={styles.modalButton} onPress={() => setFilterModalVisible(false)}>
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
  container: {
    flex: 1,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 20,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  headerTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  headerSubtitle: {
    textAlign: "center",
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 100, // Space for the header
    paddingBottom: 32,
  },
  searchBarContainer: {
    marginBottom: 8,
  },
  featuredContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
    letterSpacing: 0.2,
  },
  seeAllButton: {
    fontWeight: "500",
  },
  featuredScroll: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  dealCard: {
    width: 300,
    height: 220,
    marginHorizontal: 8,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 0.5,
  },
  dealImage: {
    width: "100%",
    height: 120,
  },
  dealImageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  dealContent: {
    padding: 16,
  },
  dealTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  dealDescription: {
    opacity: 0.8,
    marginBottom: 12,
  },
  dealButton: {
    alignSelf: "flex-start",
    borderRadius: 20,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
  productsContainer: {
    marginTop: 8,
  },
  modalContainer: {
    margin: 20,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  modalTitle: {
    fontWeight: "bold",
  },
  modalCloseButton: {
    margin: 0,
  },
  modalContent: {
    padding: 16,
  },
  modalSectionTitle: {
    fontWeight: "600",
    marginBottom: 16,
  },
  priceRangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  priceInput: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
  },
  scoreFilterContainer: {
    marginTop: 8,
  },
  scoreFilterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 32,
  },
  modalButton: {
    marginLeft: 12,
    paddingHorizontal: 16,
  },
})

export default MarketplaceScreen

