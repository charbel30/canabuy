"use client"

import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import React from "react"
import { ScrollView, StyleSheet, View, Pressable, Animated } from "react-native"
import { Surface, Text, useTheme } from "react-native-paper"

interface Category {
  id: string
  name: string
  icon: string
  productCount: number
}

interface CategoryListProps {
  categories: Category[]
  onCategoryPress?: (categoryId: string) => void
}
const CategoryItem: React.FC<{
  category: Category
  onPress: () => void
  theme: any
}> = ({ category, onPress, theme }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }).start()
  }

  return (
    <View
      style={[
        styles.cardContainer,
        {
          shadowOpacity: 0.15,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          shadowColor: "#000",
        },
      ]}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        <Surface
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surfaceVariant,
              borderColor: theme.colors.outline,
            },
          ]}
          elevation={2}
        >
          <Pressable
            android_ripple={{ color: theme.colors.surfaceVariant }}
            style={({ pressed }) => [styles.pressable, { opacity: pressed ? 0.8 : 1 }]}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            {/* Rest of your component remains the same */}
            <View style={styles.iconContainer}>
              <View style={[styles.iconBackground, { backgroundColor: theme.colors.primaryContainer }]}>
                <MaterialCommunityIcons
                  name={category.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                  size={32}
                  color={theme.colors.primary}
                />
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text
                variant="labelLarge"
                style={[styles.name, { color: theme.colors.onSurfaceVariant }]}
                numberOfLines={1}
              >
                {category.name}
              </Text>
              <Text variant="labelSmall" style={[styles.count, { color: theme.colors.onSurfaceVariant }]}>
                {category.productCount} items
              </Text>
            </View>
          </Pressable>
        </Surface>
      </Animated.View>
    </View>
  )
}
const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onCategoryPress = (id) => router.push(`/(tabs)/(marketplace)/category/${id}`),
}) => {
  const theme = useTheme()

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      decelerationRate="fast"
      snapToInterval={130} // card width + margin
      snapToAlignment="center"
    >
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          onPress={() => onCategoryPress(category.id)}
          theme={theme}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  cardContainer: {
    marginHorizontal: 6,
  },
  card: {
    width: 118,
    borderRadius: 20,
    overflow: "hidden",
    height: 130,
    borderWidth: 0.5,
  },
  pressable: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  iconBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
  },
  name: {
    textAlign: "center",
    marginBottom: 2,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  count: {
    textAlign: "center",
    opacity: 0.8,
  },
})

export default CategoryList
