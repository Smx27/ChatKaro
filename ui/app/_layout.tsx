import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { useColorScheme } from "@/components/useColorScheme";
import Fonts from "@/constants/Fonts";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Regular : require('@/assets/fonts/Mulish-Regular.ttf'),
    SemiBold : require('@/assets/fonts/Mulish-SemiBold.ttf'),
    Bold : require('@/assets/fonts/Mulish-Bold.ttf'),
    ExtraBold : require('@/assets/fonts/Mulish-ExtraBold.ttf'),
    Light : require('@/assets/fonts/Mulish-Light.ttf'),
    Medium : require('@/assets/fonts/Mulish-Medium.ttf'),
    ...FontAwesome.font,
    
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}
      <StatusBar style={"auto"} />
      <RootLayoutNav />
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(routes)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
