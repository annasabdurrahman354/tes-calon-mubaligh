import { Stack } from "expo-router";

import { StackHeader } from "@/lib";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        header: (props) => <StackHeader navProps={props} children={undefined} />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Peserta Kediri" }} />
      <Stack.Screen name="auth-simak" options={{ title: "Peserta Anda Simak" }} />
      <Stack.Screen name="detail" options={{ title: "Detail Peserta Kediri" }} />
    </Stack>
  </GestureHandlerRootView>
);

export default Layout;
