import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { 
  IconButton, 
  Text, 
  useTheme, 
  Chip, 
  Divider, 
  Appbar,
  Menu,
  Button,
  Portal,
  Modal
} from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { GradientBackground } from '@/lib'
import { ProductGrid, SearchBar } from '@/lib/ui/components/marketplace'

// Enhanced mock categories data
const mockCategories = {
  '1': { name: 'Electronics', icon: 'laptop', description: 'Latest tech gadgets and electronics made in Canada' },
  '2': { name: 'Food & Beverage', icon: 'food-apple', description: 'Delicious Canadian food and drink products' },
  '3': { name: 'Clothing', icon: 'tshirt-crew', description: 'Canadian-made apparel for all seasons' },
  '4': { name: 'Home & Garden', icon: 'home', description: 'Products for your home and garden' },
  '5': { name: 'Sports', icon: 'basketball', description: 'Sports equipment and accessories' },
  '6': { name: 'Books', icon: 'book-open-variant', description: 'Books by Canadian authors and publishers' },
  '7': { name: 'Beauty', icon: 'face-woman', description: 'Beauty and personal care products' },
}

// Enhanced mock products by category with local images
const mockCategoryProducts = {
  '1': [
    {
      id: '101',
      name: 'Smart Speaker with Canadian Voice Assistant',
      price: 79.99,
      imageUrl: require('@/assets/images/products/electronics/smart-speaker.jpg'),
      canadianScore: 85,
    },
    {
      id: '102',
      name: 'Wireless Earbuds with Maple Leaf Design',
      price: 129.99,
      imageUrl: require('@/assets/images/products/electronics/wireless-earbuds.jpg'),
      canadianScore: 88,
    },
    {
      id: '103',
      name: 'Eco-Friendly Smartphone Case',
      price: 24.99,
      imageUrl: require('@/assets/images/products/electronics/smart-speaker.jpg'),
      canadianScore: 92,
    },
    {
      id: '104',
      name: 'Solar Powered Charger',
      price: 49.99,
      imageUrl: require('@/assets/images/products/electronics/solar-charger.jpg'),
      canadianScore: 78,
    },
  ],
  '2': [
    {
      id: '201',
      name: 'Pure Canadian Maple Syrup - 500ml',
      price: 19.99,
      imageUrl: require('@/assets/images/products/home/cutting-board.jpg'),
      canadianScore: 95,
    },
    {
      id: '202',
      name: 'Niagara Ice Wine - Premium Vintage',
      price: 49.99,
      imageUrl: require('@/assets/images/products/food/blueberry-jam.jpg'),
      canadianScore: 92,
    },
    {
      id: '203',
      name: 'Organic Wild Blueberry Jam',
      price: 8.99,
      imageUrl: require('@/assets/images/products/food/blueberry-jam.jpg'),
      canadianScore: 89,
    },
    {
      id: '204',
      name: 'Artisanal Cheese Selection Box',
      price: 34.99,
      imageUrl: require('@/assets/images/products/food/cheese-box.jpg'),
      canadianScore: 91,
    },
  ],
  '3': [
    {
      id: '301',
      name: 'Premium Winter Down Jacket',
      price: 199.99,
      imageUrl: require('@/assets/images/products/clothing/winter-jacket.jpg'),
      canadianScore: 90,
    },
    {
      id: '302',
      name: 'Handcrafted Wool Toque',
      price: 24.99,
      imageUrl: require('@/assets/images/products/clothing/wool-toque.jpg'),
      canadianScore: 94,
    },
    {
      id: '303',
      name: 'Maple Leaf Embroidered T-Shirt',
      price: 29.99,
      imageUrl: require('@/assets/images/products/clothing/maple-tshirt.jpg'),
      canadianScore: 87,
    },
    {
      id: '304',
      name: 'Waterproof Hiking Boots',
      price: 149.99,
      imageUrl: require('@/assets/images/products/clothing/hiking-boots.jpg'),
      canadianScore: 82,
    },
  ],
  '4': [
    {
      id: '401',
      name: 'Handcrafted Cedar Planter Box',
      price: 59.99,
      imageUrl: require('@/assets/images/products/home/cedar-planter.jpg'),
      canadianScore: 89,
    },
    {
      id: '402',
      name: 'Premium Garden Tools Set',
      price: 89.99,
      imageUrl: require('@/assets/images/products/home/garden-tools.jpg'),
      canadianScore: 87,
    },
    {
      id: '403',
      name: 'Maple Wood Cutting Board',
      price: 39.99,
      imageUrl: require('@/assets/images/products/clothing/winter-jacket.jpg'),
      canadianScore: 93,
    },
    {
      id: '404',
      name: 'Recycled Glass Vase',
      price: 45.99,
      imageUrl: require('@/assets/images/products/home/glass-vase.jpg'),
      canadianScore: 85,
    },
  ],
  '5': [
    {
      id: '501',
      name: 'Professional Ice Hockey Stick',
      price: 129.99,
      imageUrl: require('@/assets/images/products/clothing/winter-jacket.jpg'),
      canadianScore: 96,
    },
    {
      id: '502',
      name: 'Canoe Paddle - Handcrafted',
      price: 89.99,
      imageUrl: require('@/assets/images/products/home/cutting-board.jpg'),
      canadianScore: 94,
    },
  ],
  '6': [
    {
      id: '601',
      name: 'Canadian History Collection - Hardcover',
      price: 49.99,
      imageUrl: require('@/assets/images/products/books/history-collection.jpg'),
      canadianScore: 90,
    },
    {
      id: '602',
      name: 'Wilderness Survival Guide',
      price: 24.99,
      imageUrl: require('@/assets/images/products/books/wilderness-guide.jpg'),
      canadianScore: 88,
    },
  ],
  '7': [
    {
      id: '701',
      name: 'Maple Extract Face Serum',
      price: 34.99,
      imageUrl: require('@/assets/images/products/beauty/lip-balm.jpg'),
      canadianScore: 91,
    },
    {
      id: '702',
      name: 'Wild Berry Lip Balm Set',
      price: 14.99,
      imageUrl: require('@/assets/images/products/beauty/lip-balm.jpg'),
      canadianScore: 89,
    },
  ],
}

