import { useAuth } from "@/lib/services/useAuth";
import { Redirect, Stack, useSegments } from "expo-router";

const Layout = () => {
  const { user } = useAuth();
  const segments = useSegments();
  const inAuthGroup = segments[0] === "(auth)";
  if (user && inAuthGroup) {
    return <Redirect href="/(app)/home"></Redirect>;
  } else if (!user && !inAuthGroup) {
    return <Redirect href="/"></Redirect>;
  }
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen
        name="akademik-kediri"
        options={{ title: "Nilai Akademik Kediri" }}
      />
      <Stack.Screen
        name="akhlak-kediri"
        options={{ title: "Nilai Akhlak Kediri" }}
      />
      <Stack.Screen
        name="peserta-kediri"
        options={{ title: "Daftar Peserta Kediri" }}
      />
      <Stack.Screen
        name="akademik-kertosono"
        options={{ title: "Nilai Akademik Kertosono" }}
      />
      <Stack.Screen
        name="akhlak-kertosono"
        options={{ title: "Nilai Akhlak Kertosono" }}
      />
      <Stack.Screen
        name="peserta-kertosono"
        options={{ title: "Daftar Peserta Kertosono" }}
      />
    </Stack>
  );
};

export default Layout;
