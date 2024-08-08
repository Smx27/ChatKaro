import { StyleSheet } from "react-native";
import React from "react";
import { View, Text, TabBarIcon } from "../Themed";
import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Colors";
import { DateUtils } from "@/utils/time";

interface MessageProps {
  isSenderMessage?: boolean;
  isMessageSent?: boolean;
  isMessageRead?: boolean;
  message: string;
  time: Date;
}

const Message = ({
  isSenderMessage,
  isMessageRead,
  isMessageSent,
  message,
  time
}: MessageProps) => {
  return (
    <View
      style={[
        styles.messageBox,

        { justifyContent: isSenderMessage ? "flex-end" : "flex-start" },
      ]}
      lightColor={Colors.light.grey}
      darkColor={Colors.dark.grey}
    >
      <View
        lightColor={
          isSenderMessage ? Colors.light.primary : Colors.light.background
        }
        darkColor={
          isSenderMessage ? Colors.dark.primary : Colors.dark.background
        }
        style={[
          styles.container,
          isSenderMessage
            ? {
                borderTopLeftRadius: 14,
                borderTopRightRadius: 14,
                borderBottomStartRadius: 14,
              }
            : {
                borderTopLeftRadius: 14,
                borderTopRightRadius: 14,
                borderBottomEndRadius: 14,
              },
        ]}
      >
        <View
          lightColor={
            isSenderMessage ? Colors.light.primary : Colors.light.background
          }
          darkColor={
            isSenderMessage ? Colors.dark.primary : Colors.dark.background
          }
        >
          <Text
            lightColor={isSenderMessage ? Colors.dark.text : Colors.light.text}
            darkColor={
              isSenderMessage ? Colors.dark.primary : Colors.dark.background
            }
            style={styles.message}
          >{message}</Text>
          <Text
            style={[
              styles.time,
              { textAlign: isSenderMessage ? "right" : "left" },
            ]}
            lightColor={Colors.light.tabIconDefault}
            darkColor={Colors.dark.tabIconDefault}
          >
            {DateUtils.formatDateForChat(time)}
            {isSenderMessage && (
              <Text
                style={[
                  styles.time,
                  { textAlign: isSenderMessage ? "right" : "left" },
                ]}
                lightColor={Colors.light.tabIconDefault}
                darkColor={Colors.dark.tabIconDefault}
              >
                {isMessageRead ? " Read" : isMessageSent ? " Sent" : ""}
              </Text>
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(Message);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "auto",
    maxWidth: "70%",
    gap: 5,
  },
  messageBox: {
    flexDirection: "row",
  },
  message: {
    fontFamily: Fonts.Regular,
    fontSize: 14,
  },
  time: {
    fontFamily: Fonts.Light,
    fontSize: 12,
  },
});
