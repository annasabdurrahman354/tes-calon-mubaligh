import React from 'react'
import { Avatar, Button, Card, Chip, IconButton, RadioButton, Surface, Text, TextInput, useTheme } from 'react-native-paper'
import { ScrollView, StyleSheet, View } from "react-native";
import { Image } from 'expo-image';
import * as Yup from 'yup';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { Formik } from 'formik';
import { SegmentedButtons } from 'react-native-paper';
import { DataTable } from 'react-native-paper';

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  nilaiMakna: Yup.string().required('Nilai makna harus dipilih.'),
  nilaiKeterangan: Yup.string().required('Nilai keterangan harus dipilih.'),
  nilaiPenjelasan: Yup.string().required('Nilai penjelasan harus dipilih.'),
  nilaiPemahaman: Yup.string().required('Nilai pemahaman harus dipilih.'),
  catatanPenguji: Yup.string(), // Optional field
});

const FormPenilaianAkademikKediri = () => {
  const theme = useTheme();

  return (
    <Formik
      initialValues={{
        nilaiMakna: '',
        nilaiKeterangan: '',
        nilaiPenjelasan: '',
        nilaiPemahaman: '',
        catatan: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleChange, handleSubmit, setFieldValue, errors, touched }) => (
        <Card style={{ marginHorizontal: 16, marginBottom: 16}} mode="outlined">
          <Card.Content>
            <View style={{
              flex: 1,
              marginBottom: 16
            }}>
              <Text variant="titleLarge" style={{ color: theme.colors.onPrimaryContainer, fontWeight: '500' }}>
                Form Penilaian
              </Text>
            </View>

            {/* Nilai Makna Radio Buttons */}
            <View style={styles.inputGroup}>
              <Text variant='titleSmall'>Nilai Makna</Text>
              <RadioButton.Group
                value={values.nilaiMakna}
                onValueChange={(value) => setFieldValue('nilaiMakna', value)}
              >
                <View style={styles.radioGroup}>
                <RadioButton.Item position='leading' label="60" value="60" />
                  <RadioButton.Item position='leading' label="70" value="70" />
                  <RadioButton.Item position='leading' label="80" value="80" />
                  <RadioButton.Item position='leading' label="90" value="90" />
                </View>
              </RadioButton.Group>
              {errors.nilaiMakna && touched.nilaiMakna && (
                <Text style={styles.errorText}>{errors.nilaiMakna}</Text>
              )}
            </View>

            {/* Nilai Keterangan Radio Buttons */}
            <View style={styles.inputGroup}>
              <Text variant='titleSmall'>Nilai Keterangan</Text>
              <RadioButton.Group
                value={values.nilaiKeterangan}
                onValueChange={(value) => setFieldValue('nilaiKeterangan', value)}
              >
                <View style={styles.radioGroup}>
                  <RadioButton.Item position='leading' label="60" value="60" />
                  <RadioButton.Item position='leading' label="70" value="70" />
                  <RadioButton.Item position='leading' label="80" value="80" />
                  <RadioButton.Item position='leading' label="90" value="90" />
                </View>
              </RadioButton.Group>
              {errors.nilaiKeterangan && touched.nilaiKeterangan && (
                <Text style={styles.errorText}>{errors.nilaiKeterangan}</Text>
              )}
            </View>

            
            {/* Nilai Penjelasan Radio Buttons */}
            <View style={styles.inputGroup}>
              <Text variant='titleSmall'>Nilai Penjelasan</Text>
              <RadioButton.Group
                value={values.nilaiPenjelasan}
                onValueChange={(value) => setFieldValue('nilaiPenjelasan', value)}
              >
                <View style={styles.radioGroup}>
                  <RadioButton.Item position='leading' label="60" value="60" />
                  <RadioButton.Item position='leading' label="70" value="70" />
                  <RadioButton.Item position='leading' label="80" value="80" />
                  <RadioButton.Item position='leading' label="90" value="90" />
                </View>
              </RadioButton.Group>
              {errors.nilaiPenjelasan && touched.nilaiPenjelasan && (
                <Text style={styles.errorText}>{errors.nilaiPenjelasan}</Text>
              )}
            </View>

            {/* Nilai Pemahaman Radio Buttons */}
            <View style={styles.inputGroup}>
              <Text variant='titleSmall'>Nilai Pemahaman</Text>
              <RadioButton.Group
                value={values.nilaiPemahaman}
                onValueChange={(value) => setFieldValue('nilaiPemahaman', value)}
              >
                <View style={styles.radioGroup}>
                <RadioButton.Item position='leading' label="60" value="60" />
                  <RadioButton.Item position='leading' label="70" value="70" />
                  <RadioButton.Item position='leading' label="80" value="80" />
                  <RadioButton.Item position='leading' label="90" value="90" />
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
              onChangeText={handleChange('catatan')}
              multiline
              numberOfLines={4}
              mode="outlined"
              style={{
                marginBottom: 16,
              }}
             />
          </Card.Content>

          <Card.Actions>
            <Button icon={'delete'}>
              Hapus
            </Button>
            <Button icon="content-save-outline" onPress={() => handleSubmit()}>
              Simpan
            </Button>
          </Card.Actions>
        </Card>
      )}
    </Formik>
  );
};

