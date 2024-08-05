import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="register"  />
      <Stack.Screen name="otpVerify" />
      <Stack.Screen name="addProfile"/>
    </Stack>
  );
}
