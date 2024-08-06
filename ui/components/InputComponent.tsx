import { InputModeOptions, StyleSheet, Text } from "react-native";
import React from "react";
import { TextInput, View } from "./Themed";
import Colors from "@/constants/Colors";

interface InputComponentProps {
  title: string;
  onTextChange: (text: string) => void;
  placeHolder: string;
  inputMode?: InputModeOptions | undefined;
  textAlign?: "left" | "center" | "right" | undefined;
}

const InputComponent: React.FC<InputComponentProps> = ({
  title = "",
  onTextChange,
  placeHolder = "Enter a value",
  inputMode = "text",
  textAlign = undefined,
}) => {
  return (
    <View
      style={styles.container}
      lightColor={Colors.light.grey}
      darkColor={Colors.dark.grey}
    >
      <TextInput
        style={styles.inputStyle}
        lightColor={Colors.light.grey}
        darkColor={Colors.dark.grey}
        placeholder={placeHolder}
        cursorColor="#fff"
        textAlign={textAlign}
        inputMode={inputMode}
        onChangeText={(text) => {
          if (onTextChange) onTextChange(text);
        }}
      />
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 8,
  },
  inputStyle: {
    padding: 24,
  },
});
