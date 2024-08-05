import React, { useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { View, Text, SafeAreaView } from "./Themed";
import PhoneInput from "react-native-phone-number-input";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

// Define the props interface
interface PhoneNumberInputProps {
  value?: string;
  onValueChange?: (text: string) => void;
  formattedValue?: string;
  onFormattedValueChange?: (text: string) => void;
  valid?: boolean;
  onValidChange?: (isValid: boolean) => void;
  showMessage?: boolean;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value = "",
  onValueChange,
  formattedValue = "",
  onFormattedValueChange,
  valid = false,
  onValidChange,
  showMessage = false,
}) => {
  const phoneInput = useRef<PhoneInput>(null);
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.wrapper}>
        {showMessage && (
          <View style={styles.message}>
            <Text>Value : {value}</Text>
            <Text>Formatted Value : {formattedValue}</Text>
            <Text>Valid : {valid ? "true" : "false"}</Text>
          </View>
        )}
        <PhoneInput
          textContainerStyle={styles.textContainerStyle}
          countryPickerButtonStyle={styles.countryPickerButtonStyle}
          // ref={phoneInput}
          defaultValue={value}
          defaultCode="IN"
          layout="first"
          onChangeText={(text) => {
            if (onValueChange) onValueChange(text);
          }}
          onChangeFormattedText={(text) => {
            if (onFormattedValueChange) onFormattedValueChange(text);
          }}
          autoFocus
          withDarkTheme
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    height: 50,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7CDB8A",
    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  redColor: {
    backgroundColor: "#F57777",
  },
  message: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  textContainerStyle: {
    backgroundColor: Colors.dark.tint,
    borderRadius: 30,
    height: 56
  },
  countryPickerButtonStyle:{
    backgroundColor: Colors.dark.tint,
    borderRadius: 30,
    height: 56
  }
});

export default PhoneNumberInput;
