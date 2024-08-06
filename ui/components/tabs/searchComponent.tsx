import { StyleSheet, useColorScheme } from "react-native";
import React from "react";
import { View, Text, TextInput } from "../Themed";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface SearchProps{
    placeholder?: string,
    onTextChange: (text: string)=> void
}

const Search = ({placeholder = 'Search', onTextChange}:SearchProps) => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}
     lightColor={Colors.light.grey}
     darkColor={Colors.dark.grey}
     >
      <Ionicons
        style={styles.icon}
        size={24}
        name="search"
        color={Colors[colorScheme ?? "light"].tabIconDefault}
      />
      <TextInput placeholder={placeholder}
           lightColor={Colors.light.grey}
           onChangeText={(text)=> {if(onTextChange) onTextChange(text)}}
           darkColor={Colors.dark.grey}
           style={styles.inputStyle}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 4,
    padding: 10,
    borderRadius: 8
  },
  icon: {
    padding: 5,
  },
  inputStyle: {
    height: '100%'
  }
});
