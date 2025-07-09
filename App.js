import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { PickupProvider } from './contexts/PickupContext';

// Import screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import OTPScreen from './screens/OTPScreen';
import DashboardScreen from './screens/DashboardScreen';
import SchedulePickupScreen from './screens/SchedulePickupScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PickupProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2E7D32',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="OTP" 
            component={OTPScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Dashboard" 
            component={DashboardScreen} 
            options={{ 
              title: 'EpiCircle',
              headerLeft: null,
              gestureEnabled: false
            }}
          />
          <Stack.Screen 
            name="SchedulePickup" 
            component={SchedulePickupScreen} 
            options={{ title: 'Schedule Pickup' }}
          />
          <Stack.Screen 
            name="OrderHistory" 
            component={OrderHistoryScreen} 
            options={{ title: 'Order History' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PickupProvider>
  );
} 