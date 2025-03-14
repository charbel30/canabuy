import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import { Text, useTheme, Surface } from 'react-native-paper'

interface CanadianBadgeProps {
  score: number
  size?: 'small' | 'medium' | 'large'
  showLabel?: boolean
}

const CanadianBadge: React.FC<CanadianBadgeProps> = ({
  score,
  size = 'medium',
  showLabel = true,
}) => {
  const theme = useTheme()
  const pulseAnim = React.useRef(new Animated.Value(1)).current
  
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
        ])
      ).start()
    }
  }, [score, pulseAnim])
  
  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 90) return theme.colors.primary; // Excellent - maple red
    if (score >= 75) return theme.colors.secondary; // Good - forest green
    if (score >= 60) return theme.colors.tertiary; // Average - lake blue
    return theme.colors.surfaceVariant; // Below average - neutral
  };
  
  const badgeColor = getScoreColor();
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: badgeColor,
      paddingHorizontal: size === 'small' ? 6 : size === 'medium' ? 8 : 12,
      paddingVertical: size === 'small' ? 2 : size === 'medium' ? 4 : 6,
      borderRadius: 16, // More rounded for modern look
      elevation: 4,
    },
    text: {
      color: theme.colors.onPrimary,
      fontWeight: 'bold',
      fontSize: size === 'small' ? 12 : size === 'medium' ? 14 : 16,
    },
    label: {
      color: theme.colors.onPrimary,
      marginLeft: 4,
      fontSize: size === 'small' ? 10 : size === 'medium' ? 12 : 14,
    },
    icon: {
      marginLeft: 4,
    },
  })

  return (
    <Animated.View
      style={[
        { transform: [{ scale: score >= 90 ? pulseAnim : 1 }] }
      ]}
    >
      <Surface style={[styles.container, { elevation: 4 }]}>
        <Text style={styles.text}>{score}%</Text>
        {showLabel && <Text style={styles.label}>Canadian</Text>}
        <MaterialCommunityIcons
          name="leaf-maple"
          size={size === 'small' ? 14 : size === 'medium' ? 16 : 20}
          color={theme.colors.onPrimary}
          style={styles.icon}
        />
      </Surface>
    </Animated.View>
  )
}

export default CanadianBadge
