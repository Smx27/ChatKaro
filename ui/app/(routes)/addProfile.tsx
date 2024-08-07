import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
} from "react-native";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "@/components/Themed";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import CircularImageUpload from "@/components/imageUploadComponent";
import Colors from "@/constants/Colors";
import InputComponent from "@/components/InputComponent";
import { router, useLocalSearchParams } from "expo-router";

const AddProfile = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [image, setimage] = useState("");
  const UploadImageAsync = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let ressult = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!ressult.canceled) {
        await SaveImageAsync(ressult?.assets[0]?.uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const SaveImageAsync = async (image: string) => {
    try {
      setimage(image);
      //close modal
    } catch (error) {
      console.error(error);
    }
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { number, countryCode } = useLocalSearchParams();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.hidingContainer}
    >
      <SafeAreaView style={styles.container}>
        <CircularImageUpload
          image={imageUrl}
          onImagePicked={(image) => {
            console.log("image", image);
          }}
        />

        <View style={styles.inputContainer}>
          <InputComponent
            placeHolder="First Name (Required)"
            onTextChange={(text) => setFirstName(text)}
            title="First Name"
            inputMode="text"
            textAlign="left"
          />
          {/* Last name input */}
          <InputComponent
            placeHolder="Last Name (Optional)"
            onTextChange={(text) => setLastName(text)}
            title="Last Name"
            inputMode="text"
            textAlign="left"
          />
        </View>
        <View>
        <Pressable 
          onPress={() =>
            router.push({
              pathname: "/contacts",
              params: {
                number: number,
                countryCode: countryCode,
                firstName: firstName,
                lastName: lastName,
              },
            })
          }
          style={styles.secondaryButton}
          darkColor={Colors.dark.primary}
          lightColor={Colors.light.primary}
        >
          <Text
            style={styles.text}
            lightColor={Colors.dark.text}
            darkColor={Colors.light.text}
          >
            Save
          </Text>
        </Pressable>
          </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default React.memo(AddProfile);

const styles = StyleSheet.create({
  hidingContainer: {
    flex: 1,
  },
  container: {
    height: "100%",
    padding: 24,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {},
  uploadButton: {},
  inputContainer: {
    width: "90%",
    height: 200,
    justifyContent: "space-around",
  },
  secondaryButton: {
    width: "90%",
    padding: 24,
    borderRadius: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
