import { Stack } from 'expo-router'
import React from 'react'

const MarketplaceLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Use the tab header instead
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="search" />
      <Stack.Screen
        name="category/[id]"
        options={{
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="product/[id]"
        options={{
          presentation: 'card',
        }}
      />
    </Stack>
  )
}

export default MarketplaceLayout
