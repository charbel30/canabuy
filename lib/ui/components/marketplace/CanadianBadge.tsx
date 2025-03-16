"use client"

import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"
import { StyleSheet, Animated } from "react-native"
import { Text, useTheme, Surface } from "react-native-paper"

interface CanadianBadgeProps {
  score: number
  size?: "small" | "medium" | "large"
  showLabel?: boolean
}

const CanadianBadge: React.FC<CanadianBadgeProps> = ({ score, size = "medium", showLabel = true }) => {
  const theme = useTheme()
  const pulseAnim = React.useRef(new Animated.Value(1)).current
  const rotateAnim = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    // Create a subtle pulse animation for high scores
    if (score >= 90) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start()

      // Add a subtle rotation animation for the maple leaf
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 0.05,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: -0.05,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ).start()
    }
  }, [score, pulseAnim, rotateAnim])

  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 90) return theme.colors.primary // Excellent - maple red
    if (score >= 75) return theme.colors.secondary // Good - forest green
    if (score >= 60) return theme.colors.tertiary // Average - lake blue
    return theme.colors.surfaceVariant // Below average - neutral
  }

  const badgeColor = getScoreColor()

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: badgeColor,
      paddingHorizontal: size === "small" ? 6 : size === "medium" ? 10 : 14,
      paddingVertical: size === "small" ? 3 : size === "medium" ? 5 : 7,
      borderRadius: 20,
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    text: {
      color: theme.colors.onPrimary,
      fontWeight: "bold",
      fontSize: size === "small" ? 12 : size === "medium" ? 14 : 16,
    },
    label: {
      color: theme.colors.onPrimary,
      marginLeft: 4,
      fontSize: size === "small" ? 10 : size === "medium" ? 12 : 14,
      fontWeight: "500",
    },
    iconContainer: {
      marginLeft: 4,
    },
  })

  return (
    <Animated.View style={[{ transform: [{ scale: score >= 90 ? pulseAnim : 1 }] }]}>
      <Surface style={[styles.container, { elevation: 4 }]}>
        <Text style={styles.text}>{score}%</Text>
        {showLabel && <Text style={styles.label}>Canadian</Text>}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [
                {
                  rotate: rotateAnim.interpolate({
                    inputRange: [-0.05, 0, 0.05],
                    outputRange: ["-5deg", "0deg", "5deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <MaterialCommunityIcons
            name="leaf-maple"
            size={size === "small" ? 14 : size === "medium" ? 16 : 20}
            color={theme.colors.onPrimary}
          />
        </Animated.View>
      </Surface>
    </Animated.View>
  )
}

export default CanadianBadge

