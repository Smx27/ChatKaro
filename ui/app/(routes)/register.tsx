import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { View, Text, SafeAreaView, Pressable } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import PhoneNumberInput from "@/components/PhoneNumberInput";

const Register = () => {
  const colorScheme = useColorScheme();
  const [value, setValue] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);

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
              if (router.canGoBack()) router.back();
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
            <PhoneNumberInput  
            onChangeCountry={(countryCode)=>{
              // console.log('get countrycode ', countryCode)
              setCountryCode(countryCode)
            }} 
            valid={valid} 
            formattedValue={formattedValue} 
            
            value={value} 
            onValueChange={(text, IsValid)=> {
                // console.log(text, IsValid);
                // phoneInput
                setValue(text);
                setValid((prev:boolean) => IsValid)
            }} 
            onFormattedValueChange={(text)=> console.log(text)}
            />
          </View>
        </View>
        {/* Button container */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            lightColor={Colors.light.primary}
            darkColor={Colors.dark.primary}
            onPress={()=>{
                // if(value.length == 10)
                // console.log(formattedValue.split(value))
                  router.push({
                    pathname:  '/otpVerify',
                    params: {number: value, countryCode: countryCode}
                  });
            }}
          >
            <Text
              lightColor={Colors.dark.text}
              darkColor={Colors.light.text}
              style={styles.text}
            >
              Continue
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default React.memo(Register);

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
