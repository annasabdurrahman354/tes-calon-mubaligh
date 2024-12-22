import { Tabs } from 'expo-router'
import React from 'react'
import * as HeroIconsOutline from "react-native-heroicons/outline";
import * as HeroIconsSolid from "react-native-heroicons/solid";
import { Locales, TabBar, TabsHeader } from '@/lib'
import { useTheme } from 'react-native-paper'

const TabLayout = () => {
  const theme = useTheme();
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: Locales.t('titleHome'),
          tabBarIcon: (props) => (
            props.focused ? 
            <HeroIconsSolid.HomeIcon {...props} size={props.size} color={props.color} /> : 
            <HeroIconsOutline.HomeIcon {...props} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: Locales.t('profile'),
          tabBarIcon: (props) => (
            props.focused ? <HeroIconsSolid.Squares2X2Icon {...props} size={props.size} color={props.color}/> : 
            <HeroIconsOutline.Squares2X2Icon {...props} size={props.size} color={props.color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: Locales.t('titleSettings'),
          tabBarIcon: (props) => (
            props.focused ? <HeroIconsSolid.UserIcon {...props} size={props.size} color={props.color}/> : 
            <HeroIconsOutline.UserIcon {...props} size={props.size} color={props.color}/>
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout
