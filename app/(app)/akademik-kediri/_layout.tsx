import { Stack } from "expo-router";
import { StackHeader } from "@/lib";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            animation: "slide_from_right",
            header: (props) => <StackHeader navProps={props} children={undefined} />,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Peserta Kediri"
            }}
          />
          <Stack.Screen name="penilaian" options={{ title: "Penilaian Akademik" }} />
        </Stack>
    </GestureHandlerRootView>
  );
};

export default Layout;
