import React from "react";
import { Text, SafeAreaView, View, Pressable } from "@/components/Themed";
import { Image, StyleSheet } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import PressableOpacity from "@/components/PressableOpacity";
import Fonts from "@/constants/Fonts";
import { Href, router } from "expo-router";
const Walkthrough = () => {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.introContainer}>
        <Image
          source={
            colorScheme === "dark"
              ? require("@/assets/images/splash_dark.png")
              : require("@/assets/images/splash_light.png")
          }
          style={styles.image}
        />
        <View>
          <Text style={styles.title}>Connect easily with</Text>
          <Text style={styles.title}>your family and friends</Text>
          <Text style={styles.title}>over countries</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PressableOpacity
          activeOpacity={0.5} // Adjust opacity when pressed
          pressInAnimationDuration={150} // Animation duration when pressed in
          pressOutAnimationDuration={250} // Animation duration when pressed out
          disableHaptics={false} // Enable haptics
          keepPressedOnLongPress={true} // Keep the button pressed on long press
          onPress={() => console.log("pressed")} // Callback for press
          onLongPress={() => console.log("longpressed")} // Callback for long press
          style={styles.secondaryButton}
          darkColor={Colors.dark.background}
          lightColor={Colors.light.background}
        >
          <Text
            style={styles.text}
            lightColor={Colors.light.text}
            darkColor={Colors.dark.text}
          >
            Terms & Privacy Policy
          </Text>
        </PressableOpacity>
        <PressableOpacity
          activeOpacity={0.5} // Adjust opacity when pressed
          pressInAnimationDuration={150} // Animation duration when pressed in
          pressOutAnimationDuration={250} // Animation duration when pressed out
          disableHaptics={false} // Enable haptics
          keepPressedOnLongPress={true} // Keep the button pressed on long press
          onPress={() => {
            router.push("/register" as Href<string>)
          }} // Callback for press
          onLongPress={() => console.log("longpressed")} // Callback for long press
          style={styles.secondaryButton}
        >
          <Text
            style={styles.text}
            lightColor={Colors.dark.text}
            darkColor={Colors.dark.text}
          >
            Start Messaging
          </Text>
        </PressableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Walkthrough;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: Fonts.Bold
  },
  image: {
    height: 262,
    width: 271,
    resizeMode: "contain",
  },
  introContainer: {
    height: "70%",
    width: "70%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    gap: 8
  },
  secondaryButton: {
    width: "90%",
    padding: 24,
    borderRadius: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
