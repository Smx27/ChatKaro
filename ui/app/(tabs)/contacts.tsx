import { StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Text, View, SafeAreaView } from "@/components/Themed";
import TabHeader from "@/components/tabs/tabHeader";
import Search from "@/components/tabs/searchComponent";
import ContactList from "@/components/tabs/contactList";
const Contacts = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
              {/* Header */}
      <TabHeader
          title="Contacts"
          showAddButton
          onAddButtonPress={() => console.log("Add Button Pressed")} showNewChat={false} showSelectButton={false}      />
      {/* Seacrch */}
      <Search
        placeholder="Search"
        onTextChange={(text) => console.log("searchText ", text)}
      />
      {/* Contact List */}
      <ContactList />
      </View>
    </SafeAreaView>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 24
  },
  text: {
    color: Colors.light.text,
  },
});
