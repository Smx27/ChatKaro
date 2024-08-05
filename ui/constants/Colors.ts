import { getMediaLibraryPermissionsAsync } from "expo-image-picker";

const tintColorLight = '#002DE3';
const tintColorDark = '#F7F7FC';

export default {
  light: {
    text: '#0F1828',
    background: '#FFFFFF',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    primary: '#002DE3',
    grey: '#F7F7FC'
  },
  dark: {
    text: '#fff',
    background: '#0F1828',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    primary:'#375FFF',
    grey: '#152033'
  },
};
