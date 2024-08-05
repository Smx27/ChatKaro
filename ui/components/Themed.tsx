/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */
import { ImageSourcePropType } from "react-native";
import {
  Text as DefaultText,
  View as DefaultView,
  TouchableOpacity as DefaultTouchableOpacity,
  Pressable as DefaultPressable,
  ViewStyle,
  TextInputProps as DefaultTextInputProps,
  TextInput as DefaultTextInput,
  Image as DefaultImage
} from "react-native";
import { SafeAreaView as DefaultSafeAreaView } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";
// import { Link as DefaultLink, LinkProps } from "expo-router";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};
type ImageThemeProp ={
  lightImagePath?:string,
  darkImagePath?:string
}
export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type SafeAreaViewProps = ThemeProps & DefaultSafeAreaView["props"];
export type ImageProps = ImageThemeProp & DefaultImage["props"];
export type TouchableOpacityProps = ThemeProps &
  DefaultTouchableOpacity["props"];
export type PressableProps = ThemeProps &
  (typeof DefaultPressable)["defaultProps"];
export type TextInputProps = ThemeProps & DefaultTextInputProps;
// export type DefaultLinkProps = ThemeProps & LinkProps;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function SafeAreaView(props: SafeAreaViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  return (
    <DefaultSafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

/**
 * Themed TouchableOpacity component.
 */
export function TouchableOpacity(props: TouchableOpacityProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultTouchableOpacity
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}

/**
 * Themed Pressable component.
 */
export function Pressable(props: PressableProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primary"
  );

  return (
    <DefaultPressable
      style={[{ backgroundColor }, style as ViewStyle]}
      {...otherProps}
    />
  );
}
/**
 * Themed TextInput component.
 */
export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  return (
    <DefaultTextInput
      style={[{ backgroundColor, color: textColor }, style]}
      {...otherProps}
    />
  );
}
export function Image (props: ImageProps) {
  const { style, lightImagePath, darkImagePath, ...otherProps } = props;
  const theme = useColorScheme() ?? "light";
  const image  = theme === "light" ?  lightImagePath as string  :  darkImagePath as string ;
  console.log('image theme', theme, lightImagePath, image)
  const source = image ? { uri: image } : undefined;

  return <DefaultImage source={source}  style={style} {...otherProps} />;
}
