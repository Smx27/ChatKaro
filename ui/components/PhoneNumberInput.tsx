import React, { useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { View, Text, SafeAreaView } from "./Themed";
import PhoneInput from "react-native-phone-number-input";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

// Define the props interface
interface PhoneNumberInputProps {
  value?: string;
  onValueChange?: (text: string, IsValid:boolean) => void;
  formattedValue?: string;
  onFormattedValueChange?: (text: string) => void;
  valid?: boolean;
  onChangeCountry?: (country: string) => void;
  showMessage?: boolean;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value = "",
  onValueChange,
  formattedValue = "",
  onFormattedValueChange,
  valid = false,
  onChangeCountry,
  showMessage = false,
}) => {
  const phoneInput = useRef<PhoneInput>(null);
  const colorScheme = useColorScheme();
  const [IsValid, setIsValid] = useState(false)
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.wrapper}>
        <PhoneInput
          textContainerStyle={styles.textContainerStyle}
          countryPickerButtonStyle={styles.countryPickerButtonStyle}
          ref={phoneInput}
          defaultValue={value}
          // defaultCode="IN"
          layout="first"
          onChangeText={(text) => {
            const checkValid = phoneInput.current?.isValidNumber(value);
            setIsValid( checkValid ? checkValid : false)
            if (onValueChange) onValueChange(text, IsValid);
          }}
          onChangeFormattedText={(text) => {
            if (onFormattedValueChange) onFormattedValueChange(text);
          }}
          onChangeCountry={(value) => {
            console.log(value.callingCode)
            if (value.callingCode.length > 0) {
              const countryCode = `+${value.callingCode[0].toLowerCase()}`;
              console.log(countryCode)
              if (onChangeCountry) {
                onChangeCountry(countryCode);
              }
            }
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
