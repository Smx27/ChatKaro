import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { View, Text, SafeAreaView, Pressable } from "@/components/Themed";
import React from "react";
import Fonts from "@/constants/Fonts";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Colors from "@/constants/Colors";
import { Href, router, useLocalSearchParams } from "expo-router";

const OtpVerify = () => {
  const { number, countryCode } = useLocalSearchParams();
  return (
  <KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  style={styles.hidingContainer}
  >
      <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Enter Code</Text>
        <Text style={styles.subtext}>
          We have sent you an SMS with the code
        </Text>
        <Text style={styles.subtext}>to {countryCode} {number}</Text>
      </View>
      <View style={styles.otpContainner}>
        <OTPInputView
          pinCount={4}
          autoFocusOnLoad
          editable
          secureTextEntry
          placeholderTextColor="*"
          codeInputFieldStyle={{ borderRadius: 14 }}
          onCodeFilled={(code) => {
            console.log(`Code is ${code}, you are good to go!`);
            if(code === '1234')
              router.push({
                pathname: "/addProfile",
                params: { number: number, countryCode: countryCode }});
          }}
        />
      </View>
      <View style={styles.buttonContainner}>
        <Pressable style={styles.button}
        lightColor={Colors.light.background}
        darkColor={Colors.dark.background}
        >
          <Text style={styles.buttonText} darkColor={Colors.dark.primary} lightColor={Colors.light.primary}>Resend Code</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  </KeyboardAvoidingView>
  );
};

export default OtpVerify;

const styles = StyleSheet.create({
  hidingContainer:{
    flex:1
  },
  container: {
    height: "100%",
    padding: 24,
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontFamily: Fonts.Bold,
    fontWeight: "700",
    fontSize: 24,
  },
  subtext: {
    fontFamily: Fonts.Regular,
    fontWeight: "300",
    fontSize: 14,
    textAlign: "center",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: 'flex-end',
    width: "80%",
    height: "30%"
  },
  otpContainner: {
    
    width: "80%",
    height: "30%"
  },
  buttonContainner:{
    
    width: "80%",
    height: "30%"
  },
  button:{
    padding: 20,
    borderRadius: 14,
  },
  buttonText: {
    fontFamily: Fonts.SemiBold,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  }
 
});
