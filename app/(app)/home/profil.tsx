import React from "react";
import { useColorScheme } from "react-native";
import {
  Surface,
  List,
  Menu,
  Button,
  IconButton,
  Snackbar,
  Icon,
} from "react-native-paper";

import {
  Color,
  Colors,
  LoadingIndicator,
  ScreenInfo,
  Setting,
  styles,
} from "@/lib";

const Profil = () => {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState({ visible: false, content: "" });
  const [settings, setSettings] = React.useState<Setting>({
    color: "default",
    theme: "auto",
  });
  const [display, setDisplay] = React.useState({
    color: false,
    language: false,
    theme: false,
  });

  React.useEffect(() => {
    setLoading(true);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const themeColors =
    Colors[settings.theme === "auto" ? colorScheme ?? "light" : settings.theme];

  return (
    <Surface style={{ flex: 1 }}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Surface elevation={0}>
          <List.AccordionGroup>
            <List.Accordion
              id="1"
              title="Tampilan"
              left={(props) => <List.Icon {...props} icon="palette" />}
            >
              <List.Item
                title="Mode"
                description="Ubah Mode"
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={
                      settings.theme === "auto"
                        ? "theme-light-dark"
                        : settings.theme === "light"
                        ? "weather-sunny"
                        : "weather-night"
                    }
                  />
                )}
                right={(props) => (
                  <Menu
                    visible={display.theme}
                    onDismiss={() => setDisplay({ ...display, theme: false })}
                    anchor={
                      <IconButton
                        {...props}
                        icon="pencil"
                        onPress={() => setDisplay({ ...display, theme: true })}
                      />
                    }
                  >
                    <Menu.Item
                      title="Sistem"
                      leadingIcon="theme-light-dark"
                      trailingIcon={
                        settings.theme === "auto" ? "check" : undefined
                      }
                      onPress={() => {
                        setSettings({ ...settings, theme: "auto" });
                        setDisplay({ ...display, theme: false });
                      }}
                    />
                    <Menu.Item
                      title="Mode Siang"
                      leadingIcon="weather-sunny"
                      trailingIcon={
                        settings.theme === "light" ? "check" : undefined
                      }
                      onPress={() => {
                        setSettings({ ...settings, theme: "light" });
                        setDisplay({ ...display, theme: false });
                      }}
                    />
                    <Menu.Item
                      title="Mode Malam"
                      leadingIcon="weather-night"
                      trailingIcon={
                        settings.theme === "dark" ? "check" : undefined
                      }
                      onPress={() => {
                        setSettings({ ...settings, theme: "dark" });
                        setDisplay({ ...display, theme: false });
                      }}
                    />
                  </Menu>
                )}
              />
              <List.Item
                title="Warna"
                description="Ubah Warna"
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="palette-swatch-variant"
                    color={
                      Colors[
                        settings.theme === "auto"
                          ? colorScheme ?? "light"
                          : settings.theme
                      ][settings.color]?.primary
                    }
                  />
                )}
                right={(props) => (
                  <Menu
                    visible={display.color}
                    onDismiss={() => setDisplay({ ...display, color: false })}
                    anchor={
                      <IconButton
                        {...props}
                        icon="pencil"
                        onPress={() => setDisplay({ ...display, color: true })}
                      />
                    }
                  >
                    {Object.keys(Colors.light).map((color) => (
                      <Surface
                        key={color}
                        elevation={0}
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Surface
                          elevation={0}
                          style={{
                            padding: 4,
                            marginLeft: 8,
                            borderRadius: 16,
                            backgroundColor:
                              color !== settings.color
                                ? undefined
                                : themeColors[color]?.primary,
                          }}
                        >
                          <Icon
                            size={24}
                            source="palette"
                            color={
                              color !== settings.color
                                ? themeColors[color as Color]?.primary
                                : themeColors[color].onPrimary
                            }
                          />
                        </Surface>

                        <Menu.Item
                          key={color}
                          title="Warna"
                          onPress={() => {
                            setSettings({
                              ...settings,
                              color: color as Color,
                            });
                            setDisplay({ ...display, color: false });
                          }}
                        />
                      </Surface>
                    ))}
                  </Menu>
                )}
              />
            </List.Accordion>
          </List.AccordionGroup>
        </Surface>
      )}

      <Surface elevation={0} style={styles.screen}>
        <ScreenInfo title="Setting" path="app/(tabs)/settings.tsx" />
      </Surface>

      <Button
        mode="contained"
        style={{ margin: 16 }}
        onPress={() => alert("AAA")}
      >
        Simpan
      </Button>

      <Snackbar
        visible={message.visible}
        onDismiss={() => setMessage({ ...message, visible: false })}
        onIconPress={() => setMessage({ ...message, visible: false })}
      >
        {message.content}
      </Snackbar>
    </Surface>
  );
};

export default Profil;
