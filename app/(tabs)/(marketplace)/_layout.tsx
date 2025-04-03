import { Stack, router } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'
import { useTheme, IconButton, Tooltip } from 'react-native-paper'

import { StackHeader } from '@/lib'

const MarketplaceLayout = () => {
  const theme = useTheme()

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: (props) => (
          <StackHeader navProps={props} children={undefined} />
        ),
        animation: Platform.OS === 'ios' ? 'default' : 'fade_from_bottom',
        animationDuration: 200,
        presentation: 'transparentModal',
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Marketplace',
          headerBackButtonDisplayMode: 'minimal',
          headerShown: true,
          headerRight: () => (
            <>
              <Tooltip title="Search">
                <IconButton
                  icon="magnify"
                  onPress={() => router.push('/(tabs)/(marketplace)/search')}
                />
              </Tooltip>
              <Tooltip title="Checkout">
`                <IconButton
                  icon="cart"
                  onPress={() => router.push('/(tabs)/(marketplace)/checkout')}
                />`
              </Tooltip>
            </>
          ),
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          title: 'Search',
          presentation: 'transparentModal',
          animation: Platform.OS === 'ios' ? 'default' : 'fade_from_bottom',
        }}
      />
      <Stack.Screen
        name="category/[id]"
        options={{
          title: 'Category',
          presentation: 'transparentModal',
          animation: Platform.OS === 'ios' ? 'default' : 'fade_from_bottom',
          headerRight: () => (
            <>
              <IconButton
                icon="heart-outline"
                onPress={() => console.log('View wishlist')}
              />
              <IconButton
                icon="dots-vertical"
                onPress={() => console.log('Open menu')}
              />
            </>
          ),
        }}
      />
      <Stack.Screen
        name="product/[id]"
        options={{
          title: 'Product Details',
          presentation: 'transparentModal',
          animation: Platform.OS === 'ios' ? 'default' : 'fade_from_bottom',
          headerRight: () => (
            <>
              <IconButton
                icon="heart-outline"
                onPress={() => console.log('Add to wishlist')}
              />
              <IconButton
                icon="share-variant"
                onPress={() => console.log('Share product')}
              />
            </>
          ),
        }}
      />
    </Stack>
  )
}

export default MarketplaceLayout
