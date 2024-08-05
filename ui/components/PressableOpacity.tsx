import {
    PropsWithChildren,
    RefAttributes,
    forwardRef,
    useCallback,
    useRef,
  } from "react";
  import {
    Animated,
    GestureResponderEvent,
    StyleProp,
    View,
    ViewStyle,
  } from "react-native";
  import { Pressable, PressableProps } from "./Themed";
  import * as Haptics from "expo-haptics";

  /**
   * The props remove the functional `style` from the pressable to simplify this implementation.
   */
  export type PressableOpacityProps = Omit<PressableProps, "style"> & {
    /**
     * Defaults to 0.2 (same as TouchableOpacity)
     */
    activeOpacity?: number;
    /**
     * If false, when long press is triggered, it will start the pressOut animation.
     * Defaults to false.
     */
    keepPressedOnLongPress?: boolean;
    /**
     * If false, haptics are disabled on long press.
     */
    disableHaptics?: boolean;
    /**
     * Defaults to 100ms
     */
    pressInAnimationDuration?: number;
    /**
     * Defaults to 200ms
     */
    pressOutAnimationDuration?: number;
    /**
     * Only allow the static style prop and not the functional one.
     */
    style: StyleProp<ViewStyle>;
  };
  
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const PressableOpacity = ({
    children,
    ref,
    activeOpacity = 0.2,
    pressInAnimationDuration = 100,
    pressOutAnimationDuration = 200,
    disableHaptics = false,
    keepPressedOnLongPress = false,
    onLongPress,
    onPressIn,
    onPressOut,
    lightColor,
    darkColor,
    style,
    ...props
  }: RefAttributes<View> & PressableOpacityProps) => {
    const animation = useRef(new Animated.Value(1)).current;
    const pressInEffect = useCallback(
      (event: GestureResponderEvent) => {
        Animated.timing(animation, {
          toValue: activeOpacity,
          duration: pressInAnimationDuration,
          useNativeDriver: true,
        }).start();
        if (onPressIn) {
          onPressIn(event);
        }
      },
      [animation, onPressIn],
    );
    const pressOutEffect = useCallback(
      (event: GestureResponderEvent) => {
        Animated.timing(animation, {
          toValue: 1,
          duration: pressOutAnimationDuration,
          useNativeDriver: true,
        }).start();
        if (onPressOut) {
          onPressOut(event);
        }
      },
      [animation, onPressOut],
    );
    const longPressEffect = useCallback(
      (event: GestureResponderEvent) => {
        if (!keepPressedOnLongPress) {
          Animated.timing(animation, {
            toValue: 1,
            duration: pressOutAnimationDuration,
            useNativeDriver: true,
          }).start();
        }
        if (!disableHaptics) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        if (onLongPress) {
          onLongPress(event);
        }
      },
      [onLongPress, disableHaptics, keepPressedOnLongPress],
    );
    return (
      <AnimatedPressable
        onPressIn={pressInEffect}
        onPressOut={pressOutEffect}
        onLongPress={longPressEffect}
        lightColor={lightColor}
        darkColor={darkColor}
        ref={ref as React.Ref<View>}
        style={[style, { opacity: animation }]}
        {...props}
      >
        {children}
      </AnimatedPressable>
    );
  };
  
  export default forwardRef<View, PressableOpacityProps>((props, ref) => (
    <PressableOpacity {...props} ref={ref} />
  ));
  