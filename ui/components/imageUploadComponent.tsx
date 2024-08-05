import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import Colors from '@/constants/Colors';
interface CircularImageUploadProps {
  image: string;
  onImagePicked: (image: string) => void;
}

const CircularImageUpload: React.FC<CircularImageUploadProps> = ({
  image,
  onImagePicked,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(image);

  const handleImagePick = async () => {
    // Implement your image picking logic here
    // For example, using a library like react-native-image-picker
    // and call onImagePicked with the selected image
    // onImagePicked(/* selectedImage */);
    try {
        await ImagePicker.requestCameraPermissionsAsync();
        let ressult = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
  
        if (!ressult.canceled) {
        //   await SaveImageAsync(ressult?.assets[0]?.uri);
        setSelectedImage(ressult.assets[0].uri)
            console.log(ressult.assets[0].uri)
        }
      } catch (error) {
        console.error(error);
      }
  };
  console.log(image)
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: selectedImage == ""? "@/assets/images/default_user_image.png": selectedImage }} style={styles.image} />
        <View style={styles.borderContainer}>
          <View style={styles.border} />
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleImagePick}>
        <Image source={require('@/assets/icons/add_light.png')}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 150,
    height: 150,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
    overflow: 'hidden',
    borderColor: Colors.light.tabIconDefault,
    borderWidth: 2
  },
  image: {
    width: '100%',
    height: '100%',
  },
  borderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    width: '90%',
    height: '90%',
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#fff',
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    // backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CircularImageUpload;
