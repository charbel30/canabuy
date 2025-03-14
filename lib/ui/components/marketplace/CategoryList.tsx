import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, View, Pressable, Animated } from 'react-native'
import { Surface, Text, useTheme } from 'react-native-paper'

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
  category: Category;
  onPress: () => void;
  theme: any;
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
    <Animated.View
      style={[
        styles.cardContainer,
        { transform: [{ scale: scaleAnim }] }
      ]}
    >
      <Surface
        style={[
          styles.card,
          { backgroundColor: theme.colors.surfaceVariant }
        ]}
        elevation={3}
      >
        <Pressable
          android_ripple={{ color: theme.colors.surfaceVariant }}
          style={({ pressed }) => [
            styles.pressable,
            { opacity: pressed ? 0.8 : 1 }
          ]}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={
                category.icon as keyof typeof MaterialCommunityIcons.glyphMap
              }
              size={32}
              color={theme.colors.primary}
            />
          </View>
          <View style={styles.textContainer}>
            <Text 
              variant="labelLarge" 
              style={[styles.name, { color: theme.colors.onSurfaceVariant }]}
              numberOfLines={1}
            >
              {category.name}
            </Text>
            <Text
              variant="labelSmall"
              style={{ color: theme.colors.onSurfaceVariant, opacity: 0.8 }}
            >
              {category.productCount} items
            </Text>
          </View>
        </Pressable>
      </Surface>
    </Animated.View>
  )
}

const CategoryList: React.FC<CategoryListProps> = ({ 
  categories,
  onCategoryPress = (id) => router.push(`/category/${id}`)
}) => {
  const theme = useTheme()

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      decelerationRate="fast"
      snapToInterval={122} // card width + margin
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
    padding: 8,
    paddingBottom: 16,
  },
  cardContainer: {
    marginHorizontal: 6,
  },
  card: {
    width: 110,
    borderRadius: 16,
    overflow: 'hidden',
    height: 110,
  },
  pressable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  iconContainer: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    padding: 8,
    paddingTop: 0,
    alignItems: 'center',
  },
  name: {
    textAlign: 'center',
    marginBottom: 2,
    fontWeight: 'bold',
  },
})

export default CategoryList
