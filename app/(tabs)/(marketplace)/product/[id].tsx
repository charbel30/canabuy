"use client"

import { useLocalSearchParams, useRouter } from "expo-router"
import { useState, useRef } from "react"
import { Image, ScrollView, StyleSheet, View, Animated, Dimensions, Pressable } from "react-native"
import { Button, Card, Divider, IconButton, Text, useTheme, Surface } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { GradientBackground } from "@/lib"
import { CanadianBadge } from "@/lib/ui/components/marketplace"

// Mock products data (in real app, this would come from a store/API)
const mockProducts = {
  "101": {
    id: "101",
    name: "Smart Speaker",
    description:
      "High-quality smart speaker designed and manufactured in Canada. Features voice control, premium sound, and seamless smart home integration.",
    price: 79.99,
    imageUrl: require("@/assets/images/products/electronics/smart-speaker.jpg"),
    canadianScore: 85,
    seller: {
      id: "s1",
      name: "TechNorth",
      location: "Ontario",
      isVerified: true,
    },
    features: ["Voice-activated controls", "Premium sound quality", "Smart home integration", "Made in Canada"],
    gallery: [
      require("@/assets/images/products/electronics/smart-speaker.jpg"),
      require("@/assets/images/products/electronics/smart-speaker.jpg"),
      require("@/assets/images/products/electronics/smart-speaker.jpg"),
    ],
  },
  "201": {
    id: "201",
    name: "Pure Canadian Maple Syrup",
    description:
      "Pure Canadian maple syrup harvested from Quebec maple forests. 100% natural and traditionally processed.",
    price: 19.99,
    imageUrl: require("@/assets/images/products/clothing/winter-jacket.jpg"),
    canadianScore: 95,
    seller: {
      id: "s2",
      name: "Canadian Delights",
      location: "Quebec",
      isVerified: true,
    },
    features: ["100% pure maple syrup", "Harvested in Quebec", "Traditional processing", "Grade A quality"],
    gallery: [
      require("@/assets/images/products/clothing/winter-jacket.jpg"),
      require("@/assets/images/products/clothing/winter-jacket.jpg"),
      require("@/assets/images/products/clothing/winter-jacket.jpg"),
    ],
  },
  "301": {
    id: "301",
    name: "Winter Down Jacket",
    description:
      "Premium winter jacket designed for extreme Canadian winters. Ethically sourced down filling and water-resistant exterior.",
    price: 199.99,
    imageUrl: require("@/assets/images/products/clothing/winter-jacket.jpg"),
    canadianScore: 90,
    seller: {
      id: "s3",
      name: "Northern Outfitters",
      location: "Alberta",
      isVerified: true,
    },
    features: [
      "Ethically sourced down filling",
      "Water-resistant exterior",
      "Designed for extreme cold",
      "Made in Canada",
    ],
    gallery: [
      require("@/assets/images/products/clothing/winter-jacket.jpg"),
      require("@/assets/images/products/clothing/winter-jacket.jpg"),
      require("@/assets/images/products/clothing/winter-jacket.jpg"),
    ],
  },
  "401": {
    id: "401",
    name: "Handcrafted Wooden Bowl",
    description:
      "Handcrafted by Canadian artisans using locally sourced maple wood. Each piece is unique with natural grain patterns.",
    price: 49.99,
    imageUrl: require("@/assets/images/products/clothing/winter-jacket.jpg"),
    canadianScore: 88,
    seller: {
      id: "s4",
      name: "Artisan Woodworks",
      location: "British Columbia",
      isVerified: true,
    },
    features: [
      "Handcrafted by local artisans",
      "Sustainably sourced maple wood",
      "Food-safe finish",
      "Each piece is unique",
    ],
    gallery: [
      require("@/assets/images/products/clothing/winter-jacket.jpg"),
      require("@/assets/images/products/clothing/winter-jacket.jpg"),
      require("@/assets/images/products/clothing/winter-jacket.jpg"),
    ],
  },
  "501": {
    id: "501",
    name: "Organic Blueberry Jam",
    description:
      "Made with wild Canadian blueberries harvested from pristine forests. No artificial preservatives or additives.",
    price: 12.99,
    imageUrl: require("@/assets/images/products/food/blueberry-jam.jpg"),
    canadianScore: 92,
    seller: {
      id: "s5",
      name: "Wild Harvest",
      location: "Nova Scotia",
      isVerified: true,
    },
    features: [
      "Wild Canadian blueberries",
      "No artificial preservatives",
      "Small-batch production",
      "Sustainable harvesting practices",
    ],
    gallery: [
      require("@/assets/images/products/food/blueberry-jam.jpg"),
      require("@/assets/images/products/food/blueberry-jam.jpg"),
      require("@/assets/images/products/food/blueberry-jam.jpg"),
    ],
  },
  "601": {
    id: "601",
    name: "Wireless Earbuds",
    description: "Premium wireless earbuds with noise cancellation and long battery life. Designed in Vancouver.",
    price: 129.99,
    imageUrl: require("@/assets/images/products/electronics/wireless-earbuds.jpg"),
    canadianScore: 82,
    seller: {
      id: "s6",
      name: "West Coast Audio",
      location: "British Columbia",
      isVerified: true,
    },
    features: ["Active noise cancellation", "Long battery life", "Water-resistant design", "Designed in Vancouver"],
    gallery: [
      require("@/assets/images/products/electronics/wireless-earbuds.jpg"),
      require("@/assets/images/products/electronics/wireless-earbuds.jpg"),
      require("@/assets/images/products/electronics/wireless-earbuds.jpg"),
    ],
  },
}

const ProductScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const theme = useTheme()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const product = mockProducts[id as keyof typeof mockProducts]

  const scrollY = useRef(new Animated.Value(0)).current
  const { width: screenWidth } = Dimensions.get("window")

  // Animation values
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200, 300],
    outputRange: [0, 0.8, 1],
    extrapolate: "clamp",
  })

  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [1.2, 1, 0.8],
    extrapolate: "clamp",
  })

  const imageTranslateY = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [0, 0, -50],
    extrapolate: "clamp",
  })

  if (!product) {
    return (
      <View style={styles.container}>
        <GradientBackground height="full" />
        <View style={styles.notFoundContainer}>
          <MaterialCommunityIcons name="alert-circle-outline" size={64} color={theme.colors.onSurfaceVariant} />
          <Text variant="headlineMedium" style={styles.notFoundText}>
            Product not found
          </Text>
          <Button mode="contained" onPress={() => router.back()} style={{ marginTop: 24 }}>
            Go Back
          </Button>
        </View>
      </View>
    )
  }

  // Format price with commas for thousands
  const formattedPrice = product.price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <View style={styles.container}>
      <GradientBackground height="full" />

      {/* Floating Header */}
      <Animated.View
        style={[
          styles.floatingHeader,
          {
            opacity: headerOpacity,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <Text variant="titleMedium" numberOfLines={1} style={styles.headerTitle}>
          {product.name}
        </Text>
        <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
          ${formattedPrice}
        </Text>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
      >
        {/* Product Image Gallery */}
        <View style={styles.imageGalleryContainer}>
          <Animated.View
            style={[
              styles.mainImageContainer,
              {
                transform: [{ scale: imageScale }, { translateY: imageTranslateY }],
              },
            ]}
          >
            <Image source={product.gallery[activeImageIndex]} style={styles.mainImage} resizeMode="cover" />

            {/* Wishlist Button */}
            <View style={styles.wishlistButtonContainer}>
              <IconButton
                icon={isWishlisted ? "heart" : "heart-outline"}
                iconColor={isWishlisted ? theme.colors.error : theme.colors.onSurfaceVariant}
                size={24}
                onPress={() => setIsWishlisted(!isWishlisted)}
                style={styles.wishlistButton}
                containerColor={theme.colors.surfaceVariant}
              />
            </View>

            {/* Canadian Badge */}
            <View style={styles.badgeContainer}>
              <CanadianBadge score={product.canadianScore} size="medium" />
            </View>
          </Animated.View>

          {/* Thumbnails */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailsContainer}
          >
            {product.gallery.map((image, index) => (
              <Pressable
                key={index}
                onPress={() => setActiveImageIndex(index)}
                style={[
                  styles.thumbnailContainer,
                  activeImageIndex === index && {
                    borderColor: theme.colors.primary,
                    borderWidth: 2,
                  },
                ]}
              >
                <Image source={image} style={styles.thumbnailImage} resizeMode="cover" />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Product Details */}
        <Surface style={[styles.detailsCard, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.productHeader}>
            <View style={styles.productTitleContainer}>
              <Text variant="headlineMedium" style={styles.productName}>
                {product.name}
              </Text>
              <Text variant="headlineSmall" style={[styles.price, { color: theme.colors.primary }]}>
                ${formattedPrice}
              </Text>
            </View>

            <View style={styles.sellerBadge}>
              <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                Sold by
              </Text>
              <View style={styles.sellerInfo}>
                <Text variant="labelLarge" style={{ fontWeight: "bold" }}>
                  {product.seller.name}
                </Text>
                {product.seller.isVerified && (
                  <MaterialCommunityIcons
                    name="check-decagram"
                    size={16}
                    color={theme.colors.primary}
                    style={{ marginLeft: 4 }}
                  />
                )}
              </View>
              <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>
                {product.seller.location}
              </Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          <Text variant="bodyLarge" style={styles.description}>
            {product.description}
          </Text>

          <View style={styles.quantityContainer}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Quantity
            </Text>
            <View style={styles.quantitySelector}>
              <IconButton
                icon="minus"
                size={20}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                style={styles.quantityButton}
                containerColor={theme.colors.surfaceVariant}
              />
              <Text variant="titleLarge" style={styles.quantityText}>
                {quantity}
              </Text>
              <IconButton
                icon="plus"
                size={20}
                onPress={() => setQuantity(quantity + 1)}
                style={styles.quantityButton}
                containerColor={theme.colors.surfaceVariant}
              />
            </View>
          </View>

          <Divider style={styles.divider} />

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Features
          </Text>
          <View style={styles.featuresContainer}>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={20}
                  color={theme.colors.primary}
                  style={styles.featureIcon}
                />
                <Text variant="bodyMedium" style={styles.featureText}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>

          <Divider style={styles.divider} />

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Seller Information
          </Text>
          <Card style={styles.sellerCard} elevation={2}>
            <Card.Content>
              <View style={styles.sellerHeader}>
                <View style={styles.sellerAvatar}>
                  <Text variant="headlineMedium" style={styles.sellerInitial}>
                    {product.seller.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.sellerDetails}>
                  <View style={styles.sellerNameContainer}>
                    <Text variant="titleMedium" style={styles.sellerName}>
                      {product.seller.name}
                    </Text>
                    {product.seller.isVerified && (
                      <MaterialCommunityIcons
                        name="check-decagram"
                        size={20}
                        color={theme.colors.primary}
                        style={{ marginLeft: 4 }}
                      />
                    )}
                  </View>
                  <Text variant="bodyMedium">Location: {product.seller.location}</Text>
                  <View style={styles.sellerRating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <MaterialCommunityIcons
                        key={star}
                        name={star <= 4 ? "star" : "star-outline"}
                        size={16}
                        color={star <= 4 ? theme.colors.primary : theme.colors.onSurfaceVariant}
                        style={{ marginRight: 2 }}
                      />
                    ))}
                    <Text variant="labelMedium" style={{ marginLeft: 4 }}>
                      4.0 (42 reviews)
                    </Text>
                  </View>
                </View>
              </View>
              <Button
                mode="outlined"
                onPress={() => console.log("View seller profile")}
                style={styles.viewSellerButton}
              >
                View Seller Profile
              </Button>
            </Card.Content>
          </Card>
        </Surface>
      </Animated.ScrollView>

      {/* Bottom Action Bar */}
      <Surface style={[styles.bottomBar, { backgroundColor: theme.colors.surface }]} elevation={4}>
        <View style={styles.totalPriceContainer}>
          <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            Total Price
          </Text>
          <Text variant="headlineSmall" style={{ color: theme.colors.primary, fontWeight: "bold" }}>
            ${(product.price * quantity).toFixed(2)}
          </Text>
        </View>
        <Button
          mode="contained"
          onPress={() => {
            // Handle add to cart
            console.log(`Added ${quantity} of ${product.name} to cart`)
          }}
          style={styles.addToCartButton}
          icon="cart-plus"
          contentStyle={{ height: 48 }}
          labelStyle={{ fontSize: 16, fontWeight: "bold" }}
        >
          Add to Cart
        </Button>
      </Surface>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  notFoundText: {
    marginTop: 16,
    textAlign: "center",
  },
  floatingHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    zIndex: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  headerTitle: {
    flex: 1,
    marginRight: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom bar
  },
  imageGalleryContainer: {
    backgroundColor: "transparent",
  },
  mainImageContainer: {
    width: "100%",
    height: 400,
    position: "relative",
  },
  mainImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f0f0",
  },
  wishlistButtonContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  wishlistButton: {
    margin: 0,
  },
  badgeContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    zIndex: 1,
  },
  thumbnailsContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "transparent",
  },
  thumbnailContainer: {
    width: 64,
    height: 64,
    marginRight: 8,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f0f0",
  },
  detailsCard: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    marginTop: -24,
    paddingBottom: 100, // Extra padding for bottom bar
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  productTitleContainer: {
    flex: 1,
    marginRight: 16,
  },
  productName: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontWeight: "bold",
  },
  sellerBadge: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
    alignItems: "center",
  },
  sellerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  divider: {
    marginVertical: 24,
  },
  description: {
    lineHeight: 24,
    marginBottom: 24,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    margin: 0,
  },
  quantityText: {
    marginHorizontal: 16,
    fontWeight: "bold",
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureIcon: {
    marginRight: 12,
  },
  featureText: {
    flex: 1,
  },
  sellerCard: {
    borderRadius: 16,
    marginTop: 8,
  },
  sellerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  sellerInitial: {
    fontWeight: "bold",
  },
  sellerDetails: {
    flex: 1,
  },
  sellerNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  sellerName: {
    fontWeight: "bold",
  },
  sellerRating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  viewSellerButton: {
    marginTop: 8,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  totalPriceContainer: {
    flex: 1,
  },
  addToCartButton: {
    height: 48,
    justifyContent: "center",
    borderRadius: 24,
    paddingHorizontal: 24,
  },
})

export default ProductScreen

