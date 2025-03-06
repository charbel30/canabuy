import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

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

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      paddingHorizontal: size === 'small' ? 6 : size === 'medium' ? 8 : 12,
      paddingVertical: size === 'small' ? 2 : size === 'medium' ? 4 : 6,
      borderRadius: size === 'small' ? 4 : size === 'medium' ? 6 : 8,
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
    <View style={styles.container}>
      <Text style={styles.text}>{score}%</Text>
      {showLabel && <Text style={styles.label}>Canadian</Text>}
      <MaterialCommunityIcons
        name="leaf-maple"
        size={size === 'small' ? 14 : size === 'medium' ? 16 : 20}
        color={theme.colors.onPrimary}
        style={styles.icon}
      />
    </View>
  )
}

export default CanadianBadge
