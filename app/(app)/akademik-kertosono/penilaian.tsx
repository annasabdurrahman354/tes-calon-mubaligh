import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Checkbox,
  Chip,
  IconButton,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import * as Yup from "yup";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { Formik } from "formik";
import { SegmentedButtons } from "react-native-paper";
import { useKertosono } from "@/lib/services/useKertosono";
import { router } from "expo-router";
import { useSnackbar } from "@/lib/services/useSnackbar";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useAuth } from "@/lib/services/useAuth";
import CheckboxGroup from "@/lib/components/CheckboxGroup";
import AkademikKertosonoCard from "@/lib/components/AkademikKertosonoCard";
import {getFirstValidWord} from "@/lib/types/Kertosono";

const Penilaian = () => {
  const theme = useTheme();
  const [tab, setTab] = useState("penilaian");
  const [loading, setLoading] = useState(false);
  const [activePenilaian, setActivePenilaian] = useState(0);
  const {user} = useAuth();

  const {
    storeAkademikKertosono,
    selectedPesertaKertosono,
    removeSelectedPesertaKertosono,
    formValues,
    setFormValues
  } = useKertosono();

  // Prevent rendering until selectedPesertaKertosono is valid
  if (!selectedPesertaKertosono || selectedPesertaKertosono.length === 0) {
    router.replace("/(app)/akademik-kertosono"); // Redirect to home
    
    return null; // Optionally render a loading spinner or blank state
  }

  useEffect(() => {
    if (!selectedPesertaKertosono || selectedPesertaKertosono.length === 0) {
      router.replace("/(app)/akademik-kertosono"); // Redirect to home
    }
    const updatedFormValues = selectedPesertaKertosono.map((peserta) => {
      const existingForm = formValues.find(
        (form) => form.tes_santri_id === peserta.id
      );
  
      if (peserta.telah_disimak) {
        // Check if the peserta has a matching akademik entry for the guru_id
        const akademikEntry = peserta.akademik?.find(
          (akademik) => akademik.guru_id == user?.id
        );
  
        if (akademikEntry) {
          // Pre-fill the form with data from akademikEntry
          return (
            existingForm || {
              tes_santri_id: peserta.id,
              penilaian: akademikEntry.penilaian || "",
              kekurangan_tajwid: akademikEntry.kekurangan_tajwid || [],
              kekurangan_khusus: akademikEntry.kekurangan_khusus || [],
              kekurangan_keserasian: akademikEntry.kekurangan_keserasian || [],
              kekurangan_kelancaran: akademikEntry.kekurangan_kelancaran || [],
              catatan: akademikEntry.catatan || "",
              rekomendasi_penarikan: akademikEntry.rekomendasi_penarikan || false,
              awal_penilaian: Date.now(),
              akhir_penilaian: null,
              durasi_penilaian: akademikEntry.durasi_penilaian
            }
          );
        }
      }
  
      // Default to existingForm or a blank form for this peserta
      return (
        existingForm || {
          tes_santri_id: peserta.id,
          penilaian: "",
          kekurangan_tajwid: [],
          kekurangan_khusus: [],
          kekurangan_keserasian: [],
          kekurangan_kelancaran: [],
          catatan: "",
          rekomendasi_penarikan: false,
          awal_penilaian: Date.now(),
          akhir_penilaian: null,
          durasi_penilaian: null
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
                source={{uri: peserta.foto_smartcard}}
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
                {getFirstValidWord(peserta.nama_lengkap)} - {peserta.kelompok}
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
          onPress={() => router.back()}
        />
      </View>

      <ScrollView style={{ paddingBottom: 16 }}>
        <Card style={{ margin: 16 }} mode="outlined">
          <Card.Content>
            <View style={styles.header}>
              <Avatar.Image
                size={72}
                source={{uri: selectedPesertaKertosono[activePenilaian].foto_smartcard}}
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
                  {selectedPesertaKertosono[activePenilaian].nama_lengkap}
                </Text>
                {selectedPesertaKertosono[activePenilaian].jenis_kelamin == "Laki-laki" ?
                  <Text variant="titleSmall">bin {selectedPesertaKertosono[activePenilaian].nama_ayah}</Text> :
                  <Text variant="titleSmall">binti {selectedPesertaKertosono[activePenilaian].nama_ayah}</Text>
                }
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
              label: "Riwayat Penyimakan",
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
            <View style={{gap: 12, marginHorizontal:16, flexDirection: 'column'}}>
                {selectedPesertaKertosono[activePenilaian]?.akademik.map((item) => (
                    <AkademikKertosonoCard key={item.id} data={item} />
                ))}
            </View>
        )}
      </ScrollView>
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
          
          const akhirPenilaian = Date.now(); // Current timestamp
          const awalPenilaian = formValues[activePenilaian]?.awal_penilaian || akhirPenilaian;

          // Calculate durasi_penilaian in minutes and round
          const durasiPenilaianMinutes = formValues[activePenilaian]?.durasi_penilaian ? formValues[activePenilaian]?.durasi_penilaian : Math.round((akhirPenilaian - awalPenilaian) / 60000);

          // Update the active form values with `akhir_penilaian` and `durasi_penilaian`
          const updatedFormValues = {
            ...formValues[activePenilaian],
            akhir_penilaian: akhirPenilaian,
            durasi_penilaian: durasiPenilaianMinutes,
          };

          setFormValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[activePenilaian] = updatedFormValues;
            return newValues;
          });

          // Store the updated form values via API
          const storedForm = await storeAkademikKertosono(
            updatedFormValues.tes_santri_id,
            updatedFormValues.penilaian,
            updatedFormValues.penilaian == "Lulus" ? null : updatedFormValues.kekurangan_tajwid,
            updatedFormValues.penilaian == "Lulus" ? null : updatedFormValues.kekurangan_khusus,
            updatedFormValues.penilaian == "Lulus" ? null : updatedFormValues.kekurangan_keserasian,
            updatedFormValues.penilaian == "Lulus" ? null : updatedFormValues.kekurangan_kelancaran,
            updatedFormValues.catatan,
            updatedFormValues.rekomendasi_penarikan,
            updatedFormValues.durasi_penilaian
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
                  <CheckboxGroup
                    label="Kekurangan Tajwid"
                    options={[
                      { value: "Dengung", label: "Dengung" },
                      { value: "Mad", label: "Mad" },
                      { value: "Makhraj", label: "Makhraj" },
                      { value: "Tafkhim-Tarqiq", label: "Tafkhim-Tarqiq" },
                    ]}
                    values={values.kekurangan_tajwid}
                    onChange={(value) => {
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
                  />
                </View>

                <View style={styles.inputGroup}>
                  <CheckboxGroup
                    label="Kekurangan Khusus"
                    options={[
                      { value: "Harakat", label: "Harakat" },
                      { value: "Lafadz", label: "Lafadz" },
                      { value: "Lam Jalalah", label: "Lam Jalalah" },
                    ]}
                    values={values.kekurangan_khusus}
                    onChange={(value) => {
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
                  />
                </View>

                <View style={styles.inputGroup}>
                  <CheckboxGroup
                    label="Kekurangan Keserasian"
                    options={[
                      { value: "Panjang Pendek", label: "Panjang Pendek" },
                      { value: "Ikhtilash Huruf Sukun", label: "Ikhtilash Huruf Sukun" },
                      { value: "Ikhtilash Huruf Syiddah", label: "Ikhtilash Huruf Syiddah" },
                    ]}
                    values={values.kekurangan_keserasian}
                    onChange={(value) => {
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
                  />
                </View>

                <View style={styles.inputGroup}>
                  <CheckboxGroup
                    label="Kekurangan Kelancaran"
                    options={[
                      { value: "Kecepatan", label: "Kecepatan" },
                      { value: "Ketartilan", label: "Ketartilan" },
                    ]}
                    values={values.kekurangan_kelancaran}
                    onChange={(value) => {
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

              {values.penilaian === "Lulus" && (
                  <Checkbox.Item
                      label="Rekomendasi Penarikan"
                      status={values.rekomendasi_penarikan ? 'checked' : 'unchecked'}
                      onPress={() => {
                          const newValue = !values.rekomendasi_penarikan;

                          setFieldValue("rekomendasi_penarikan", newValue);

                          setFormValues((prevValues) => {
                              const updatedValues = [...prevValues];
                              updatedValues[activePenilaian] = {
                                  ...updatedValues[activePenilaian],
                                  rekomendasi_penarikan: newValue, // Fix: Use newValue instead of undefined "value"
                              };
                              return updatedValues;
                          });
                      }}
                  />
              )}

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
