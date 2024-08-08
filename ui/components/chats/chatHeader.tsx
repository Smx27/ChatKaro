import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import React, { Component } from "react";
import { View, Text, TabBarIcon, Pressable } from "../Themed";
import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Colors";

interface ChatHeaderProps {
  onPhoneClick?: () => void;
  onBackClick?: () => void;
  onVideoClick?: () => void;
  onNameClick?: () => void;
  name: string;
  style?: StyleProp<ViewStyle> | undefined;
}

const ChatHeader = ({
  onPhoneClick,
  onBackClick,
  onVideoClick,
  onNameClick,
  name,
  style
}: ChatHeaderProps) => {
  return (
    <View style={[styles.parentContainer, style]}>
      <View style={styles.container}>
        <Pressable hitSlop={30}
          onPress={onBackClick}
          lightColor={Colors.light.background}
          darkColor={Colors.dark.background}
        >
          <TabBarIcon name="angle-left" />
        </Pressable>
        <Pressable
          onPress={onNameClick}
          lightColor={Colors.light.background}
          darkColor={Colors.dark.background}
        >
          <Text style={styles.title}>{name}</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable
          onPress={onVideoClick}
          lightColor={Colors.light.background}
          darkColor={Colors.dark.background}
        >
          <TabBarIcon name="video-camera" />
        </Pressable>
        <Pressable
          onPress={onPhoneClick}
          lightColor={Colors.light.background}
          darkColor={Colors.dark.background}
        >
          <TabBarIcon name="phone" />
        </Pressable>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,

  },
  container: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  title: {
    fontFamily: Fonts.Bold,
    fontSize: 20,
    lineHeight: 24,
  },
});
