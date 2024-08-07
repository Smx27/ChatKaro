import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Colors from "@/constants/Colors";
import { Text, View, SafeAreaView } from "@/components/Themed";
import TabHeader from "@/components/tabs/tabHeader";
import Search from "@/components/tabs/searchComponent";
import ContactList from "@/components/tabs/contactList";
import { useLocalSearchParams } from "expo-router";
import AsyncStorageService from "@/services/AsyncStorage";
import { UserData } from "@/models/interfaces/userData";
import { INITIAL_USER_DATA_KEY } from "@/constants/ApplicationConsents";

const Contacts = () => {
  const { number, countryCode, firstName, lastName } = useLocalSearchParams();

  useEffect(() => {
    const checkAndSaveParams = async () => {
      try {
        console.log("Params:", number, countryCode, firstName, lastName);

        // Check if any of the required values are missing
        if (!number || !countryCode || !firstName || !lastName) {
          console.error("Missing required parameters");
          return;
        }

        // Create an object from the local parameters
        const dataObject = {
          number: typeof number === "string" ? number : number[0],
          countryCode: typeof countryCode === "string" ? countryCode : countryCode[0],
          firstName: typeof firstName === "string" ? firstName : firstName[0],
          lastName: typeof lastName === "string" ? lastName : lastName[0],
        };
        console.log("Data object:", dataObject);

        // Check for duplicates in AsyncStorage
        const existingData = await AsyncStorageService.getItem<UserData>(INITIAL_USER_DATA_KEY);
        if (existingData) {
          console.log("Existing data:", existingData);
          // Check for duplicates based on your criteria
          if (existingData.number === dataObject.number && existingData.countryCode === dataObject.countryCode) {
            console.log("Duplicate values found");
            return;
          }
        }

        // Save the data object in AsyncStorage
        await AsyncStorageService.setItem(INITIAL_USER_DATA_KEY, dataObject);
        console.log("Data saved successfully");
      } catch (error) {
        console.error("Error in checkAndSaveParams:", error);
      }
    };

    checkAndSaveParams();
  }, [number, countryCode, firstName, lastName]); // Dependency array to run this effect only once on mount

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Header */}
        <TabHeader
          title="Contacts"
          showAddButton
          onAddButtonPress={() => console.log("Add Button Pressed")}
          showNewChat={false}
          showSelectButton={false}
        />
        {/* Search */}
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
    width: "100%",
    padding: 24,
  },
  text: {
    color: Colors.light.text,
  },
});
