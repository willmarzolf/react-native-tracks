import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SignInScreen from './src/screens/SignInScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import AccountScreen from './src/screens/AccountScreen'
import TrackCreateScreen from './src/screens/TrackCreateScreen'
import TrackDetailScreen from './src/screens/TrackDetailScreen'
import TrackListScreen from './src/screens/TrackListScreen'
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

import { Provider as AuthProvider, Context as AuthContext } from './src/context/AuthContext';
import { navigationRef } from './src/RootNavigation';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
  </AuthStack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    tabBarPosition='bottom'
    screenOptions={{
      tabBarStyle: { backgroundColor: 'black' },
      tabBarLabelStyle: { fontSize: 14, color: '#fff' },
      tabBarIndicatorStyle: { backgroundColor: '#fff' },
    }}
  >
    <Tab.Screen name="TrackList" component={TrackListScreen} />
    <Tab.Screen name="CreateTrack" component={TrackCreateScreen} />
    <Tab.Screen name="Account" component={AccountScreen} />
  </Tab.Navigator>
)

const MainNavigator = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
    <MainStack.Screen name="Tabs" component={TabNavigator} />
    <MainStack.Screen name="TrackDetail" component={TrackDetailScreen} />
  </MainStack.Navigator>
);

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const { state, tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin()
  }, [])

  return <NavigationContainer>
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      { state.loading ? (
        <RootStack.Screen name="ResolveAuth" component={ResolveAuthScreen} />
      ) : state.token ? (
        <RootStack.Screen name="Main" component={MainNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      )} 
    </RootStack.Navigator>
  </NavigationContainer>

}

export default function App() {
  return (
    <AuthProvider>
        <RootNavigator ref={navigationRef} />
    </AuthProvider>
  )
}