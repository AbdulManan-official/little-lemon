import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();
export const AuthContext = React.createContext();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('onboarded')
      .then((v) => setOnboarded(v === 'true'))
      .finally(() => setLoading(false));
  }, []);

  const auth = {
    complete: async (profile) => {
      await AsyncStorage.multiSet([
        ['profile', JSON.stringify(profile)],
        ['onboarded', 'true'],
      ]);
      setOnboarded(true);
    },
    logout: async () => {
      await AsyncStorage.clear();
      setOnboarded(false);
    },
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#495E57" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={auth}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {onboarded ? (
              <>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Profile" component={Profile} />
              </>
            ) : (
              <Stack.Screen name="Onboarding" component={Onboarding} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
