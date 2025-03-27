import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs, router } from 'expo-router'
import React from 'react'
import { Appbar, Menu, Tooltip } from 'react-native-paper'
import { Locales, TabBar, TabsHeader } from '@/lib'

const TabLayout = () => {
  const [visible, setVisible] = React.useState(false)
  
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        header: (props) => <TabsHeader navProps={props} children={undefined} />,
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: Locales.t('titleHome'),
          headerRight: () => (
            <>
              <Tooltip title={Locales.t('search')}>
                <Appbar.Action
                  icon="magnify"
                  onPress={() => router.push('/search')}
                />
              </Tooltip>
              <Menu
                statusBarHeight={48}
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={
                  <Tooltip title={Locales.t('options')}>
                    <Appbar.Action
                      icon="dots-vertical"
                      onPress={() => setVisible(true)}
                    />
                  </Tooltip>
                }
              >
                <Menu.Item
                  title={Locales.t('stackNav')}
                  leadingIcon="card-multiple-outline"
                  onPress={() => router.push('/modal')}
                />
              </Menu>
            </>
          ),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? 'home' : 'home-outline'}
            />
          ),
        }}
      />
      
      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: Locales.t('profile'),
          headerRight: () => (
            <>
              <Tooltip title={Locales.t('search')}>
                <Appbar.Action
                  icon="magnify"
                  onPress={() => router.push('/search')}
                />
              </Tooltip>
            </>
          ),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? 'account' : 'account-outline'}
            />
          ),
        }}
      />
      
      {/* Barcode Scanner Tab (in the middle) */}
      <Tabs.Screen
        name="scanner"
        options={{
          title: 'Scan',
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? 'barcode-scan' : 'barcode-scan'}
            />
          ),
        }}
      />
      
      {/* Marketplace Tab */}
      <Tabs.Screen
        name="(marketplace)"
        options={{
          title: 'Marketplace',
          headerShown: false, // Hide the header at the tab level to avoid duplication
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? 'store' : 'store-outline'}
            />
          ),
        }}
      />
      
      {/* Listing Tab */}
      <Tabs.Screen
        name="listing"
        options={{
          title: 'Listing',
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? 'plus-circle' : 'plus-circle-outline'}
            />
          ),
        }}
      />
      
      {/* Checkout Tab */}
      <Tabs.Screen
        name="checkout"
        options={{
          title: 'Checkout',
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? 'cart' : 'cart-outline'}
            />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout
