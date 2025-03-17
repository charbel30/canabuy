"use client"

import React from "react"
import { StyleSheet, View, useWindowDimensions } from "react-native"
import { useTheme } from "react-native-paper"
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from "react-native-reanimated"

interface GradientBackgroundProps {
  height?: "full" | "half" | "quarter" | number
  animated?: boolean
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ height = "quarter", animated = true }) => {
  const theme = useTheme()
  const { width, height: screenHeight } = useWindowDimensions()

  // Calculate height based on prop
  const getHeight = () => {
    if (typeof height === "number") return height
    if (height === "full") return screenHeight
    if (height === "half") return screenHeight / 2
    return screenHeight / 4 // quarter
  }

  // Animation values
  const rotation = useSharedValue(0)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  React.useEffect(() => {
    if (animated) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 60000, easing: Easing.linear }),
        -1, // infinite repeat
        false,
      )

      translateX.value = withRepeat(
        withTiming(width * 0.05, { duration: 15000, easing: Easing.inOut(Easing.sin) }),
        -1,
        true, // reverse
      )

      translateY.value = withRepeat(
        withTiming(width * 0.05, { duration: 20000, easing: Easing.inOut(Easing.sin) }),
        -1,
        true, // reverse
      )
    }
  }, [animated, rotation, translateX, translateY, width])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    }
  })

  return (
    <View style={[styles.container, { height: getHeight() }]}>
      <View style={[styles.background, { backgroundColor: theme.colors.background }]} />

      {animated && (
        <Animated.View
          style={[
            styles.gradientBlob,
            {
              backgroundColor: theme.colors.primaryContainer,
              opacity: 0.4,
            },
            animatedStyle,
          ]}
        />
      )}

      <View
        style={[
          styles.gradientOverlay,
          {
            backgroundColor: theme.colors.background,
            height: getHeight() * 0.7,
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  gradientBlob: {
    position: "absolute",
    width: 600,
    height: 600,
    borderRadius: 300,
    top: -300,
    left: -100,
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
})

export default GradientBackground

