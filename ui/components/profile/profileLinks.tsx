import { StyleSheet } from "react-native";
import { Pressable, TabBarIcon, Text, View } from "../Themed";
import React from "react";
import Fonts from "@/constants/Fonts";
import { Href, router } from "expo-router";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";


interface ProfileLinkProps {
  title: string;
  iconName: React.ComponentProps<typeof FontAwesome>["name"];
  redirectLink: Href<string>;
}
const ProfileLinks = ({ title, iconName, redirectLink }: ProfileLinkProps) => {
  return (
    <Pressable
      style={styles.pressableStyle}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
      onPress={() => {
        router.push(redirectLink);
      }}
    >
      <View style={styles.container}>
        <View style={styles.accountTab}>
          {/* Icon  */}
          <View style={styles.iconContainer}>
            <TabBarIcon name={iconName} />
          </View>
          {/* title  */}
          <Text style={styles.title}>{title}</Text>
        </View>
        {/* arrow */}
        <TabBarIcon name="angle-right" />
      </View>
    </Pressable>
  );
};

export default React.memo(ProfileLinks);

const styles = StyleSheet.create({
  pressableStyle: {
    width: "100%",
    height: 70,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  accountTab: {
    flexDirection: "row",
    alignItems: "center",
    // gap: 15,
  },
  title: {
    fontFamily: Fonts.Bold,
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "600",
  },
  iconContainer: {
    width: 50,
  },
});
