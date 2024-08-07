import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/components/useColorScheme";
import { AsyncStorageService as cache } from "@/services/AsyncStorage";
import { INITIAL_USER_DATA_KEY } from "@/constants/ApplicationConsents";
import { UserData } from "@/models/interfaces/userData";
import Splash from "@/components/splash/splashScreen";
import { View } from "@/components/Themed";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "/(tabs)",
};

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Regular: require("@/assets/fonts/Mulish-Regular.ttf"),
    SemiBold: require("@/assets/fonts/Mulish-SemiBold.ttf"),
    Bold: require("@/assets/fonts/Mulish-Bold.ttf"),
    ExtraBold: require("@/assets/fonts/Mulish-ExtraBold.ttf"),
    Light: require("@/assets/fonts/Mulish-Light.ttf"),
    Medium: require("@/assets/fonts/Mulish-Medium.ttf"),
    ...FontAwesome.font,
  });

  const [userChecked, setUserChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [splashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    if (fontsError) throw fontsError;
  }, [fontsError]);

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const userData = await cache.getItem<UserData>(INITIAL_USER_DATA_KEY);
        if (userData) {
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setUserChecked(true);
      }
    };

    if (fontsLoaded) {
      checkUserData();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashFinished(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded || !userChecked) {
    return null;
  }

  return (
    <>
      <StatusBar style={"auto"} />
      {!splashFinished ? (
        <Splash />
      ) : (
        <RootLayoutNav isLoggedIn={isLoggedIn} />
      )}
    </>
  );
}

interface RootLayoutParams {
  isLoggedIn?: boolean;
}

function RootLayoutNav({ isLoggedIn }: RootLayoutParams) {
  const colorScheme = useColorScheme();
  console.log('login status  ', isLoggedIn)
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {isLoggedIn ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(routes)" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
