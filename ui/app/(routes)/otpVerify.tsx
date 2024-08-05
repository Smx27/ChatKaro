import { StyleSheet } from "react-native";
import { View, Text, SafeAreaView, Pressable } from "@/components/Themed";
import React from "react";
import Fonts from "@/constants/Fonts";
import OTPInputView from "@twotalltotems/react-native-otp-input";

const OtpVerify = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Enter Code</Text>
        <Text style={styles.subtext}>
          We have sent you an SMS with the code
        </Text>
        <Text style={styles.subtext}>to +62 1309 - 1710 - 1920</Text>
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
          }}
        />
      </View>
      <View style={styles.buttonContainner}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Resend Code</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default OtpVerify;

const styles = StyleSheet.create({
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
    borderWidth: 1,
    width: "80%",
    height: "30%"
  },
  otpContainner: {
    borderWidth: 1,
    width: "80%",
    height: "30%"
  },
  buttonContainner:{
    borderWidth: 1,
    width: "80%",
    height: "30%"
  },
  button:{
    padding: 20,
    borderRadius: 14,
  },
  buttonText: {
    
  }
 
});
