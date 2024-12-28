import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Chip,
  IconButton,
  RadioButton,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import * as Yup from "yup";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { Formik } from "formik";
import { SegmentedButtons } from "react-native-paper";
import { DataTable } from "react-native-paper";
import { useKediri } from "@/lib/services/useKediri";
import { router } from "expo-router";
import { useSnackbar } from "@/lib/services/useSnackbar";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import {CreditCardIcon} from "react-native-heroicons/outline";

const Penilaian = () => {
  const theme = useTheme();
  const [tab, setTab] = useState("penilaian");
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState([]);
  const [activePenilaian, setActivePenilaian] = useState(0);
  const [nfcId, setNfcId] = useState("");
  const [useSmartcard, setUseSmartCard] = useState(false);
  const [smartCardMessage, setSmartCardMessage] = useState("");

  const inputRef = useRef<TextInput>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const {
    storeAkademikKediri,
    selectedPesertaKediri,
    removeSelectedPesertaKediri,
    getPesertaKediriByNfc,
    addSelectedPesertaKediri
  } = useKediri();

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

  // Synchronize formValues with selectedPesertaKediri
  useEffect(() => {
    const updatedFormValues = selectedPesertaKediri.map((peserta) => {
      const existingForm = formValues.find(
        (form) => form.peserta_kediri_id === peserta.id
      );
      return (
        existingForm || {
          peserta_kediri_id: peserta.id,
          nilaiMakna: "",
          nilaiKeterangan: "",
          nilaiPenjelasan: "",
          nilaiPemahaman: "",
          catatan: "",
        }
      );
    });
    setFormValues(updatedFormValues);
  }, [selectedPesertaKediri]);

  const handleRemovePeserta = (indexToRemove) => {
    const pesertaToRemove = selectedPesertaKediri[indexToRemove];
    if (selectedPesertaKediri.length == 1) {
      router.replace("/(app)/akademik-kediri");
    } else if (activePenilaian == selectedPesertaKediri.length - 1) {
      setActivePenilaian(activePenilaian - 1);
    }

    removeSelectedPesertaKediri(pesertaToRemove);
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
    <Surface style={{ flex: 1 }}>
      {/* List peserta tes yang dipilih untuk disimak */}
      <View
        style={{
          flexDirection: "row",
          padding: 8,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
          backgroundColor: theme.colors.elevation.level2,
        }}
      >
        {selectedPesertaKediri.map((peserta, index) => (
          <RNBounceable
            key={index}
            bounceEffectIn={0.7}
            onPress={() => setActivePenilaian(index)} // Set activePenilaian when clicked
          >
            <View style={{ alignItems: "center", gap: 8 }}>
              <Image
                style={{
                  width: 64,
                  height: 64,
                  aspectRatio: 1,
                  borderColor:
                    index == activePenilaian
                      ? theme.colors.inversePrimary
                      : theme.colors.elevation.level3,
                  borderWidth: 4,
                  borderRadius: 1000,
                }}
                source={require("@/assets/images/dummy-profile.png")}
              />
              <Text
                style={{
                  backgroundColor:
                    index == activePenilaian
                      ? theme.colors.inversePrimary
                      : theme.colors.elevation.level3,
                  padding: 6,
                  borderRadius: 16,
                  textAlign: "center",
                }}
                variant={"bodySmall"}
              >
                {peserta.nama_panggilan} - {peserta.kelompok}
                {peserta.nomor_cocard}
              </Text>
            </View>
          </RNBounceable>
        ))}

        {/* Tambah peserta tes yang dinilai */}
        <IconButton
          icon="plus"
          mode="contained"
          iconColor={theme.colors.primary}
          size={24}
          onPress={() => handlePresentModalPress()}
        />
      </View>

      <ScrollView>
        <Card style={{ margin: 16 }} mode="outlined">
          <Card.Content>
            <View style={styles.header}>
              <Avatar.Image
                size={72}
                source={require("@/assets/images/dummy-profile.png")}
              />
              <View style={{ flex: 1, marginBottom: 8 }}>
                {/* Nama peserta tes */}
                <Text
                  variant="titleMedium"
                  style={{
                    color: theme.colors.onPrimaryContainer,
                    fontWeight: "bold",
                  }}
                >
                  {selectedPesertaKediri[activePenilaian].nama}
                </Text>
                <Text variant="titleSmall">
                  bin {selectedPesertaKediri[activePenilaian].nama_ayah}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 16,
                gap: 8,
              }}
            >
              {/* Asal pondok peserta tes */}
              <Chip
                icon={() => (
                  <FontAwesome5 name="mosque" color={theme.colors.primary} />
                )}
                style={{ backgroundColor: theme.colors.elevation.level3 }}
              >
                {selectedPesertaKediri[activePenilaian].asal_pondok_nama}
              </Chip>
              {/* Chip asal daerah peserta tes */}
              <Chip
                icon="map-marker"
                style={{ backgroundColor: theme.colors.elevation.level3 }}
              >
                {selectedPesertaKediri[activePenilaian].asal_daerah_nama}
              </Chip>
              {/* Chip pendidikan terakhir terdiri dari Jenjang Pendidikan - Jurusan */}
              <Chip
                icon="school"
                style={{ backgroundColor: theme.colors.elevation.level3 }}
              >
                {selectedPesertaKediri[activePenilaian].pendidikan}
              </Chip>
              <Chip
                icon="calendar"
                style={{ backgroundColor: theme.colors.elevation.level3 }}
              >
                {selectedPesertaKediri[activePenilaian].umur} tahun
              </Chip>
            </View>
          </Card.Content>
        </Card>

        {/* Tab Switch */}
        <SegmentedButtons
          style={{ marginBottom: 16, marginHorizontal: 16 }}
          value={tab}
          onValueChange={setTab}
          buttons={[
            {
              value: "penilaian",
              label: "Penilaian",
            },
            {
              value: "riwayat",
              label: "Riwayat Penilaian",
            },
          ]}
        />
        {tab === "penilaian" ? (
          <FormPenilaianAkademikKediri
            loading={loading}
            setLoading={setLoading}
            activePenilaian={activePenilaian}
            formValues={formValues}
            storeAkademikKediri={storeAkademikKediri}
            setFormValues={setFormValues}
            removePeserta={handleRemovePeserta}
          />
        ) : (
          <Card
            style={{ marginHorizontal: 16, marginBottom: 16 }}
            mode="outlined"
          >
            <Card.Content>
              {/* Tabel riwayat pengujian oleh guru lain */}
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Dewan Guru</DataTable.Title>
                  <DataTable.Title>Nilai Rata-Rata</DataTable.Title>
                  <DataTable.Title>Catatan Penguji</DataTable.Title>
                  <DataTable.Title>Status</DataTable.Title>
                </DataTable.Header>

                {selectedPesertaKediri[activePenilaian].akademik.map((item) => (
                  <DataTable.Row key={item.id}>
                    <DataTable.Cell>{item.guru_nama}</DataTable.Cell>
                    <DataTable.Cell>{item.rata_rata}</DataTable.Cell>
                    <DataTable.Cell>{item.catatan}</DataTable.Cell>
                    <DataTable.Cell>{item.status_lulus}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
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
    </Surface>
  );
};

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  nilaiMakna: Yup.string().required("Nilai makna harus dipilih."),
  nilaiKeterangan: Yup.string().required("Nilai keterangan harus dipilih."),
  nilaiPenjelasan: Yup.string().required("Nilai penjelasan harus dipilih."),
  nilaiPemahaman: Yup.string().required("Nilai pemahaman harus dipilih."),
  catatanPenguji: Yup.string(), // Optional field
});

const FormPenilaianAkademikKediri = ({
  loading,
  setLoading,
  activePenilaian,
  formValues,
  setFormValues,
  removePeserta,
  storeAkademikKediri,
}) => {
  const theme = useTheme();
  const activeFormValues = formValues[activePenilaian] || {};
  const { newSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={activeFormValues}
      validationSchema={validationSchema}
      enableReinitialize // Allows reinitialization when `initialValues` change
      onSubmit={async (values) => {
        try {
          // Call the API to store the form data
          setLoading(true);
          const formValueToStore = formValues[activePenilaian];
          const storedForm = await storeAkademikKediri(
            formValueToStore.peserta_kediri_id,
            formValueToStore.nilaiMakna,
            formValueToStore.nilaiKeterangan,
            formValueToStore.nilaiPenjelasan,
            formValueToStore.nilaiPemahaman,
            formValueToStore.catatan
          );

          newSnackbar(storedForm.message);
          console.log("Form stored successfully:", storedForm);
          removePeserta(activePenilaian);
        } catch (error) {
          if (error instanceof Error) {
            newSnackbar(error.message);
          }
        }
        setLoading(false);
      }}
    >
      {({
        values,
        handleSubmit,
        setFieldValue,
        errors,
        touched,
      }) => (
        <Card
          style={{ marginHorizontal: 16, marginBottom: 16 }}
          mode="outlined"
        >
          <Card.Content>
            <View
              style={{
                flex: 1,
                marginBottom: 16,
              }}
            >
              <Text
                variant="titleLarge"
                style={{
                  color: theme.colors.onPrimaryContainer,
                  fontWeight: "500",
                }}
              >
                Form Penilaian
              </Text>
            </View>

            {/* Nilai Makna Radio Buttons */}
            <View style={styles.inputGroup}>
              <Text variant="titleSmall">Nilai Makna</Text>
              <RadioButton.Group
                value={values.nilaiMakna}
                onValueChange={(value) => {
                  setFieldValue("nilaiMakna", value);
                  setFormValues((prevValues) => {
                    const updatedValues = [...prevValues];
                    updatedValues[activePenilaian] = {
                      ...updatedValues[activePenilaian],
                      nilaiMakna: value,
                    };
                    return updatedValues;
                  });
                }}
              >
                <View style={styles.radioGroup}>
                  <RadioButton.Item
                    position="leading"
                    label="60"
                    value="60"
                    disabled={loading}
                  />
                  <RadioButton.Item
                    position="leading"
                    label="70"
                    value="70"
                    disabled={loading}
                  />
                  <RadioButton.Item
                    position="leading"
                    label="80"
                    value="80"
                    disabled={loading}
                  />
                  <RadioButton.Item
                    position="leading"
                    label="90"
                    value="90"
                    disabled={loading}
                  />
                </View>
              </RadioButton.Group>
              {errors.nilaiMakna && touched.nilaiMakna && (
                <Text style={styles.errorText}>{errors.nilaiMakna}</Text>
              )}
            </View>

            {/* Nilai Keterangan Radio Buttons */}
            <View style={styles.inputGroup}>
              <Text variant="titleSmall">Nilai Keterangan</Text>
              <RadioButton.Group
                value={values.nilaiKeterangan}
                onValueChange={(value) => {
                  setFieldValue("nilaiKeterangan", value);
                  setFormValues((prevValues) => {
                    const updatedValues = [...prevValues];
                    updatedValues[activePenilaian] = {
                      ...updatedValues[activePenilaian],
                      nilaiKeterangan: value,
                    };
                    return updatedValues;
                  });
                }}
              >
                <View style={styles.radioGroup}>
                  <RadioButton.Item
                    position="leading"
                    label="60"
                    value="60"
                    disabled={loading}
                  />
                  <RadioButton.Item
                    position="leading"
                    label="70"
                    value="70"
                    disabled={loading}
                  />
                  <RadioButton.Item
                    position="leading"
                    label="80"
                    value="80"
                    disabled={loading}
                  />
                  <RadioButton.Item
                    position="leading"
                    label="90"
                    value="90"
                    disabled={loading}
                  />
                </View>
              </RadioButton.Group>
              {errors.nilaiKeterangan && touched.nilaiKeterangan && (
                <Text style={styles.errorText}>{errors.nilaiKeterangan}</Text>
              )}
            </View>

            {/* Nilai Penjelasan Radio Buttons */}
            <View style={styles.inputGroup}>
              <Text variant="titleSmall">Nilai Penjelasan</Text>
              <RadioButton.Group
                value={values.nilaiPenjelasan}
                onValueChange={(value) => {
                  setFieldValue("nilaiPenjelasan", value);
                  setFormValues((prevValues) => {
                    const updatedValues = [...prevValues];
                    updatedValues[activePenilaian] = {
                      ...updatedValues[activePenilaian],
                      nilaiPenjelasan: value,
                    };
                    return updatedValues;
                  });
                }}
              >
                <View style={styles.radioGroup}>
                  <RadioButton.Item
                    position="leading"
                    label="60"
                    value="60"
                    disabled={loading}
                  />
                  <RadioButton.Item
                    position="leading"
                    label="70"
                    value="70"
                    disabled={loading}
                  />
                  <RadioButton.Item
                    position="leading"
                    label="80"
                    value="80"
                    disabled={loading}
                  />
                  <RadioButton.Item
                    position="leading"
                    label="90"
                    value="90"
                    disabled={loading}
                  />
                </View>
              </RadioButton.Group>
              {errors.nilaiPenjelasan && touched.nilaiPenjelasan && (
                <Text style={styles.errorText}>{errors.nilaiPenjelasan}</Text>
              )}
            </View>

            {/* Nilai Pemahaman Radio Buttons */}
            <View style={styles.inputGroup}>
              <Text variant="titleSmall">Nilai Pemahaman</Text>
              <RadioButton.Group
                value={values.nilaiPemahaman}
                onValueChange={(value) => {
                  setFieldValue("nilaiPemahaman", value);
                  setFormValues((prevValues) => {
                    const updatedValues = [...prevValues];
                    updatedValues[activePenilaian] = {
                      ...updatedValues[activePenilaian],
                      nilaiPemahaman: value,
                    };
                    return updatedValues;
                  });
                }}
              >
                <View style={styles.radioGroup}>
                  <RadioButton.Item
                    position="leading"
                    label="60"
                    value="60"
                    disabled={loading}
                  />
                  <RadioButton.Item
                    position="leading"
                    label="70"
                    value="70"
                    disabled={loading}
                  />
                  <RadioButton.Item
                    position="leading"
                    label="80"
                    value="80"
                    disabled={loading}
                  />
                  <RadioButton.Item
                    position="leading"
                    label="90"
                    value="90"
                    disabled={loading}
                  />
                </View>
              </RadioButton.Group>
              {errors.nilaiPemahaman && touched.nilaiPemahaman && (
                <Text style={styles.errorText}>{errors.nilaiPemahaman}</Text>
              )}
            </View>

            {/* Catatan Penguji TextInput */}
            <TextInput
              label="Catatan Penguji"
              value={values.catatan}
              onChangeText={(text) => {
                setFieldValue("catatan", text);
                setFormValues((prevValues) => {
                  const updatedValues = [...prevValues];
                  updatedValues[activePenilaian] = {
                    ...updatedValues[activePenilaian],
                    catatan: text,
                  };
                  return updatedValues;
                });
              }}
              disabled={loading}
              multiline
              numberOfLines={4}
              mode="outlined"
              style={{
                marginBottom: 16,
              }}
            />
          </Card.Content>
          {loading ? (
            <Card.Actions style={{ margin: 16 }}>
              <ActivityIndicator size={32} />
            </Card.Actions>
          ) : (
            <Card.Actions style={{ margin: 16 }}>
              <Button
                buttonColor={theme.colors.error}
                textColor={theme.colors.onError}
                icon={"delete"}
                onPress={() => removePeserta(activePenilaian)}
              >
                Hapus
              </Button>
              <Button
                icon="content-save-outline"
                buttonColor={theme.colors.primary}
                textColor={theme.colors.onPrimary}
                onPress={() => handleSubmit()}
              >
                Simpan
              </Button>
            </Card.Actions>
          )}
        </Card>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  inputGroup: {
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: "row", // This makes the radio buttons appear horizontally
    flexWrap: "nowrap", // Allows wrapping if there are many options
    justifyContent: "flex-start",
  },
  errorText: {
    marginTop: -2,
    fontSize: 12,
    color: "red",
  },
});

export default Penilaian;
