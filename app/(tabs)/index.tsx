import { router } from "expo-router"
import { View, ScrollView, StyleSheet, Image, StatusBar } from "react-native"
import { Surface, Text, Button, Card, Divider, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { styles, GradientBackground } from "@/lib"
import { ShoppingBag, Tag, BarChart4 } from "lucide-react-native"

const TabsHome = () => {
  const theme = useTheme()

  return (
    <Surface style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <GradientBackground height="half" />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={localStyles.scrollView}
          contentContainerStyle={localStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Header */}
          <View style={localStyles.headerContainer}>
            <Image source={require("@/assets/images/icon.png")} style={localStyles.logo} />
            <Text variant="headlineLarge" style={[localStyles.welcomeTitle, { color: theme.colors.primary }]}>
              Welcome to CanaBuy
            </Text>
            <Text variant="bodyLarge" style={localStyles.welcomeSubtitle}>
              Your gateway to Canadian excellence
            </Text>
          </View>

          {/* Quick Access Section */}
          <View style={localStyles.sectionContainer}>
            <Text variant="titleMedium" style={localStyles.sectionTitle}>
              Quick Access
            </Text>
            <View style={localStyles.quickAccessContainer}>
              <Card
                style={localStyles.quickAccessCard}
                mode="elevated"
                onPress={() => router.push("/(tabs)/(marketplace)")}
              >
                <Card.Content style={localStyles.cardContent}>
                  <ShoppingBag size={24} color={theme.colors.primary} />
                  <Text variant="titleMedium" style={localStyles.cardTitle}>
                    Browse Products
                  </Text>
                  <Text variant="bodyMedium">Discover Canadian products</Text>
                </Card.Content>
              </Card>
              <Card style={localStyles.quickAccessCard} mode="elevated" onPress={() => router.push("/(tabs)/listing")}>
                <Card.Content style={localStyles.cardContent}>
                  <Tag size={24} color={theme.colors.primary} />
                  <Text variant="titleMedium" style={localStyles.cardTitle}>
                    Sell Items
                  </Text>
                  <Text variant="bodyMedium">List your Canadian products</Text>
                </Card.Content>
              </Card>
            </View>
          </View>

          {/* About Section */}
          <View style={localStyles.sectionContainer}>
            <Text variant="titleMedium" style={localStyles.sectionTitle}>
              About CanaBuy
            </Text>
            <Card style={localStyles.aboutCard} mode="elevated">
              <Card.Content>
                <Text variant="bodyMedium" style={localStyles.aboutText}>
                  CanaBuy helps you find and purchase Canadian products easily. Scan barcodes to verify Canadian
                  products, discover local alternatives to foreign goods, and support the Canadian economy.
                </Text>
                <View style={localStyles.statsContainer}>
                  <View style={localStyles.statItem}>
                    <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
                      1000+
                    </Text>
                    <Text variant="bodySmall">Canadian Products</Text>
                  </View>
                  <Divider style={localStyles.verticalDivider} />
                  <View style={localStyles.statItem}>
                    <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
                      500+
                    </Text>
                    <Text variant="bodySmall">Canadian Sellers</Text>
                  </View>
                  <Divider style={localStyles.verticalDivider} />
                  <View style={localStyles.statItem}>
                    <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
                      10K+
                    </Text>
                    <Text variant="bodySmall">Happy Users</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>

          {/* Featured Section */}
          <View style={localStyles.sectionContainer}>
            <Text variant="titleMedium" style={localStyles.sectionTitle}>
              Featured
            </Text>
            <Card style={localStyles.featuredCard} mode="elevated">
              <Card.Cover
                source={require("@/assets/images/products/food/blueberry-jam.jpg")}
                style={localStyles.featuredImage}
              />
              <Card.Content style={localStyles.featuredContent}>
                <Text variant="titleMedium" style={localStyles.cardTitle}>
                  Scan & Discover
                </Text>
                <Text variant="bodyMedium" style={localStyles.featuredText}>
                  Use our barcode scanner to instantly verify if a product is Canadian and find similar local
                  alternatives.
                </Text>
                <Button
                  mode="contained"
                  style={localStyles.featuredButton}
                  contentStyle={{ height: 50 }}
                  onPress={() => console.log("Open scanner")}
                >
                  Try Scanner
                </Button>
              </Card.Content>
            </Card>
          </View>

          {/* Trending Products */}
          <View style={localStyles.sectionContainer}>
            <Text variant="titleMedium" style={localStyles.sectionTitle}>
              Trending Products
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={localStyles.trendingScrollContent}
            >
              {[1, 2, 3, 4].map((item) => (
                <Card key={item} style={localStyles.trendingCard} mode="elevated">
                  <Card.Cover
                    source={require("@/assets/images/products/food/blueberry-jam.jpg")}
                    style={localStyles.trendingImage}
                  />
                  <Card.Content>
                    <Text variant="titleSmall" numberOfLines={1}>
                      Canadian Product {item}
                    </Text>
                    <Text variant="bodySmall" style={{ color: theme.colors.primary }}>
                      $24.99
                    </Text>
                  </Card.Content>
                </Card>
              ))}
            </ScrollView>
          </View>

          {/* Canadian Score */}
          <View style={localStyles.sectionContainer}>
            <Card style={localStyles.scoreCard} mode="elevated">
              <Card.Content style={localStyles.scoreContent}>
                <View style={localStyles.scoreTextContainer}>
                  <Text variant="titleMedium" style={localStyles.cardTitle}>
                    Your Canadian Score
                  </Text>
                  <Text variant="bodyMedium">
                    Track how much you're supporting the Canadian economy with your purchases
                  </Text>
                  <Button mode="outlined" style={{ marginTop: 12 }} onPress={() => console.log("View score details")}>
                    View Details
                  </Button>
                </View>
                <View style={localStyles.scoreCircle}>
                  <Text variant="headlineLarge" style={{ color: theme.colors.primary }}>
                    78%
                  </Text>
                  <BarChart4 size={24} color={theme.colors.primary} />
                </View>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Surface>
  )
}

const localStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  welcomeTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    textAlign: "center",
    opacity: 0.8,
  },
  sectionContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 8,
  },
  quickAccessContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickAccessCard: {
    width: "48%",
    elevation: 3,
  },
  cardContent: {
    minHeight: 120,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  cardTitle: {
    fontWeight: "bold",
    marginVertical: 8,
  },
  aboutCard: {
    elevation: 3,
  },
  aboutText: {
    marginBottom: 16,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingVertical: 8,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  verticalDivider: {
    height: "100%",
    width: 1,
  },
  featuredCard: {
    elevation: 3,
  },
  featuredImage: {
    height: 180,
  },
  featuredContent: {
    padding: 16,
  },
  featuredText: {
    marginVertical: 12,
  },
  featuredButton: {
    marginTop: 8,
  },
  trendingScrollContent: {
    paddingRight: 16,
  },
  trendingCard: {
    width: 160,
    marginRight: 12,
    elevation: 3,
  },
  trendingImage: {
    height: 120,
  },
  scoreCard: {
    elevation: 3,
    marginBottom: 16,
  },
  scoreContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  scoreTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ddd",
  },
})

export default TabsHome

