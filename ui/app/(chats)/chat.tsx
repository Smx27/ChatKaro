import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import React from "react";
import { View, Text, SafeAreaView } from "@/components/Themed";
import ChatHeader from "@/components/chats/chatHeader";
import SendMessage from "@/components/chats/sendMessageInput";
import ChatPanel from "@/components/chats/chatPanel";
import { router } from "expo-router";

const Chat = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardStyle}
    >
      <SafeAreaView>
        <View style={styles.container}>
          <ChatHeader style={{ paddingHorizontal: 24 }} name="Sumit Maiti" onBackClick={()=> {
            router.back()
          }} />
          <View style={styles.chatPanel}>
            <ChatPanel />
          </View>
          <SendMessage style={{ paddingHorizontal: 24 }} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  keyboardStyle: {
    flex: 1,
  },
  container: {
    // padding: 24,
    height: "100%",
    justifyContent: "space-between",
  },
  chatPanel: {
    height: "80%",
  },
});
