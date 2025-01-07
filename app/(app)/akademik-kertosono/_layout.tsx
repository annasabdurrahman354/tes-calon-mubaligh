import { Stack } from "expo-router";
import { StackHeader } from "@/lib";
import {
  Button,
  Text,
  useTheme,
  ActivityIndicator,
  TextInput,
} from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import {CreditCardIcon} from "react-native-heroicons/outline";
import { useKertosono } from "@/lib/services/useKertosono";

const Layout = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [nfcId, setNfcId] = useState("");
  const [useSmartcard, setUseSmartCard] = useState(false);
  const [smartCardMessage, setSmartCardMessage] = useState("");

  const inputRef = useRef(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { getPesertaKertosonoByNfc, addSelectedPesertaKertosono } = useKertosono();

  const onGetPesertaKertosonoByNfc = async (nfc: string) => {
    setLoading(true);
    if (nfcId.length != 10) {
      console.log("Rejecy NFC ID:", nfcId); // Debugging: Log the NFC ID before processing
      return null
    }
    try {
      const peserta = await getPesertaKertosonoByNfc(nfc);

      console.log(peserta)

      if (peserta?.telah_disimak) {
        setSmartCardMessage(`${peserta.nama} sudah pernah anda simak.`);
      } else {
        setSmartCardMessage(`${peserta?.nama} telah ditambahkan.`);
        addSelectedPesertaKertosono(peserta);
        setNfcId("");
        inputRef.current?.focus();
      }
    } catch (error) {
      if (error instanceof Error) {
        setSmartCardMessage(error.message);
      }
    }
    setLoading(false);
    setNfcId(""); // Reset NFC ID
    inputRef.current?.focus(); // Refocus the input field
  };

  // Focus input field when the modal is presented and `useSmartcard` is true
  useEffect(() => {
    if (inputRef.current && useSmartcard) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (loading) setNfcId("");
    if (nfcId.length === 10) {
      console.log("Auto-trigger NFC ID:", nfcId); // Debugging: Log the NFC ID before processing
      onGetPesertaKertosonoByNfc(nfcId.trim());
    }
  }, [nfcId, onGetPesertaKertosonoByNfc]);

  const handleScreenTouch = () => {
    // Maintain focus on the TextInput even after screen interaction
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    setNfcId("");
    setSmartCardMessage("");
    setUseSmartCard((prev) => !prev); // Toggle smart card usage
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const snapPoints = useMemo(() => ["40%"], []);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack
          screenOptions={{
            animation: "slide_from_right",
            header: (props) => <StackHeader navProps={props} children={undefined} />,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Peserta Kertosono",
              headerRight: () => (
                <Button
                  style={{ marginRight: 8 }}
                  onPress={handlePresentModalPress}
                  icon="credit-card"
                  disabled
                >
                  Gunakan Smartcard
                </Button>
              ),
            }}
          />
          <Stack.Screen name="penilaian" options={{ title: "Penilaian Akademik" }} />
        </Stack>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          backdropComponent={renderBackdrop}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          style={{ marginHorizontal: 32, flex:1 }}
        >
          <BottomSheetView
            style={{
              flex: 1,
              paddingHorizontal: 16,
              paddingBottom: 16,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleScreenTouch}
              style={{ flex: 1, width: '100%', height: '100%' }}
            >
              <View
                style={{
                  alignSelf: "center",
                  borderRadius: 32,
                  borderWidth: 1,
                  borderStyle: "dashed",
                  marginHorizontal: 16,
                  padding: 16,
                  borderColor: theme.colors.outline,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 16,
                  width: '100%',
                  height: '100%',
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
                    <CreditCardIcon
                      color={theme.colors.onPrimary}
                      size={40}
                    />
                  )}
                </View>
                <TextInput
                  ref={inputRef}
                  mode="flat"
                  underlineColor="transparent"
                  style={
                    Platform.OS == 'web' ? {borderTopLeftRadius:20, borderTopRightRadius:20}:
                    {position: 'absolute', bottom:0, right: 0, width: 0, height: 0, borderTopLeftRadius:20, borderTopRightRadius:20}
                  }
                  onChangeText={setNfcId} // Save changes to state
                  onSubmitEditing={undefined} // Trigger alert on submission
                  submitBehavior={"submit"}
                  placeholder="NFC ID"
                  showSoftInputOnFocus={false}
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
                    : smartCardMessage || "Tap Smartcard untuk Menambahkan"}
                </Text>
              </View>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
