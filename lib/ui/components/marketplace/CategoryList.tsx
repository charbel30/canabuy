import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Card, Text, useTheme } from 'react-native-paper'


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
    >
      {categories.map((category) => (
        <Card
          key={category.id}
          style={styles.card}
          onPress={() => onCategoryPress(category.id)}
        >
          <View style={styles.content}>
            <MaterialCommunityIcons
              name={
                category.icon as keyof typeof MaterialCommunityIcons.glyphMap
              }
              size={32}
              color={theme.colors.primary}
            />
            <Text variant="titleMedium" style={styles.name}>
              {category.name}
            </Text>
            <Text
              variant="bodySmall"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {category.productCount} products
            </Text>
          </View>
        </Card>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  card: {
    marginHorizontal: 4,
    width: 120,
  },
  content: {
    padding: 12,
    alignItems: 'center',
  },
  name: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
})

export default CategoryList
