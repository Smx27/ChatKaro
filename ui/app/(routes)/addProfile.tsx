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
} from "@/components/Themed";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import CircularImageUpload from "@/components/imageUploadComponent";
import Colors from "@/constants/Colors";
import InputComponent from "@/components/InputComponent";

const AddProfile = () => {
  const [imageUrl, setImageUrl] = useState(
    ""
  );
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
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.hidingContainer}
    >
      <SafeAreaView style={styles.container}>
        <Text>Upload Image</Text>


        <CircularImageUpload image={imageUrl} onImagePicked={()=> {}} />
        {/* Image Upload */}
        <InputComponent/>
        {/* firstname input */}
        {/* Lastname input */}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddProfile;

const styles = StyleSheet.create({
  hidingContainer: {
    flex: 1,
  },
  container: {
    height: "100%",
    padding: 24,
    flexDirection: "column",
    alignItems: "center",
  },
  image: {},
  uploadButton: {},
});
