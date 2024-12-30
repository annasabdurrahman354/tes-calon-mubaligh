import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Chip,
  IconButton,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import * as Yup from "yup";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { Formik } from "formik";
import { SegmentedButtons } from "react-native-paper";
import { DataTable } from "react-native-paper";
import { useKertosono } from "@/lib/services/useKertosono";
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

  const inputRef = useRef(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const {
    storeAkademikKertosono,
    selectedPesertaKertosono,
    removeSelectedPesertaKertosono,
    getPesertaKertosonoByNfc,
    addSelectedPesertaKertosono
  } = useKertosono();

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

  // Synchronize formValues with selectedPesertaKertosono
  useEffect(() => {
    const updatedFormValues = selectedPesertaKertosono.map((peserta) => {
      const existingForm = formValues.find(
        (form) => form.peserta_kertosono_id === peserta.id
      );
      return (
        existingForm || {
          peserta_kertosono_id: peserta.id,
          penilaian: "",
          kekurangan_tajwid: [],
          kekurangan_khusus: [],
          kekurangan_keserasian: [],
          kekurangan_kelancaran: [],
          catatan: "",
        }
      );
    });
    setFormValues(updatedFormValues);
  }, [selectedPesertaKertosono]);

  const handleRemovePeserta = (indexToRemove) => {
    const pesertaToRemove = selectedPesertaKertosono[indexToRemove];
    if (selectedPesertaKertosono.length == 1) {
      router.back();
    } else if (activePenilaian == selectedPesertaKertosono.length - 1) {
      setActivePenilaian(activePenilaian - 1);
    }

    removeSelectedPesertaKertosono(pesertaToRemove);
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
        {selectedPesertaKertosono.map((peserta, index) => (
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
                  {selectedPesertaKertosono[activePenilaian].nama}
                </Text>
                <Text variant="titleSmall">
                  bin {selectedPesertaKertosono[activePenilaian].nama_ayah}
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
                {selectedPesertaKertosono[activePenilaian].asal_pondok_nama}
              </Chip>
              {/* Chip asal daerah peserta tes */}
              <Chip
                icon="map-marker"
                style={{ backgroundColor: theme.colors.elevation.level3 }}
              >
                {selectedPesertaKertosono[activePenilaian].asal_daerah_nama}
              </Chip>
              {/* Chip pendidikan terakhir terdiri dari Jenjang Pendidikan - Jurusan */}
              <Chip
                icon="school"
                style={{ backgroundColor: theme.colors.elevation.level3 }}
              >
                {selectedPesertaKertosono[activePenilaian].pendidikan}
              </Chip>
              <Chip
                icon="calendar"
                style={{ backgroundColor: theme.colors.elevation.level3 }}
              >
                {selectedPesertaKertosono[activePenilaian].umur} tahun
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
          <FormPenilaianAkademikKertosono
            loading={loading}
            setLoading={setLoading}
            activePenilaian={activePenilaian}
            formValues={formValues}
            storeAkademikKertosono={storeAkademikKertosono}
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
                  <DataTable.Title>Penilaian</DataTable.Title>
                  <DataTable.Title>Kekurangan</DataTable.Title>
                  <DataTable.Title>Catatan Penguji</DataTable.Title>
                </DataTable.Header>

                {selectedPesertaKertosono[activePenilaian].akademik.map((item) => (
                  <DataTable.Row key={item.id}>
                    <DataTable.Cell>{item.guru_nama}</DataTable.Cell>
                    <DataTable.Cell>{item.penilaian}</DataTable.Cell>
                    <DataTable.Cell>{[item.kekurangan_tajwid, item.kekurangan_khusus, item.kekurangan_keserasian, item.kekurangan_kelancaran].flat(1).join(', ')}</DataTable.Cell>
                    <DataTable.Cell>{item.catatan}</DataTable.Cell>
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
    </Surface>
  );
};

const validationSchema = Yup.object().shape({
  penilaian: Yup.string().required("Penilaian harus dipilih."),
  kekurangan: Yup.string().test(
    "kekurangan-not-empty",
    "Setidaknya satu kekurangan harus dipilih jika penilaian Tidak Lulus.",
    function (_, context) {
      const {
        penilaian,
        kekurangan_tajwid,
        kekurangan_khusus,
        kekurangan_keserasian,
        kekurangan_kelancaran,
      } = context.parent;

      if (penilaian === "Tidak Lulus") {
        const allKekuranganEmpty =
          (!kekurangan_tajwid || kekurangan_tajwid.length === 0) &&
          (!kekurangan_khusus || kekurangan_khusus.length === 0) &&
          (!kekurangan_keserasian || kekurangan_keserasian.length === 0) &&
          (!kekurangan_kelancaran || kekurangan_kelancaran.length === 0);

        if (allKekuranganEmpty) {
          return false; // Trigger validation error
        }
      }

      return true; // Validation passes
    }
  ),
});

const FormPenilaianAkademikKertosono = ({
  loading,
  setLoading,
  activePenilaian,
  formValues,
  setFormValues,
  removePeserta,
  storeAkademikKertosono,
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
          const storedForm = await storeAkademikKertosono(
            formValueToStore.peserta_kertosono_id,
            formValueToStore.penilaian,
            formValueToStore.kekurangan_tajwid,
            formValueToStore.kekurangan_khusus,
            formValueToStore.kekurangan_keserasian,
            formValueToStore.kekurangan_kelancaran,
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

            <View style={styles.inputGroup}>
              <Text variant="titleSmall">Penilaian</Text>
              <SegmentedButtons
                value={values.penilaian}
                onValueChange={(value) => {
                  setFieldValue("penilaian", value);
                  setFormValues((prevValues) => {
                    const updatedValues = [...prevValues];
                    updatedValues[activePenilaian] = {
                      ...updatedValues[activePenilaian],
                      penilaian: value,
                    };
                    return updatedValues;
                  });
                }}
                buttons={[
                  {
                    value: 'Lulus',
                    label: 'Lulus',
                    showSelectedCheck: true
                  },
                  {
                    value: 'Tidak Lulus',
                    label: 'Tidak Lulus',
                    showSelectedCheck: true
                  },
                ]}
              />
              {errors.penilaian && touched.penilaian && (
                <Text style={styles.errorText}>{errors.penilaian}</Text>
              )}
            </View>

            {values.penilaian === "Tidak Lulus" && (
              <View>
                <View style={styles.inputGroup}>
                  <Text variant="titleSmall">Kekurangan Tajwid</Text>
                  <SegmentedButtons
                    value={values.kekurangan_tajwid}
                    multiSelect
                    onValueChange={(value) => {
                      setFieldValue("kekurangan_tajwid", value);
                      setFormValues((prevValues) => {
                        const updatedValues = [...prevValues];
                        updatedValues[activePenilaian] = {
                          ...updatedValues[activePenilaian],
                          kekurangan_tajwid: value,
                        };
                        return updatedValues;
                      });
                    }}
                    buttons={[
                      {
                        value: 'Dengung',
                        label: 'Dengung',
                        showSelectedCheck: true
                      },
                      {
                        value: 'Mad',
                        label: 'Mad',
                        showSelectedCheck: true
                      },
                      {
                        value: 'Makhraj',
                        label: 'Makhraj',
                        showSelectedCheck: true
                      },
                      {
                        value: 'Tafkjim-Tarqiq',
                        label: 'Tafkjim-Tarqiq',
                        showSelectedCheck: true
                      },
                    ]}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text variant="titleSmall">Kekurangan Khusus</Text>
                  <SegmentedButtons
                    value={values.kekurangan_khusus}
                    multiSelect
                    onValueChange={(value) => {
                      setFieldValue("kekurangan_khusus", value);
                      setFormValues((prevValues) => {
                        const updatedValues = [...prevValues];
                        updatedValues[activePenilaian] = {
                          ...updatedValues[activePenilaian],
                          kekurangan_khusus: value,
                        };
                        return updatedValues;
                      });
                    }}
                    buttons={[
                      {
                        value: 'Harakat',
                        label: 'Harakat',
                        showSelectedCheck: true
                      },
                      {
                        value: 'Lafadz',
                        label: 'Lafadz',
                        showSelectedCheck: true
                      },
                      {
                        value: 'Lam Jalalah',
                        label: 'Lam Jalalah',
                        showSelectedCheck: true
                      },
                    ]}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text variant="titleSmall">Kekurangan Keserasian</Text>
                  <SegmentedButtons
                    value={values.kekurangan_keserasian}
                    multiSelect
                    onValueChange={(value) => {
                      setFieldValue("kekurangan_keserasian", value);
                      setFormValues((prevValues) => {
                        const updatedValues = [...prevValues];
                        updatedValues[activePenilaian] = {
                          ...updatedValues[activePenilaian],
                          kekurangan_keserasian: value,
                        };
                        return updatedValues;
                      });
                    }}
                    buttons={[
                      {
                        value: 'Panjang Pendek',
                        label: 'Panjang Pendek',
                        showSelectedCheck: true
                      },
                      {
                        value: 'Ikhtilash Huruf Sukun',
                        label: 'Ikhtilash Huruf Sukun',
                        showSelectedCheck: true
                      },
                      {
                        value: 'Ikhtilash Huruf Syiddah',
                        label: 'Ikhtilash Huruf Syiddah',
                        showSelectedCheck: true
                      },
                    ]}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text variant="titleSmall">Kekurangan Kelancaran</Text>
                  <SegmentedButtons
                    value={values.kekurangan_kelancaran}
                    multiSelect
                    onValueChange={(value) => {
                      setFieldValue("kekurangan_kelancaran", value);
                      setFormValues((prevValues) => {
                        const updatedValues = [...prevValues];
                        updatedValues[activePenilaian] = {
                          ...updatedValues[activePenilaian],
                          kekurangan_kelancaran: value,
                        };
                        return updatedValues;
                      });
                    }}
                    buttons={[
                      {
                        value: 'Kecepatan',
                        label: 'Kecepatan',
                        showSelectedCheck: true
                      },
                      {
                        value: 'Ketartilan',
                        label: 'Ketartilan',
                        showSelectedCheck: true
                      },
                    ]}
                  />
                  {errors.kekurangan && (
                     <Text style={styles.errorText}>{errors.kekurangan}</Text>
                  )}
                </View>
              </View> 
            )}

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
    marginBottom: 16,
    gap:8
  },
  errorText: {
    fontSize: 12,
    color: "red",
  },
});

export default Penilaian;
