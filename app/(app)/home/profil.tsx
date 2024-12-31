import React from "react";
import { Button, Surface } from "react-native-paper";
import { ScreenInfo, styles } from "@/lib";
import { useAuth } from "@/lib/services/useAuth";
import { useSnackbar } from "@/lib/services/useSnackbar";

const Profil = () => {
  const { logout } = useAuth();
  const { newSnackbar } = useSnackbar()

  const onLogout = async () => {
    try {
      const response = await logout();
      console.log(response.message)
      newSnackbar(response.message)
    } catch (error) {
      if (error instanceof Error) {
        newSnackbar(error.message);
      }
    }
  };


  return (
    <Surface style={styles.screen}>
      <ScreenInfo title="Profile" path="app/(tabs)/rekap.tsx" />

      <Surface
        elevation={0}
        style={{
          padding: 16,
          gap: 16,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Button mode="contained" onPress={() => onLogout()}>
          Logout
        </Button>
      </Surface>
    </Surface>
  );
};

export default Profil;
