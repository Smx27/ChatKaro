import { StyleSheet } from "react-native";
import { View } from "../Themed";
import React from "react";
import ContactComponent from "./contactComponent";

const ContactList = () => {
  const imagePath =
    "https://wallpapers-clan.com/wp-content/uploads/2022/07/funny-cat-1.jpg";
  const lastActive = new Date(Date.now() - 3 * 60 * 1000); // 3 minutes ago
  const date3 = new Date('2024-08-05');
  return (
    <View style={styles.container}>
      <ContactComponent imagePath={imagePath} lastActive={lastActive} name="Sumit Maiti" subtext="Online" unreadMessage={2} />
      <ContactComponent imagePath={imagePath} lastActive={date3} name="Sumit Maiti" subtext="Online" unreadMessage={2} />
    </View>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
  }
});
