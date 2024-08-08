import { StyleSheet } from "react-native";

import { Text, View, SafeAreaView, Image } from "../Themed";
import React from "react";
import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Colors";

const Splash = () => {
  return (
    <SafeAreaView style={styles.container}>
     <View style={styles.contentContainer}>
     <Image source={require("@/assets/images/icon.png")} />
     <Text style={styles.text}>ChatKaro</Text>
     </View>
     <Text
     lightColor={Colors.light.tabIconDefault}
     darkColor={Colors.dark.tabIconDefault}
     style={styles.subtext}
     >Version 1.0.0</Text>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20
    },
    text: {
        fontSize: 24,
        fontFamily: Fonts.SemiBold,
        fontWeight: '600',
    },
    contentContainer: {
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subtext: {
        fontFamily: Fonts.Bold,
        fontWeight: '400',
        fontSize: 14
    }
});
