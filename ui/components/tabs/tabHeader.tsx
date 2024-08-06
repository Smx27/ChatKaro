import { StyleSheet, useColorScheme } from "react-native";
import React from "react";
import { View, Text, Pressable, Image } from "../Themed";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";

interface TabHeaderProps {
  title: string;
  onAddButtonPress?: () => void;
  showAddButton: boolean;
  showNewChat: boolean;
  onShowAddButtonPress?: () => void;
  showSelectButton: boolean;
  onSelectButtonClick?: () => void;
}

const TabHeader = ({
  title,
  onAddButtonPress,
  showAddButton,
  showNewChat,
  onShowAddButtonPress,
  showSelectButton,
  onSelectButtonClick,
}: TabHeaderProps) => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <View style={styles.IconContainer}>
        {showAddButton && (
          <Pressable
            lightColor={Colors.light.background}
            darkColor={Colors.dark.background}
            onPress={onAddButtonPress}
          >
            <Image
              style={styles.image}
              source={
                colorScheme === "light"
                  ? require("@/assets/icons/plus_light.png")
                  : require("@/assets/icons/plus_dark.png")
              }
            />
          </Pressable>
        )}
        {showNewChat && (
          <Pressable
            lightColor={Colors.light.background}
            darkColor={Colors.dark.background}
            onPress={onShowAddButtonPress}
          >
            <Image
              style={styles.image}
              source={
                colorScheme === "light"
                  ? require("@/assets/icons/newchat_light.png")
                  : require("@/assets/icons/newchat_dark.png")
              }
            />
          </Pressable>
        )}
        {showSelectButton && (
          <Pressable
            lightColor={Colors.light.background}
            darkColor={Colors.dark.background}
            onPress={onSelectButtonClick}
          >
            <Image
              style={styles.image}
              source={
                colorScheme === "light"
                  ? require("@/assets/icons/select_chat_light.png")
                  : require("@/assets/icons/select_chat_dark.png")
              }
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default TabHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 18,
  },
  image: {
    width: 18,
    height: 18,
  },
  header: {
    fontFamily: Fonts.SemiBold,
    fontSize: 18,
    fontWeight: "600",
  },
  IconContainer:{
    flexDirection: 'row',
    gap: 15
  }
});
