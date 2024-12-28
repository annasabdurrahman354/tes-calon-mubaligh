import { Link, Stack } from "expo-router";
import React from "react";
import { Surface, Text } from "react-native-paper";
import { styles } from "@/lib";

const NotFound = () => (
  <Surface style={styles.screen}>
    <Stack.Screen options={{ title: "Halaman Tidak Ditemukan" }} />

    <Text variant="displayLarge">Halaman Tidak Ditemukan</Text>

    <Text variant="bodyLarge">404 Not Found</Text>

    <Link href="/">
      <Text variant="bodyLarge">Kembali</Text>
    </Link>
  </Surface>
);

export default NotFound;