const Penilaian = () => {
  const [tab, setTab] = React.useState('penilaian');
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();
  const [riwayatPenilaianAkademikKediri] = React.useState([
    {
      key: 1,
      guru: 'Pak Qohar',
      nilaiRataRata: 80,
      catatan: "Anaknya lucu kayak kelinci.",
      status: "Lulus",
    },
    {
      key: 2,
      guru: 'Pak Reza',
      nilaiRataRata: 50,
      catatan: "Belum bisa mengambil hikmah.",
      status: "Tidak Lulus",
    },
  ]);
  

  return (
    <Surface style={{ flex: 1}}>
      {/* List peserta tes yang dipilih untuk disimak */}
      <View style={{ 
        flexDirection: 'row', 
        padding: 8, 
        justifyContent: 'center', 
        alignItems: 'center',
        flexWrap: 'wrap',  
        gap: 8,
        backgroundColor: theme.colors.elevation.level2 
      }}>
        {/* Peserta tes yang sedang aktif dinilai */}
        <RNBounceable
          bounceEffectIn={0.7}
          onPress={() => {}}
        >
          <View style={{ alignItems: 'center', gap:8 }}>
            <Image 
              style={{ 
                width: 64, 
                height: 64, 
                aspectRatio: 1, 
                borderColor: theme.colors.inversePrimary, 
                borderWidth: 4,
                borderRadius: 1000
              }} 
              source={require('@/assets/images/dummy-profile.png')} 
            />
            <Text 
              style={{
                backgroundColor: theme.colors.inversePrimary,
                padding: 6,
                borderRadius: 16,
                textAlign: 'center',
              }}
              variant={'bodySmall'}
            >
              Muhammad - B12
            </Text>
          </View>
        </RNBounceable>

        {/* Peserta tes yang menunggu dinilai */}
        <RNBounceable
          bounceEffectIn={0.7}
          onPress={() => {}}
        >
          <View style={{ alignItems: 'center', gap:8 }}>
            <Image 
              style={{ 
                width: 64, 
                height: 64, 
                aspectRatio: 1, 
                borderColor: theme.colors.elevation.level3, 
                borderWidth: 4,
                borderRadius: 1000
              }} 
              source={require('@/assets/images/dummy-profile.png')} 
            />
            <Text 
              style={{
                backgroundColor: theme.colors.elevation.level3,
                padding: 6,
                borderRadius: 16,
                textAlign: 'center',
              }}
              variant={'bodySmall'}
            >
              Reza - A12
            </Text>
          </View>
        </RNBounceable>

        {/* Tambah peserta tes yang dinilai */}
        <IconButton
          icon="plus"
          mode="contained"
          iconColor={theme.colors.primary}
          size={24}
          onPress={() => console.log('Pressed')}
        />
      </View>

      <ScrollView>
        <Card style={{margin: 16}} mode='outlined'>
          <Card.Content>
            <View style={styles.header}>
              <Avatar.Image
                size={72}
                source={require('@/assets/images/dummy-profile.png')}
              />
              <View style={{
                flex: 1,
                marginBottom: 8
              }}>
                {/* Nama peserta tes */}
                <Text variant="titleLarge" style={{color: theme.colors.onPrimaryContainer, fontWeight:500}}>Annas Abdurrahman</Text>
                
                {/* Asal pondok peserta tes */}
                <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
                  PPM Roudlotul Jannah Surakarta
                </Text>
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: 16,
              gap: 8,
            }}>
              {/* Chip asal daerah peserta tes */}
              <Chip icon="map-marker" style={{backgroundColor:theme.colors.elevation.level3}}>
                Bantul Selatan
              </Chip>
              {/* Chip pendidikan terakhir terdiri dari Jenjang Pendidikan - Jurusan */}
              <Chip icon="school" style={{backgroundColor:theme.colors.elevation.level3}}>
                S1 - Informatika
              </Chip>
              <Chip icon="calendar" style={{backgroundColor:theme.colors.elevation.level3}}>
                21 Tahun
              </Chip>
            </View>
          </Card.Content>
        </Card>

        {/* Jika penilaian aktif maka Form Penilaian muncul, jika riwayat aktif maka tabel muncul */}
        <SegmentedButtons
          style={{marginBottom: 16, marginHorizontal: 16}}
          value={tab}
          onValueChange={setTab}
          buttons={[
            {
              value: 'penilaian',
              label: 'Penilaian',
            },
            {
              value: 'riwayat',
              label: 'Riwayat Penilaian',
            },
          ]}
        />
        {
          tab === 'penilaian' ?  <FormPenilaianAkademikKediri/> : 
          <Card style={{marginHorizontal: 16, marginBottom: 16}} mode='outlined'>
            <Card.Content>
              {/* Tabel riwayat pengujian oleh guru lain */}
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Dewan Guru</DataTable.Title>
                  <DataTable.Title>Nilai Rata-Rata</DataTable.Title>
                  <DataTable.Title>Catatan Penguji</DataTable.Title>
                  <DataTable.Title>Status</DataTable.Title>
                </DataTable.Header>
        
                {riwayatPenilaianAkademikKediri.map((item) => (
                  <DataTable.Row key={item.key}>
                    <DataTable.Cell>{item.guru}</DataTable.Cell>
                    <DataTable.Cell>{item.nilaiRataRata}</DataTable.Cell>
                    <DataTable.Cell>{item.catatan}</DataTable.Cell>
                    <DataTable.Cell>{item.status}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </Card.Content>
          </Card>
        }
      </ScrollView>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  
  inputGroup: {
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: 'row', // This makes the radio buttons appear horizontally
    flexWrap: 'nowrap', // Allows wrapping if there are many options
    justifyContent: 'flex-start'
  },
  errorText: {
    marginTop: -2,
    fontSize: 12,
    color: 'red',
  },
});

export default Penilaian
