import { Tabs } from "expo-router";
import React from "react";
import * as HeroIconsOutline from "react-native-heroicons/outline";
import * as HeroIconsSolid from "react-native-heroicons/solid";
import { TabBar } from "@/lib";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Surface, Text, useTheme } from "react-native-paper";
import { Platform, View } from "react-native";
import { Image } from "expo-image";
import { useAuth } from "@/lib/services/useAuth";

const TabLayout = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const isMobile = Platform.OS !== "web";

  return (
    <SafeAreaProvider>
      <Surface style={{ flex: 1, flexDirection: "column" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            width: "100%",
            backgroundColor: theme.colors.inversePrimary,
            paddingTop: isMobile ? insets.top + 16 : 16,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              variant="bodyLarge"
              style={{ fontWeight: "bold", color: theme.colors.onPrimary }}
            >
              Assalamualaikum
            </Text>
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.onPrimary }}
            >
              {user?.nama || "Guest"}
            </Text>
          </View>
          <Image
            style={{
              height: 48,
              width: 48,
              borderColor: theme.colors.primary,
              borderWidth: 4,
              borderRadius: 36, // Half of height/width for circular image
            }}
            source={{
              uri: user?.foto || require("@/assets/images/dummy-profile.png"),
            }} // Fallback to placeholder if no foto
          />
        </View>
        <Tabs
          tabBar={(props) => <TabBar {...props} />}
          screenOptions={{
            animation: "shift",
            tabBarHideOnKeyboard: true,
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Beranda",
              tabBarIcon: (props) =>
                props.focused ? (
                  <HeroIconsSolid.HomeIcon
                    {...props}
                    size={props.size}
                    color={props.color}
                  />
                ) : (
                  <HeroIconsOutline.HomeIcon {...props} size={24} />
                ),
            }}
          />
          <Tabs.Screen
            name="rekap"
            options={{
              title: "Rekap",
              tabBarIcon: (props) =>
                props.focused ? (
                  <HeroIconsSolid.Squares2X2Icon
                    {...props}
                    size={props.size}
                    color={props.color}
                  />
                ) : (
                  <HeroIconsOutline.Squares2X2Icon
                    {...props}
                    size={props.size}
                    color={props.color}
                  />
                ),
            }}
          />
          <Tabs.Screen
            name="profil"
            options={{
              title: "Profil",
              tabBarIcon: (props) =>
                props.focused ? (
                  <HeroIconsSolid.UserIcon
                    {...props}
                    size={props.size}
                    color={props.color}
                  />
                ) : (
                  <HeroIconsOutline.UserIcon
                    {...props}
                    size={props.size}
                    color={props.color}
                  />
                ),
            }}
          />
        </Tabs>
      </Surface>
    </SafeAreaProvider>
  );
};

export default TabLayout;
