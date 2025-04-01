import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import CustomHeader from '@/components/custom/customHeader';
import { useColorScheme } from '@/hooks/useColorScheme';
import "../global.css";
import ActiveLists from '../components/custom/activeList'
import {ListProvider} from '@/context/listContent';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
<ListProvider>
    <ThemeProvider value={DefaultTheme}>
      <Stack>
      
        <Stack.Screen
          name="(tabs)"
          options={{ header: () => <CustomHeader title="Smith Homes" /> }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </ListProvider>
  );
}
