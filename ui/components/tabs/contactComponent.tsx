import { StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Pressable, Text, View } from "../Themed";
import Fonts from "@/constants/Fonts";
import ProfileImage from "./profileImage";
import { DateUtils } from "@/utils/time";


interface ContactComponentProps {
  imagePath: string;
  name: string;
  subtext: string;
  lastActive: Date;
  unreadMessage?: number;
  onPress?: () => void;
}
const ContactComponent = ({
  imagePath,
  lastActive,
  name,
  subtext,
  unreadMessage,
  onPress
}: ContactComponentProps) => {
  return (
    <Pressable
    onPress={onPress}
    lightColor={Colors.light.background}
    darkColor={Colors.dark.background}
    style={styles.profileContainer}>
      <View style={styles.imageContainer}>
        <ProfileImage imagePath={imagePath} lastActive={lastActive} />
      </View>
      <View style={styles.contactText}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text
            lightColor={Colors.light.tabIconDefault}
            darkColor={Colors.dark.tabIconDefault}
            style={styles.status}
          >
            {subtext}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text
            lightColor={Colors.light.tabIconDefault}
            darkColor={Colors.dark.tabIconDefault}
            style={styles.status}
          >
            {DateUtils.formatDate(lastActive)}
          </Text>
          {unreadMessage && (
            <View
              lightColor={Colors.light.grey}
              darkColor={Colors.dark.grey}
              style={styles.unreadMessage}
            >
              <Text>{unreadMessage}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default ContactComponent;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    gap: 15,
    paddingVertical: 10,
    width: "100%",
    height: "10%",
    alignItems: "center",
  },
  status: {
    fontSize: 14,
    fontFamily: Fonts.Regular,
    fontWeight: "400",
    lineHeight: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.Bold,
    fontWeight: "700",
    lineHeight: 24,
  },
  imageContainer: {
    width: "20%",
  },
  contactText: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "80%",
  },
  textContainer: {
    width: "70%",
    justifyContent: "space-around",

    height: "100%",
    alignItems: "flex-start",
  },
  infoContainer: {
    width: "30%",
    justifyContent: "space-around",

    height: "100%",
    alignItems: "flex-end",
  },
  unreadMessage: {
    height: 20,
    width: 20,
    textAlign: "center",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
