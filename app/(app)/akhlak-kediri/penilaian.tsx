import { useState } from "react";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Chip,
  HelperText,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { SegmentedButtons } from "react-native-paper";
import { DataTable } from "react-native-paper";
import { useKediri } from "@/lib/services/useKediri";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useSnackbar } from "@/lib/services/useSnackbar";
import { router } from "expo-router";

const Penilaian = () => {
  const theme = useTheme();
  const [tab, setTab] = useState("penilaian");
  const [loading, setLoading] = useState(false);
  const { pilihPesertaKediri, setPilihPesertaKediri, storeAkhlakKediri } = useKediri();
  const [formValues, setFormValues] = useState({
    tes_santri_id: pilihPesertaKediri?.id,
    poin: "",
    catatan: "",
  });

  return (
    <Surface style={{ flex: 1 }}>
      <ScrollView>
        <Card style={{ margin: 16 }} mode="outlined">
          <Card.Content>
            <View style={styles.header}>
              <Avatar.Image
                size={72}
                source={{uri: pilihPesertaKediri?.foto_smartcard}}
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
                  {pilihPesertaKediri?.nama_lengkap}
                </Text>
                {pilihPesertaKediri?.jenis_kelamin == "L" ?
                  <Text variant="titleSmall">bin {pilihPesertaKediri?.nama_ayah}</Text> :
                  <Text variant="titleSmall">binti {pilihPesertaKediri?.nama_ayah}</Text>
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
                icon="account-group"
                style={{
                  paddingHorizontal: 8,
                }}
              >
                {pilihPesertaKediri?.kelompok}
                {pilihPesertaKediri?.nomor_cocard}
              </Chip>
              <Chip
                icon={() => (
                  <FontAwesome5 name="mosque" color={theme.colors.primary} />
                )}
                style={{ backgroundColor: theme.colors.elevation.level3 }}
              >
                {pilihPesertaKediri?.asal_pondok_nama}
              </Chip>
              {/* Chip asal daerah peserta tes */}
              <Chip
                icon="map-marker"
                style={{ backgroundColor: theme.colors.elevation.level3 }}
              >
                {pilihPesertaKediri?.asal_daerah_nama}
              </Chip>
              {/* Chip pendidikan terakhir terdiri dari Jenjang Pendidikan - Jurusan */}
              <Chip
                icon="school"
                style={{ backgroundColor: theme.colors.elevation.level3 }}
              >
                {pilihPesertaKediri?.pendidikan}
              </Chip>
              <Chip
                icon="calendar"
                style={{ backgroundColor: theme.colors.elevation.level3 }}
              >
                {pilihPesertaKediri?.umur} tahun
              </Chip>
            </View>
          </Card.Content>
        </Card>


        {/* Jika penilaian aktif maka Form Penilaian muncul, jika riwayat aktif maka tabel muncul */}
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
          <FormPenilaianAkhlakKediri 
            loading={loading}
            setLoading={setLoading}
            formValues={formValues}
            setFormValues={setFormValues}
            storeAkhlakKediri={storeAkhlakKediri}
            setPilihPesertaKediri={setPilihPesertaKediri}
          />
        ) : (
          <Card
            style={{ marginHorizontal: 16, marginBottom: 16 }}
            mode="outlined"
          >
            <Card.Content>
              {/* Tabel riwayat poin akhlak */}
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title numberOfLines={2}>Pengirim</DataTable.Title>
                  <DataTable.Title numberOfLines={2}>Catatan</DataTable.Title>
                  <DataTable.Title numeric>Poin</DataTable.Title>
                </DataTable.Header>

                {pilihPesertaKediri?.akhlak.map((item) => (
                  <DataTable.Row key={item.id}>
                    <DataTable.Cell>{item.guru_nama}</DataTable.Cell>
                    <DataTable.Cell>{item.catatan}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.poin}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </Surface>
  );
};

const validationSchema = Yup.object().shape({
  catatan: Yup.string().required("Catatan akhlak harus diisi."),
  poin: Yup.string().required("Poin akhlak harus diisi.").max(100, "Poin tidak boleh lebih dari 100.").min(0, "Poin tidak boleh kurang dari 0."),
})

const FormPenilaianAkhlakKediri = ({
  loading,
  setLoading,
  formValues,
  setFormValues,
  storeAkhlakKediri,
  setPilihPesertaKediri,
}) => {
  const theme = useTheme();
  const { newSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={formValues}
      validationSchema={validationSchema}
      enableReinitialize // Allows reinitialization when `initialValues` change
      onSubmit={async (values) => {
        try {
          // Call the API to store the form data
          setLoading(true);
          const storedForm = await storeAkhlakKediri(
            formValues.tes_santri_id,
            formValues.poin,
            formValues.catatan
          );

          newSnackbar(storedForm.message);
          console.log("Form stored successfully:", storedForm);
          setPilihPesertaKediri(null);
          router.back()
        } catch (error) {
          if (error instanceof Error) {
            newSnackbar(error.message);
          }
        }
        setLoading(false);
      }}
    >
      {({ handleSubmit,setFieldValue, touched, values, errors }) => (
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

            <Surface elevation={0} style={styles.inputGroup}>
              <TextInput
                label="Poin"
                value={values.poin}
                error={!!errors.poin}
                onChangeText={(text) => {
                  setFieldValue("poin", text)
                  setFormValues((prev) => ({ ...prev, poin: text }))
                }}
                keyboardType="numeric"
                mode="outlined"
              />
              <HelperText type="error" visible={errors.poin && touched.poin}>
                {errors.poin}
              </HelperText>
            </Surface>

            <Surface elevation={0} style={styles.inputGroup}>
              <TextInput
                label="Catatan Akhlak"
                value={values.catatan}
                error={!!errors.catatan}
                onChangeText={(text) => {
                  setFieldValue("catatan", text)
                  setFormValues((prev) => ({ ...prev, catatan: text }))
                }}               
                multiline
                numberOfLines={4}
                mode="outlined"
              />
              <HelperText type="error" visible={errors.catatan && touched.catatan}>
                {errors.catatan}
              </HelperText>
            </Surface>
           
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
                onPress={() => {
                  setPilihPesertaKediri(null)
                  router.back()
                }}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  inputGroup: {
    marginBottom: 8,
  },
  errorText: {
    marginTop: -2,
    fontSize: 12,
    color: "red",
  },
});

export default Penilaian;
