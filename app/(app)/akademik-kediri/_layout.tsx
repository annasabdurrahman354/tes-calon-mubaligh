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
import { TouchableOpacity, View } from "react-native";
import {CreditCardIcon} from "react-native-heroicons/outline";
import { useKediri } from "@/lib/services/useKediri";

const Layout = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [nfcId, setNfcId] = useState("");
  const [useSmartcard, setUseSmartCard] = useState(false);
  const [smartCardMessage, setSmartCardMessage] = useState("");

  const inputRef = useRef<TextInput>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { getPesertaKediriByNfc, addSelectedPesertaKediri } = useKediri();

  const onGetPesertaKediriByNfc = async (nfc: string) => {
    setLoading(true);
    try {
      const peserta = await getPesertaKediriByNfc(nfc);

      console.log(peserta)

      if (peserta?.telah_disimak) {
        setSmartCardMessage(`${peserta.nama} sudah pernah anda simak.`);
      } else {
        setSmartCardMessage(`${peserta?.nama} telah ditambahkan.`);
        addSelectedPesertaKediri(peserta);
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
  }, [useSmartcard]);

  const handleKeyPress = useCallback(
    (e) => {
      const key = e.nativeEvent.key;
  
      console.log("Key pressed:", key); // Debugging: Log each key press
  
      if (key === "Enter") {
        if (nfcId.trim()) {
          console.log("Processing NFC ID:", nfcId); // Debugging: Log the NFC ID to be processed
          onGetPesertaKediriByNfc(nfcId.trim()); // Process NFC ID
          setNfcId(""); // Reset NFC ID state
        }
      } else {
        setNfcId((prev) => prev + key); // Append to NFC ID
      }
  
      inputRef.current?.focus(); // Ensure the input is always focused
    },
    [nfcId, onGetPesertaKediriByNfc]
  );  
  
  const handleScreenTouch = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    setNfcId("");
    setSmartCardMessage("");
    setUseSmartCard((prev) => !prev); // Toggle smart card usage
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const snapPoints = useMemo(() => ["30%"], []);

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
              title: "Peserta Kediri",
              headerRight: () => (
                <Button
                  style={{ marginRight: 8 }}
                  onPress={handlePresentModalPress}
                  icon="credit-card"
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
          style={{ marginHorizontal: 32 }}
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
                  style={{maxWidth:200, maxHeight: 48, borderTopLeftRadius:20, borderTopRightRadius:20}}
                  onKeyPress={handleKeyPress}
                  placeholder="NFC ID"
                  showSoftInputOnFocus={false}
                  keyboardType="numeric"
                  caretHidden
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
