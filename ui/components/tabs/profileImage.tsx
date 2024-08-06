import React from 'react';
import { View, Image, StyleSheet, useColorScheme } from 'react-native';
import InitialsView from './InitialView';
import Colors from '@/constants/Colors';

interface ProfileImageProps {
  imagePath?: string;
  lastActive: Date; 
  title?: string;
  hasStatus?: boolean;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ imagePath, lastActive, hasStatus }) => {
  // Calculate the time difference in minutes
  const now = new Date();
  const timeDiff = Math.floor((now.getTime() - lastActive.getTime()) / 60000); // Convert milliseconds to minutes

  // Determine the color based on the last active time
  let statusColor: string;
  if (timeDiff <= 5) {
    statusColor = 'green';
  } else if (timeDiff <= 30) {
    statusColor = 'orange';
  } else {
    statusColor = '';
  }
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      {imagePath === '' ? (
        <InitialsView name="Sumit Maiti" hasStatus={hasStatus} />
      ) : (
        <Image
          source={{ uri: imagePath }}
          style={[
            styles.image,
            hasStatus && { borderWidth: 5, borderColor: Colors[colorScheme ?? 'light'].grey }
          ]}
        />
      )}
      {statusColor !== '' && (
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: statusColor }
          ]}
        />
      )}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 75, // Set width to match the image size
    height: 75, // Set height to match the image size
  },
  image: {
    width: '100%', // Make image fill the container
    height: '100%', // Make image fill the container
    borderRadius: 25,
    // borderColor: 'white',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    margin: 2, // Add a small margin to create overlap
  },
});

export default ProfileImage;
