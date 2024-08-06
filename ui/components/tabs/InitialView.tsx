import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '../Themed';
import Colors from '@/constants/Colors';
// Function to get the initials from a full name
const getInitials = (name: string): string => {
  const names = name.split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase(); // For single name case
  }
  return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
};

// Function to generate a random muted color
const getRandomMutedColor = (): string => {
  const getRandomValue = () => Math.floor(Math.random() * 128); // 0-127 for muted colors
  const r = getRandomValue();
  const g = getRandomValue();
  const b = getRandomValue();
  return `rgb(${r}, ${g}, ${b})`;
};

// Component to display the initials
const InitialsView: React.FC<{ name: string,hasStatus?:boolean }> = ({ name,hasStatus }) => {
  const colorScheme = useColorScheme();
  const initials = getInitials(name);
  const backgroundColor = getRandomMutedColor();

  return (
    <View style={[styles.container, { backgroundColor },  hasStatus && { borderWidth: 5, borderColor: Colors[colorScheme ?? 'light'].grey }]}>
      <Text
      lightColor={Colors.dark.text}
      style={styles.text}>{initials}</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Make image fill the container
    height: '100%', // Make image fill the container
    borderRadius: 25,
    borderWidth: 5,
    borderColor: 'white',
    // Background color will be set dynamically
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default InitialsView;
