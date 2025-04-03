// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { borderTopWidth: 0, justifyContent: 'space-around' },
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          let iconColor = focused ? 'black' : 'darkgray'; // Set active to black, inactive to darkgray

          if (route.name === 'home') {
            icon = <AntDesign name="home" size={size} color={iconColor} />;
          } else if (route.name === 'correlations') {
            icon = <Entypo name="line-graph" size={size} color={iconColor} />;
          } else if (route.name === 'addEntry') {
            icon = <EvilIcons name="plus" size={size+40} color={iconColor} />;
          } else if (route.name === 'viewEntries') {
            icon = <AntDesign name="profile" size={size} color={iconColor} />;
          } else if (route.name === 'chat') {
            icon = <Ionicons name="chatbox-outline" size={size} color={iconColor} />;
          }

          return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>{icon}</View>;
        },
        tabBarActiveTintColor: 'black', // Set active icon color to black
        tabBarInactiveTintColor: 'darkgray', // Set inactive icon color to darkgray
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="correlations" />
      <Tabs.Screen name="addEntry" />
      <Tabs.Screen name="viewEntries" />
      <Tabs.Screen name="chat" />
    </Tabs>
  );
}