// Filter options
const filterOptions = {
  sortBy: ['Price: Low to High', 'Price: High to Low', 'Canadian Score', 'Newest'],
  priceRange: ['Under $25', '$25 - $50', '$50 - $100', 'Over $100'],
  canadianScore: ['90% and above', '80% and above', '70% and above'],
}

const CategoryScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const theme = useTheme()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [menuVisible, setMenuVisible] = useState(false)
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [wishlistedProducts, setWishlistedProducts] = useState<string[]>([])
  
  const category = mockCategories[id as keyof typeof mockCategories]
  const products = mockCategoryProducts[id as keyof typeof mockCategoryProducts]
  
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
  
  const handleFilterSelect = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }
  
  const handleSearchSubmit = () => {
    console.log('Searching in category:', searchQuery)
  }

  // Update the screen title with the category name
  React.useEffect(() => {
    if (category) {
      router.setParams({ title: category.name });
    }
  }, [category, router]);

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground height="full" />
      
      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={`Search in ${category?.name}...`}
          onSubmit={handleSearchSubmit}
          onFilterPress={handleFilterPress}
        />
        
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <View style={styles.filtersContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersScroll}
            >
              {activeFilters.map(filter => (
                <Chip 
                  key={filter}
                  mode="outlined"
                  onClose={() => handleFilterSelect(filter)}
                  style={styles.filterChip}
                  closeIconAccessibilityLabel="Remove filter"
                >
                  {filter}
                </Chip>
              ))}
              <Chip 
                mode="outlined"
                onPress={() => setActiveFilters([])}
                style={styles.clearChip}
              >
                Clear All
              </Chip>
            </ScrollView>
          </View>
        )}
      </View>
      
      <Divider />
      
      {/* Product Grid */}
      <View style={styles.productsContainer}>
        {products ? (
          <ProductGrid 
            products={products} 
            wishlistedProducts={wishlistedProducts}
            onWishlistToggle={handleWishlistToggle}
          />
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons 
              name="emoticon-sad-outline" 
              size={48} 
              color={theme.colors.onSurfaceVariant} 
            />
            <Text 
              variant="headlineSmall" 
              style={[styles.emptyStateText, { color: theme.colors.onSurfaceVariant }]}
            >
              No products found
            </Text>
            <Text 
              variant="bodyMedium" 
              style={[styles.emptyStateSubtext, { color: theme.colors.onSurfaceVariant }]}
            >
              Try adjusting your filters or check back later
            </Text>
          </View>
        )}
      </View>
      
      {/* Filter Modal */}
      <Portal>
        <Modal
          visible={filterModalVisible}
          onDismiss={() => setFilterModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalHeader}>
            <Text variant="titleLarge">Sort & Filter</Text>
            <IconButton
              icon="close"
              onPress={() => setFilterModalVisible(false)}
            />
          </View>
          <Divider />
          
          <View style={styles.modalContent}>
            <Text variant="titleMedium" style={styles.modalSectionTitle}>Sort By</Text>
            <View style={styles.optionsContainer}>
              {filterOptions.sortBy.map(option => (
                <Chip
                  key={option}
                  selected={activeFilters.includes(option)}
                  onPress={() => handleFilterSelect(option)}
                  style={styles.optionChip}
                  showSelectedCheck
                >
                  {option}
                </Chip>
              ))}
            </View>
            
            <Divider style={styles.modalDivider} />
            
            <Text variant="titleMedium" style={styles.modalSectionTitle}>Price Range</Text>
            <View style={styles.optionsContainer}>
              {filterOptions.priceRange.map(option => (
                <Chip
                  key={option}
                  selected={activeFilters.includes(option)}
                  onPress={() => handleFilterSelect(option)}
                  style={styles.optionChip}
                  showSelectedCheck
                >
                  {option}
                </Chip>
              ))}
            </View>
            
            <Divider style={styles.modalDivider} />
            
            <Text variant="titleMedium" style={styles.modalSectionTitle}>Canadian Score</Text>
            <View style={styles.optionsContainer}>
              {filterOptions.canadianScore.map(option => (
                <Chip
                  key={option}
                  selected={activeFilters.includes(option)}
                  onPress={() => handleFilterSelect(option)}
                  style={styles.optionChip}
                  showSelectedCheck
                >
                  {option}
                </Chip>
              ))}
            </View>
            
            <View style={styles.modalActions}>
              <Button 
                mode="outlined" 
                style={styles.modalButton}
                onPress={() => {
                  setActiveFilters([])
                  setFilterModalVisible(false)
                }}
              >
                Reset All
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
  appbar: {
    elevation: 0,
    backgroundColor: 'transparent',
  },
  appbarTitle: {
    fontWeight: 'bold',
  },
  appbarSubtitle: {
    fontSize: 12,
    opacity: 0.8,
  },
  menuContent: {
    borderRadius: 12,
  },
  searchContainer: {
    paddingBottom: 8,
  },
  filtersContainer: {
    marginTop: 4,
    marginBottom: 8,
  },
  filtersScroll: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  filterChip: {
    marginRight: 8,
  },
  clearChip: {
    marginRight: 8,
  },
  productsContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyStateText: {
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.7,
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
  modalSectionTitle: {
    marginBottom: 12,
  },
  modalDivider: {
    marginVertical: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionChip: {
    margin: 4,
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

export default CategoryScreen
