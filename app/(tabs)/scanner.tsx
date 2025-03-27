import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native'
import {
  Text,
  useTheme,
  Button,
  Surface,
  IconButton,
  Chip,
  Divider,
  Avatar,
} from 'react-native-paper'
import { GradientBackground } from '@/lib'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const ScannerScreen = () => {
  const theme = useTheme()
  const [scrollY] = useState(new Animated.Value(0))
  const [flashOn, setFlashOn] = useState(false)
  const [scanType, setScanType] = useState('barcode') // 'barcode' or 'qrcode'
  const [showRecommendations, setShowRecommendations] = useState(false)
  
  // Animation values for the bottom sheet
  const bottomSheetHeight = Dimensions.get('window').height * 0.7
  const bottomSheetY = useRef(new Animated.Value(bottomSheetHeight)).current
  const backdropOpacity = useRef(new Animated.Value(0)).current
  
  // Window dimensions for the scanner frame
  const windowWidth = Dimensions.get('window').width
  const frameWidth = windowWidth * 0.7
  
  // Header animation (similar to listing screen)
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [1, 0.8, 0],
    extrapolate: 'clamp',
  })

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  })

  // Sample Canadian products data
  const canadianProducts = [
    {
      id: '1',
      name: 'Canadian Maple Syrup',
      brand: 'Canadian Heritage',
      origin: 'Quebec',
      rating: 4.9,
      price: '$12.99',
      image: 'https://example.com/maple-syrup.jpg',
      description: 'Authentic maple syrup harvested from Quebec maple forests.',
      tags: ['Organic', 'Natural', 'Local'],
    },
    {
      id: '2',
      name: 'Ice Wine',
      brand: 'Niagara Vineyards',
      origin: 'Ontario',
      rating: 4.7,
      price: '$45.99',
      image: 'https://example.com/ice-wine.jpg',
      description: 'Premium Canadian ice wine from Niagara region grapes harvested while frozen on the vine.',
      tags: ['Premium', 'Award-winning'],
    },
    {
      id: '3',
      name: 'Nanaimo Bars',
      brand: 'BC Treats',
      origin: 'British Columbia',
      rating: 4.6,
      price: '$8.99',
      image: 'https://example.com/nanaimo-bars.jpg',
      description: 'Classic Canadian dessert bars from British Columbia.',
      tags: ['Traditional', 'Homemade'],
    },
    {
      id: '4',
      name: 'Ketchup Chips',
      brand: 'Canadian Munchies',
      origin: 'Alberta',
      rating: 4.4,
      price: '$3.99',
      image: 'https://example.com/ketchup-chips.jpg',
      description: 'Uniquely Canadian ketchup-flavored potato chips.',
      tags: ['Snack', 'Unique Flavor'],
    },
    {
      id: '5',
      name: 'Saskatoon Berry Jam',
      brand: 'Prairie Delights',
      origin: 'Saskatchewan',
      rating: 4.8,
      price: '$7.99',
      image: 'https://example.com/saskatoon-jam.jpg',
      description: 'Homemade jam from wild Saskatoon berries.',
      tags: ['Natural', 'No Preservatives'],
    },
  ]

  // Open bottom sheet with animation
  const openBottomSheet = () => {
    setShowRecommendations(true)
    Animated.parallel([
      Animated.timing(bottomSheetY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }

  // Close bottom sheet with animation
  const closeBottomSheet = () => {
    Animated.parallel([
      Animated.timing(bottomSheetY, {
        toValue: bottomSheetHeight,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowRecommendations(false)
    })
  }

  // Handle scan complete - show recommendations
  const handleScanComplete = () => {
    openBottomSheet()
  }

  // Toggle between barcode and QR code scanning
  const toggleScanType = () => {
    setScanType(scanType === 'barcode' ? 'qrcode' : 'barcode')
  }

  // Render each recommended product item
  const renderProductItem = ({ item }) => (
    <Surface style={styles.productItem}>
      <View style={styles.productContent}>
        <View style={styles.productImageContainer}>
          <Avatar.Image 
            size={60}
            source={{ uri: item.image }}
            style={styles.productImage}
            // Fallback icon if image fails to load
            icon={() => (
              <MaterialCommunityIcons name="food" size={30} color={theme.colors.primary} />
            )}
          />
        </View>
        <View style={styles.productInfo}>
          <Text variant="titleMedium" style={styles.productName}>{item.name}</Text>
          <Text variant="bodyMedium">{item.brand} • {item.origin}</Text>
          <View style={styles.productRating}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text variant="bodySmall">{item.rating}</Text>
            <Text variant="bodyMedium" style={styles.productPrice}>{item.price}</Text>
          </View>
          <View style={styles.tagsContainer}>
            {item.tags.map((tag, index) => (
              <Chip key={index} style={styles.tag} textStyle={styles.tagText} compact>
                {tag}
              </Chip>
            ))}
          </View>
        </View>
      </View>
      <Text variant="bodySmall" style={styles.productDescription}>
        {item.description}
      </Text>
    </Surface>
  )

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
          Scanner
        </Text>
        <Text variant="bodyLarge" style={styles.headerSubtitle}>
          {scanType === 'barcode' ? 'Scan Product Barcode' : 'Scan QR Code'}
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
        <View style={styles.scannerContainer}>
          {/* Scanner Preview (Mock) */}
          <Surface style={[styles.cameraPreview, { backgroundColor: theme.colors.surfaceVariant }]}>
            {/* Scanner Frame */}
            <View style={styles.scannerFrameContainer}>
              <View style={[styles.scannerFrame, { width: frameWidth, height: frameWidth * 0.6 }]}>
                <View style={[styles.cornerTL, { borderColor: theme.colors.primary }]} />
                <View style={[styles.cornerTR, { borderColor: theme.colors.primary }]} />
                <View style={[styles.cornerBL, { borderColor: theme.colors.primary }]} />
                <View style={[styles.cornerBR, { borderColor: theme.colors.primary }]} />
                
                {/* Scan line animation (simple static representation) */}
                <View style={[styles.scanLine, { backgroundColor: theme.colors.primary }]} />
              </View>
            </View>
            
            {/* Centered icon */}
            <View style={styles.centerIconContainer}>
              <MaterialCommunityIcons
                name={scanType === 'barcode' ? 'barcode-scan' : 'qrcode-scan'}
                size={60}
                color={theme.colors.primary}
                style={{ opacity: 0.3 }}
              />
            </View>
          </Surface>

          {/* Controls */}
          <View style={styles.controlsContainer}>
            {/* Flash Toggle */}
            <IconButton
              icon={flashOn ? 'flash' : 'flash-off'}
              size={30}
              mode="contained"
              onPress={() => setFlashOn(!flashOn)}
              style={styles.controlButton}
            />
            
            {/* Scan Type Toggle */}
            <IconButton
              icon={scanType === 'barcode' ? 'qrcode' : 'barcode'}
              size={30}
              mode="contained"
              onPress={toggleScanType}
              style={styles.controlButton}
            />
            
            {/* Gallery Upload */}
            <IconButton
              icon="image"
              size={30}
              mode="contained"
              onPress={() => alert('Select from gallery (prototype)')}
              style={styles.controlButton}
            />
          </View>

          {/* Instructions */}
          <Surface style={styles.instructionsContainer}>
            <Text variant="titleMedium" style={styles.instructionsTitle}>
              Scanning Instructions
            </Text>
            <Text variant="bodyMedium" style={styles.instructionsText}>
              1. Position the {scanType === 'barcode' ? 'barcode' : 'QR code'} within the frame
            </Text>
            <Text variant="bodyMedium" style={styles.instructionsText}>
              2. Hold steady until the scan completes
            </Text>
            <Text variant="bodyMedium" style={styles.instructionsText}>
              3. Use the flash if lighting is poor
            </Text>
          </Surface>

          {/* Manual Entry Button */}
          <Button 
            mode="outlined" 
            icon="keyboard" 
            onPress={() => alert('Manual entry (prototype)')}
            style={styles.manualEntryButton}
          >
            Enter Code Manually
          </Button>

          {/* Scan Button */}
          <Button 
            mode="contained" 
            icon="barcode-scan" 
            onPress={handleScanComplete}
            style={styles.scanButton}
          >
            Simulate Scan
          </Button>
        </View>
      </Animated.ScrollView>

      {/* Recommendations Bottom Sheet */}
      {showRecommendations && (
        <>
          {/* Backdrop */}
          <Animated.View 
            style={[
              styles.backdrop,
              { opacity: backdropOpacity }
            ]}
            onTouchEnd={closeBottomSheet}
          />
          
          {/* Bottom Sheet */}
          <Animated.View 
            style={[
              styles.bottomSheet,
              { 
                transform: [{ translateY: bottomSheetY }],
                height: bottomSheetHeight
              }
            ]}
          >
            {/* Handle bar */}
            <View style={styles.handleBar} />
            
            {/* Header */}
            <View style={styles.bottomSheetHeader}>
              <Text variant="headlineSmall" style={styles.bottomSheetTitle}>
                Canadian Products
              </Text>
              <IconButton
                icon="close"
                size={24}
                onPress={closeBottomSheet}
              />
            </View>
            
            <Text variant="bodyMedium" style={styles.recommendationsSubtitle}>
              Similar Canadian products you might enjoy
            </Text>
            
            <Divider style={styles.divider} />
            
            {/* Products List */}
            <FlatList
              data={canadianProducts}
              renderItem={renderProductItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.productsList}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            />
            
            {/* Actions */}
            <Surface style={styles.actionsContainer}>
              <Button 
                mode="contained" 
                icon="shopping" 
                onPress={() => alert('View all Canadian products')}
                style={styles.viewAllButton}
              >
                View All Canadian Products
              </Button>
            </Surface>
          </Animated.View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  headerContainer: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    paddingTop: 20, 
    paddingHorizontal: 16 
  },
  headerTitle: { 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 4 
  },
  headerSubtitle: { 
    textAlign: 'center', 
    opacity: 0.8 
  },
  scrollView: { 
    flex: 1 
  },
  scrollContent: { 
    paddingTop: 100, 
    paddingBottom: 32, 
    paddingHorizontal: 16 
  },
  scannerContainer: { 
    gap: 16, 
    alignItems: 'center' 
  },
  cameraPreview: { 
    width: '100%', 
    height: 350, 
    borderRadius: 16, 
    overflow: 'hidden', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'relative'
  },
  scannerFrameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  scannerFrame: {
    position: 'relative',
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  scanLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
  },
  centerIconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 16,
  },
  controlButton: {
    margin: 8,
  },
  instructionsContainer: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    elevation: 1,
  },
  instructionsTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  instructionsText: {
    marginBottom: 4,
  },
  manualEntryButton: {
    marginTop: 16,
    width: '100%',
  },
  scanButton: {
    marginTop: 16,
    width: '100%',
  },
  // Bottom sheet styles
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
    elevation: 8,
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  bottomSheetTitle: {
    fontWeight: 'bold',
  },
  recommendationsSubtitle: {
    marginBottom: 16,
    opacity: 0.7,
  },
  divider: {
    marginBottom: 16,
  },
  productsList: {
    paddingVertical: 8,
  },
  productItem: {
    padding: 16,
    borderRadius: 12,
  },
  productContent: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  productImageContainer: {
    marginRight: 16,
  },
  productImage: {
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  productPrice: {
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
  productDescription: {
    marginTop: 8,
    opacity: 0.8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
  },
  itemSeparator: {
    height: 12,
  },
  actionsContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 8,
  },
  viewAllButton: {
    width: '100%',
  },
})

export default ScannerScreen