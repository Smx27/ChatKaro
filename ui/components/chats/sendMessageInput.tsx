import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { View, Text, Pressable, TabBarIcon } from "../Themed";
import Colors from "@/constants/Colors";
import InputComponent from "../InputComponent";
interface SendMessageProps{
  style?: StyleProp<ViewStyle> | undefined;
  onUploadClick?:()=> void;
  onSendMessageClick?:()=> void;
  onMessageType?: (text:string) => void;
}
const SendMessage = ({style, onUploadClick, onSendMessageClick, onMessageType}:SendMessageProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Pressable
          lightColor={Colors.light.background}
          darkColor={Colors.dark.background}
          onPress={onUploadClick}
        >
          <TabBarIcon name="plus-square-o" />
        </Pressable>
      </View>
      <View style={styles.textContainer}>
        <InputComponent
          placeHolder="Enter Message ..."
          title="Message"
          inputMode="text"
          textAlign="left"
          onTextChange={(text) => {if(onMessageType) onMessageType(text)}}
        />
      </View>
      <View style={styles.iconContainer}>
        <Pressable
          lightColor={Colors.light.background}
          darkColor={Colors.dark.background}
          onPress={onSendMessageClick}
        >
          <TabBarIcon name="send-o" />
        </Pressable>
      </View>
    </View>
  );
};

export default SendMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer:{
    width: '10%'
  },
   textContainer:{
    width: '75%',
    borderRadius: 14
  }
});
