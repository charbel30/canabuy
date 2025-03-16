"use client"

import { useLocalSearchParams, useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import { ScrollView, StyleSheet, View, Animated } from "react-native"
import { Divider, Text, useTheme, Chip, Button } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { GradientBackground } from "@/lib"
import { ProductGrid, SearchBar } from "@/lib/ui/components/marketplace"

// Enhanced mock search results with local images
const mockSearchResults = [
  {
    id: "1",
    name: "Pure Canadian Maple Syrup",
    price: 19.99,
    imageUrl: require("@/assets/images/products/clothing/winter-jacket.jpg"),
    canadianScore: 95,
    description: "Pure Canadian maple syrup harvested from Quebec maple forests.",
  },
  {
    id: "2",
    name: "Winter Down Jacket",
    price: 199.99,
    imageUrl: require("@/assets/images/products/clothing/winter-jacket.jpg"),
    canadianScore: 90,
    description: "Premium winter jacket designed for extreme Canadian winters.",
  },
  {
    id: "3",
    name: "Smart Speaker",
    price: 79.99,
    imageUrl: require("@/assets/images/products/electronics/smart-speaker.jpg"),
    canadianScore: 85,
    description: "High-quality smart speaker designed and manufactured in Canada.",
  },
  {
    id: "4",
    name: "Wireless Earbuds",
    price: 129.99,
    imageUrl: require("@/assets/images/products/electronics/wireless-earbuds.jpg"),
    canadianScore: 82,
    description: "Premium wireless earbuds with noise cancellation and long battery life.",
  },
  {
    id: "5",
    name: "Handcrafted Wooden Bowl",
    price: 49.99,
    imageUrl: require("@/assets/images/products/clothing/winter-jacket.jpg"),
    canadianScore: 88,
    description: "Handcrafted by Canadian artisans using locally sourced maple wood.",
  },
  {
    id: "6",
    name: "Organic Blueberry Jam",
    price: 12.99,
    imageUrl: require("@/assets/images/products/food/blueberry-jam.jpg"),
    canadianScore: 92,
    description: "Made with wild Canadian blueberries harvested from pristine forests.",
  },
]

// Filter categories
const filterCategories = [
  { id: "all", name: "All" },
  { id: "electronics", name: "Electronics" },
  { id: "food", name: "Food & Beverage" },
  { id: "clothing", name: "Clothing" },
  { id: "home", name: "Home & Garden" },
]

const MarketplaceSearchScreen = () => {
  const { query } = useLocalSearchParams<{ query: string }>()
  const [searchQuery, setSearchQuery] = useState(query || "")
  const [wishlistedProducts, setWishlistedProducts] = useState<string[]>([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const theme = useTheme()

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current
  const translateY = React.useRef(new Animated.Value(20)).current

  useEffect(() => {
    if (query) {
      setSearchQuery(query)
      // Simulate loading
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        // Animate results in
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]).start()
      }, 800)
    }
  }, [query, fadeAnim, translateY])

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      // Update URL with new search query
      router.setParams({ query: searchQuery })

      // Reset animations and simulate loading
      fadeAnim.setValue(0)
      translateY.setValue(20)
      setIsLoading(true)

      setTimeout(() => {
        setIsLoading(false)
        // Animate results in
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]).start()
      }, 800)
    }
  }

  const handleWishlistToggle = (productId: string) => {
    setWishlistedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleFilterPress = (filterId: string) => {
    setActiveFilter(filterId)
    // Simulate filter change with animation
    fadeAnim.setValue(0)
    translateY.setValue(20)
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start()
    }, 500)
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    // Simulate sort change
    fadeAnim.setValue(0.5)

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }, 300)
  }

  return (
    <View style={styles.container}>
      <GradientBackground height="full" />

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search Canadian products..."
          onSubmit={handleSearchSubmit}
        />
      </View>

      {/* Filter Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.filterContainer}
        style={styles.filterScrollView} // Add fixed height style
>
        {filterCategories.map((filter) => (
          <Chip
            key={filter.id}
            selected={activeFilter === filter.id}
            onPress={() => handleFilterPress(filter.id)}
            style={[
              styles.filterChip,
              activeFilter === filter.id && {
                backgroundColor: theme.colors.primaryContainer,
              },
            ]}
            showSelectedCheck={false}
            elevated
          >
            {filter.name}
          </Chip>
        ))}
      </ScrollView>

      <Divider style={styles.divider} />

      {/* Search Results */}
      <View style={styles.resultsContainer}>
        {/* Results Header */}
        <View style={styles.resultsHeader}>
          <Text variant="titleMedium" style={styles.resultsTitle}>
            {searchQuery ? `Results for "${searchQuery}"` : "Start searching for products"}
          </Text>

          {searchQuery && (
            <Button
              mode="text"
              onPress={() => {
                const menu = [
                  { id: "relevance", name: "Relevance" },
                  { id: "price_low", name: "Price: Low to High" },
                  { id: "price_high", name: "Price: High to Low" },
                  { id: "canadian", name: "Canadian Score" },
                ]
                // In a real app, this would open a menu
                handleSortChange(menu[0].id)
              }}
              icon="sort"
              style={styles.sortButton}
            >
              {sortBy === "relevance"
                ? "Relevance"
                : sortBy === "price_low"
                  ? "Price: Low to High"
                  : sortBy === "price_high"
                    ? "Price: High to Low"
                    : "Canadian Score"}
            </Button>
          )}
        </View>

        {/* Loading State */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <MaterialCommunityIcons name="magnify" size={48} color={theme.colors.primary} />
            <Text variant="titleMedium" style={styles.loadingText}>
              Searching for products...
            </Text>
          </View>
        ) : searchQuery && mockSearchResults.length > 0 ? (
          <Animated.View
            style={[
              styles.resultsGrid,
              {
                opacity: fadeAnim,
                transform: [{ translateY }],
              },
            ]}
          >
            <ProductGrid
              products={mockSearchResults}
              wishlistedProducts={wishlistedProducts}
              onWishlistToggle={handleWishlistToggle}
            />
          </Animated.View>
        ) : searchQuery ? (
          <View style={styles.emptyResultsContainer}>
            <MaterialCommunityIcons name="emoticon-sad-outline" size={64} color={theme.colors.onSurfaceVariant} />
            <Text variant="titleLarge" style={styles.emptyResultsTitle}>
              No results found
            </Text>
            <Text variant="bodyMedium" style={styles.emptyResultsText}>
              We couldn't find any products matching "{searchQuery}"
            </Text>
            <Button mode="contained" onPress={() => setSearchQuery("")} style={styles.clearSearchButton}>
              Clear Search
            </Button>
          </View>
        ) : (
          <View style={styles.startSearchContainer}>
            <MaterialCommunityIcons name="magnify" size={64} color={theme.colors.primary} />
            <Text variant="titleLarge" style={styles.startSearchTitle}>
              Find Canadian Products
            </Text>
            <Text variant="bodyMedium" style={styles.startSearchText}>
              Search for products made by Canadian businesses
            </Text>
            <View style={styles.popularSearches}>
              <Text variant="labelLarge" style={styles.popularSearchesTitle}>
                Popular Searches:
              </Text>
              <View style={styles.popularSearchChips}>
                {["Maple Syrup", "Winter Jacket", "Handcrafted"].map((term) => (
                  <Chip
                    key={term}
                    onPress={() => {
                      setSearchQuery(term)
                      handleSearchSubmit()
                    }}
                    style={styles.popularSearchChip}
                  >
                    {term}
                  </Chip>
                ))}
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,

  },
  filterScrollView: {
    height: 44, // Reduced height
    marginBottom: -600 , // Remove any bottom margin
  },
  filterChip: {
    marginRight: 8,
    borderRadius: 20,
    height: 36, // Reduced height for better scaling
  },
  divider: {
    marginHorizontal: 16,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8, // Reduced vertical padding
  },
  resultsTitle: {
    fontWeight: "bold",
  },
  sortButton: {
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    textAlign: "center",
  },
  resultsGrid: {
    flex: 1,
  },
  emptyResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyResultsTitle: {
    marginTop: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptyResultsText: {
    marginTop: 8,
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 24,
  },
  clearSearchButton: {
    marginTop: 16,
    borderRadius: 20,
  },
  startSearchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  startSearchTitle: {
    marginTop: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  startSearchText: {
    marginTop: 8,
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 24,
  },
  popularSearches: {
    marginTop: 24,
    width: "100%",
  },
  popularSearchesTitle: {
    marginBottom: 12,
    textAlign: "center",
    fontWeight: "bold",
    height: 36,
  },
  popularSearchChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    height: 36,
  },
  popularSearchChip: {
    margin: 4,
    borderRadius: 20,
    height: 36, // Reduced height for better scaling to match filterChip
  },
})

export default MarketplaceSearchScreen
