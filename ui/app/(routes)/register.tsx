import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { View, Text, SafeAreaView, Pressable } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import { Href, router } from "expo-router";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import PressableOpacity from "@/components/PressableOpacity";
import PhoneInput from "react-native-phone-number-input";

const Register = () => {
  const colorScheme = useColorScheme();
  const [value, setValue] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.innerContainer}>
        {/* BackButton view */}
        <View style={styles.backButtonContainer}>
          <Pressable
            style={styles.iconButton}
            onPress={() => {
              if (router.canGoBack()) router.navigate("/" as Href<string>);
            }}
            lightColor={Colors.light.background}
            darkColor={Colors.dark.background}
          >
            <Image
              source={
                colorScheme === "dark"
                  ? require("@/assets/icons/back-light.png")
                  : require("@/assets/icons/back.png")
              }
              style={styles.icon}
            />
          </Pressable>
        </View>
        <View style={styles.textAndInputContainer}>
          {/* Text container */}
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Enter Your Phone Number</Text>
            <Text style={styles.subheading}>
              Please confirm your country code and enter
            </Text>
            <Text style={styles.subheading}>your phone number</Text>
          </View>
          {/* Input textbox */}
          <View style={styles.inputContainer}>
            <PhoneNumberInput  onValidChange={()=>{}} valid={valid} formattedValue={formattedValue} showMessage={showMessage} value={value} onValueChange={(text)=> {
                console.log(text);
                phoneInput
            }}  />
          </View>
        </View>
        {/* Button container */}
        <View style={styles.buttonContainer}>
          <PressableOpacity
            style={styles.button}
            activeOpacity={0.6}
            pressInAnimationDuration={150}
            pressOutAnimationDuration={250}
            disableHaptics={false}
            onPress={()=>{
                router.navigate('/otpVerify' as Href<string>)
            }}
          >
            <Text
              lightColor={Colors.dark.text}
              darkColor={Colors.light.text}
              style={styles.text}
            >
              Continue
            </Text>
          </PressableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 24,
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  textContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

    height: "30%",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",

    height: "20%",
  },
  button: {
    width: "90%",
    padding: 24,
    borderRadius: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  heading: {
    fontSize: 24,
    fontFamily: Fonts.Bold,
    fontWeight: "700",
  },
  subheading: {
    fontSize: 16,
    fontFamily: Fonts.Regular,
    fontWeight: "300",
  },
  backButtonContainer: {
    width: "100%",

    height: "10%",
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    height: 20,
    width: 15,
    resizeMode: "contain",
  },
  inputContainer: {
    width: "80%",
    height: 36,
    flexDirection: "row",
  },
  phoneNumber: {
    width: "80%",
  },
  countryCode: {
    width: "20%",
  },
  textAndInputContainer:{

    justifyContent: 'space-between'
  }
});
