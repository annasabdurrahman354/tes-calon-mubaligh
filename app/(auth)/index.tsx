import { Image } from "expo-image";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Surface,
  TextInput,
  HelperText,
  Text,
  useTheme,
  Snackbar,
  ActivityIndicator,
} from "react-native-paper";
import * as Yup from "yup";
import { styles } from "@/lib";
import { View } from "react-native";
import * as HeroIconsOutline from "react-native-heroicons/outline";
import { router } from "expo-router";
import { useAuth } from "@/lib/services/useAuth";
import { useSnackbar } from "@/lib/services/useSnackbar";
import { GestureHandlerRootView, TouchableWithoutFeedback } from "react-native-gesture-handler";

const Login = () => {
  const { loginCredential, loginNfc } = useAuth();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { newSnackbar } = useSnackbar();

  const inputRef = useRef(null);
  const [nfcId, setNfcId] = useState("");
  const [smartCardMessage, setSmartCardMessage] = useState("");
  const [useSmartcard, setUseSmartCard] = useState(false);

  useEffect(() => {
    if (inputRef.current && useSmartcard) {
      inputRef.current.focus();
    }
  }, []);

  const handleScreenTouch = () => {
    // Maintain focus on the TextInput even after screen interaction
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onLoginSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      // Attempt to login using the credentials
      const sessionData = await loginCredential(
        values.username,
        values.password
      );

      // If successful, redirect to home page
      if (sessionData) {
        setLoading(false);
        console.log(sessionData);
        router.replace("/(app)/home");
      }
    } catch (error) {
      if (error instanceof Error) {
        newSnackbar(error.message);
      }
      setLoading(false);
    }
  };

  const onLoginNfc = async (nfc: string) => {
    setLoading(true);
    try {
      // Attempt to login using the credentials
      const sessionData = await loginNfc(nfc);

      // If successful, redirect to home page
      if (sessionData) {
        console.log(sessionData);
        router.replace("/(app)/home");
      }
    } catch (error) {
      if (error instanceof Error) {
        setSmartCardMessage(error.message);
      }
      setLoading(false);
      setNfcId("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <Surface
      style={{
        ...styles.screen,
        alignItems: undefined,
      }}
    >
        <Image
          alt="Logo"
          source={require("@/assets/images/logo.png")}
          style={{
            height: 150,
            width: 150,
            borderRadius: 16,
            marginBottom: 16,
            marginHorizontal: "auto",
          }}
        />

        <Text
          variant="headlineLarge"
          style={{ textAlign: "center", fontWeight: 700 }}
        >
          Tes Calon Mubaligh
        </Text>
        <Text
          variant="bodyLarge"
          style={{ textAlign: "center", marginBottom: 16 }}
        >
          Silahkan Masuk untuk Melanjutkan.
        </Text>
        {useSmartcard ? (
          <View
            style={{
              alignSelf: "center",
              borderRadius: 32,
              borderWidth: 1,
              borderStyle: "dashed",
              padding: 32,
              borderColor: theme.colors.outline,
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.primary,
                padding: 12,
                borderRadius: 16,
              }}
            >
              {loading ? (
                <ActivityIndicator size={40} color={theme.colors.onPrimary} />
              ) : (
                <HeroIconsOutline.CreditCardIcon
                  color={theme.colors.onPrimary}
                  size={40}
                />
              )}
            </View>
            <TextInput
              ref={inputRef}
              mode="flat"
              underlineColor="transparent"
              style={{maxWidth:200, maxHeight: 48, borderTopLeftRadius:20, borderTopRightRadius:20}}
              onChangeText={setNfcId} // Save changes to state
              onSubmitEditing={() => onLoginNfc(nfcId)} // Trigger alert on submission
              submitBehavior={"submit"}
              placeholder="NFC ID"
              showSoftInputOnFocus={false}
              autoFocus={true} // Automatically focus
              keyboardType="numeric"
              caretHidden={true} // Hide cursor
              value={nfcId} // Controlled component tied to state
            />
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.primary, textAlign: "center" }}
            >
              {loading
                ? "Verifikasi Identitas Smartcard"
                : smartCardMessage != ""
                ? smartCardMessage
                : "Tap Smartcard untuk Login"}
            </Text>
            <Text
              style={{ textAlign: "center", color: theme.colors.outline }}
              variant="bodyLarge"
            >
              atau
            </Text>
            <Button
              disabled={loading}
              buttonColor={theme.colors.secondary}
              mode="contained"
              onPress={() => setUseSmartCard(!useSmartcard)}
            >
              {useSmartcard ? "Gunakan Kredensial" : "Gunakan Smartcard"}
            </Button>
          </View>
        ) : (
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required("Isi username terlebih dahulu!"),
              password: Yup.string().required("Isi password terlebih dahulu!"),
            })}
            onSubmit={onLoginSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
                <Surface elevation={0}>
                  <TextInput
                    maxLength={64}
                    mode="outlined"
                    label="Username"
                    value={values.username}
                    error={!!errors.username}
                    onBlur={handleBlur("username")}
                    placeholder="Masukkan username..."
                    onChangeText={handleChange("username")}
                    disabled={loading}
                  />
                  <HelperText type="error" visible={!!errors.username}>
                    {errors.username}
                  </HelperText>
                </Surface>

                <Surface elevation={0} style={{ marginTop: -4 }}>
                  <TextInput
                    maxLength={64}
                    mode="outlined"
                    label="Password"
                    value={values.password}
                    error={!!errors.password}
                    onBlur={handleBlur("password")}
                    placeholder="Masukkan password..."
                    onChangeText={handleChange("password")}
                    disabled={loading}
                  />
                  <HelperText type="error" visible={!!errors.password}>
                    {errors.password}
                  </HelperText>
                </Surface>

                {loading ? (
                  <ActivityIndicator size={32} />
                ) : (
                  <>
                    <Button mode="contained" onPress={() => handleSubmit()}>
                      Masuk
                    </Button>
                    <Text
                      style={{
                        textAlign: "center",
                        color: theme.colors.outline,
                      }}
                      variant="bodyLarge"
                    >
                      atau
                    </Text>
                    <Button
                      buttonColor={theme.colors.secondary}
                      mode="contained"
                      onPress={() => setUseSmartCard(!useSmartcard)}
                    >
                      {useSmartcard
                        ? "Gunakan Kredensial"
                        : "Gunakan Smartcard"}
                    </Button>
                  </>
                )}
              </>
            )}
          </Formik>
        )}
    </Surface>
  );
};

export default Login;
