import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import WelcomeScreen from '../screens/WelcomeScreen'
import RegistroScreen from '../screens/RegistroScreen'
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import PerfilScreen from '../screens/PerfilScreen'
import PartidasScreen from '../screens/PartidasScreen'
import RankingScreen from '../screens/RankingScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MenuTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#071019',
          borderTopColor: '#1c2833',
          height: 65
        },
        tabBarActiveTintColor: '#d6b47a',
        tabBarInactiveTintColor: '#cfcfcf'
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          )
        }}
      />

      <Tab.Screen
        name="Partida"
        component={PartidasScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person"
              size={size}
              color={color}
            />
          )
        }}
      />

      <Tab.Screen
        name="Ranking"
        component={RankingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="shield"
              size={size}
              color={color}
            />
          )
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-circle"
              size={size}
              color={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Registro"
          component={RegistroScreen}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Menu"
          component={MenuTabs}
          options={{
            headerShown: false
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}