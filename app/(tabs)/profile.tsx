"use client"

import { router } from "expo-router"
import { useState } from "react"
import { View, StyleSheet, ScrollView, Image, StatusBar } from "react-native"
import { Button, Surface, Text, Avatar, Card, Divider, List, Switch, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { styles } from "@/lib"
import { GradientBackground } from "@/lib"
import {
  User,
  CreditCard,
  MapPin,
  Bell,
  Moon,
  Globe,
  HelpCircle,
  Info,
  Shield,
  LogOut,
  ShoppingBag,
  Tag,
  BarChart4,
} from "lucide-react-native"

const Profile = () => {
  const theme = useTheme()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)

  const handleLogin = () => {
    router.push("/(auth)/login")
  }

  const handleSignup = () => {
    router.push("/(auth)/signup")
  }

  // For demo purposes only
  const handleDemoLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <Surface style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <GradientBackground height="half" />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={localStyles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >

            <View style={localStyles.container}>
              {/* Profile Header */}
              <Card style={localStyles.profileHeaderCard} mode="elevated">
                <Card.Content style={localStyles.profileHeader}>
                  <Avatar.Image size={100} source={require("@/assets/images/avatar.png")} style={localStyles.avatar} />
                  <Text variant="headlineMedium" style={localStyles.userName}>
                    Jane Doe
                  </Text>
                  <Text variant="bodyLarge" style={localStyles.userEmail}>
                    jane.doe@example.com
                  </Text>

                  <View style={localStyles.statsContainer}>
                    <View style={localStyles.statItem}>
                      <View style={localStyles.statIconContainer}>
                        <ShoppingBag size={20} color={theme.colors.primary} />
                      </View>
                      <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
                        12
                      </Text>
                      <Text variant="bodySmall">Orders</Text>
                    </View>
                    <Divider style={localStyles.verticalDivider} />
                    <View style={localStyles.statItem}>
                      <View style={localStyles.statIconContainer}>
                        <Tag size={20} color={theme.colors.primary} />
                      </View>
                      <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
                        4
                      </Text>
                      <Text variant="bodySmall">Listings</Text>
                    </View>
                    <Divider style={localStyles.verticalDivider} />
                    <View style={localStyles.statItem}>
                      <View style={localStyles.statIconContainer}>
                        <BarChart4 size={20} color={theme.colors.primary} />
                      </View>
                      <Text variant="titleLarge" style={{ color: theme.colors.primary }}>
                        95%
                      </Text>
                      <Text variant="bodySmall">Canadian</Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>

              {/* Account Settings */}
              <Card style={localStyles.card} mode="elevated">
                <Card.Title title="Account Settings" titleStyle={localStyles.cardTitle} />
                <Card.Content style={localStyles.cardContent}>
                  <List.Item
                    title="Edit Profile"
                    left={(props) => <User {...props} size={24} color={theme.colors.primary} />}
                    right={(props) => <List.Icon {...props} icon="chevron-right" />}
                    onPress={() => console.log("Edit profile")}
                    style={localStyles.listItem}
                  />
                  <Divider />
                  <List.Item
                    title="Payment Methods"
                    left={(props) => <CreditCard {...props} size={24} color={theme.colors.primary} />}
                    right={(props) => <List.Icon {...props} icon="chevron-right" />}
                    onPress={() => console.log("Payment methods")}
                    style={localStyles.listItem}
                  />
                  <Divider />
                  <List.Item
                    title="Address Book"
                    left={(props) => <MapPin {...props} size={24} color={theme.colors.primary} />}
                    right={(props) => <List.Icon {...props} icon="chevron-right" />}
                    onPress={() => console.log("Address book")}
                    style={localStyles.listItem}
                  />
                </Card.Content>
              </Card>

              {/* Preferences */}
              <Card style={localStyles.card} mode="elevated">
                <Card.Title title="Preferences" titleStyle={localStyles.cardTitle} />
                <Card.Content style={localStyles.cardContent}>
                  <List.Item
                    title="Notifications"
                    left={(props) => <Bell {...props} size={24} color={theme.colors.primary} />}
                    right={() => (
                      <Switch
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                        color={theme.colors.primary}
                      />
                    )}
                    style={localStyles.listItem}
                  />
                  <Divider />
                  <List.Item
                    title="Dark Mode"
                    left={(props) => <Moon {...props} size={24} color={theme.colors.primary} />}
                    right={() => (
                      <Switch value={darkModeEnabled} onValueChange={setDarkModeEnabled} color={theme.colors.primary} />
                    )}
                    style={localStyles.listItem}
                  />
                  <Divider />
                  <List.Item
                    title="Language"
                    description="English"
                    left={(props) => <Globe {...props} size={24} color={theme.colors.primary} />}
                    right={(props) => <List.Icon {...props} icon="chevron-right" />}
                    onPress={() => console.log("Language settings")}
                    style={localStyles.listItem}
                  />
                </Card.Content>
              </Card>

              {/* Support */}
              <Card style={localStyles.card} mode="elevated">
                <Card.Title title="Support" titleStyle={localStyles.cardTitle} />
                <Card.Content style={localStyles.cardContent}>
                  <List.Item
                    title="Help Center"
                    left={(props) => <HelpCircle {...props} size={24} color={theme.colors.primary} />}
                    right={(props) => <List.Icon {...props} icon="chevron-right" />}
                    onPress={() => console.log("Help center")}
                    style={localStyles.listItem}
                  />
                  <Divider />
                  <List.Item
                    title="About CanaBuy"
                    left={(props) => <Info {...props} size={24} color={theme.colors.primary} />}
                    right={(props) => <List.Icon {...props} icon="chevron-right" />}
                    onPress={() => console.log("About")}
                    style={localStyles.listItem}
                  />
                  <Divider />
                  <List.Item
                    title="Privacy Policy"
                    left={(props) => <Shield {...props} size={24} color={theme.colors.primary} />}
                    right={(props) => <List.Icon {...props} icon="chevron-right" />}
                    onPress={() => console.log("Privacy policy")}
                    style={localStyles.listItem}
                  />
                </Card.Content>
              </Card>

              <Button
                mode="outlined"
                icon={(props) => <LogOut {...props} size={20} />}
                style={localStyles.logoutButton}
                contentStyle={{ height: 50 }}
                onPress={handleLogout}
              >
                Log Out
              </Button>
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
  container: {
    padding: 16,
  },
  profileHeaderCard: {
    marginBottom: 16,
    elevation: 3,
    borderRadius: 12,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 16,
  },
  avatar: {
    marginBottom: 16,
    elevation: 4,
  },
  userName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  userEmail: {
    opacity: 0.7,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 16,
    paddingHorizontal: 8,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  verticalDivider: {
    height: "100%",
    width: 1,
  },
  card: {
    marginBottom: 16,
    elevation: 3,
    borderRadius: 12,
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardContent: {
    padding: 0,
  },
  listItem: {
    paddingVertical: 12,
  },
  benefitItem: {
    paddingVertical: 12,
  },
  logoutButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  loginContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  loginTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  loginSubtitle: {
    textAlign: "center",
    marginBottom: 24,
    opacity: 0.8,
    paddingHorizontal: 16,
  },
  loginCard: {
    width: "100%",
    marginBottom: 24,
    elevation: 3,
    borderRadius: 12,
  },
  loginCardContent: {
    padding: 16,
  },
  authButton: {
    marginBottom: 16,
  },
  demoButton: {
    marginTop: 8,
  },
  benefitsCard: {
    width: "100%",
    marginBottom: 16,
    elevation: 3,
    borderRadius: 12,
  },
  benefitsCardContent: {
    padding: 0,
  },
  divider: {
    marginVertical: 16,
  },
})

export default Profile

