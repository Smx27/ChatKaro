import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import {  StyleSheet } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Image, View , Text, Pressable} from "@/components/Themed";
import Fonts from "@/constants/Fonts";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        
      }}
    >
      <Tabs.Screen
        name="contacts"
        options={{
          headerRight: () => <Text>Right</Text>,
          title: "Contacts",
          headerLeft: () => <Text>Contacts</Text>,
          headerShown: false,
          // tabBarLabelStyle: styles.labelStyle,
          // tabBarIcon: ({ color }) => colorScheme === "light" ? <Image style={styles.image} source={require('@/assets/icons/contacts_light.png')} /> : <Image style={styles.image} source={require('@/assets/icons/contacts_dark.png')} />,
          tabBarIcon: ({color}) => <TabBarIcon name="phone" color={color} />
        }}
      />

      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="comment" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="info" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable
              lightColor={Colors.light.background}
              darkColor={Colors.dark.background}
              >
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  image: {
    height: 32, 
    width: 32,
    resizeMode: 'contain'
  },
  labelStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: 12,
    fontWeight: '400'
  }
});
