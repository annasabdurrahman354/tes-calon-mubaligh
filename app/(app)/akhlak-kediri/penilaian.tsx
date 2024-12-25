import React from 'react'
import { Avatar, Button, Card, Chip, HelperText, Surface, Text, TextInput, useTheme } from 'react-native-paper'
import { ScrollView, StyleSheet, View } from "react-native";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { SegmentedButtons } from 'react-native-paper';
import { DataTable } from 'react-native-paper';

const FormPenilaianAkhlakKediri = () => {
  const theme = useTheme();

  return (
    <Formik
      initialValues={{
        catatan: '',
        poin: '',
      }}
      validationSchema={ Yup.object().shape({
        catatan: Yup.string().required('Catatan akhlak harus diisi.'),
        poin: Yup.string().required('Poin akhlak harus diisi.'),
      })}
      onSubmit={(values) => {
        console.log(values);
      }}>
      {({ handleChange, handleSubmit, values, errors }) => (
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

            <Surface elevation={0} style={styles.inputGroup}>
              <TextInput
                label="Catatan Akhlak"
                value={values.catatan}
                error={!!errors.catatan}
                onChangeText={handleChange('catatan')}
                multiline
                numberOfLines={4}
                mode="outlined"
              />
              <HelperText type="error" visible={!!errors.catatan}>
                {errors.catatan}
              </HelperText>
            </Surface>

            <Surface elevation={0} style={styles.inputGroup}>
              <TextInput
                label="Poin"
                value={values.poin}
                error={!!errors.poin}
                onChangeText={handleChange('poin')}
                keyboardType='numeric'
                mode="outlined"
              />
              <HelperText type="error" visible={!!errors.poin}>
                {errors.poin}
              </HelperText>
            </Surface>
          </Card.Content>

          <Card.Actions>
            <Button icon={'delete'}>
              Hapus
            </Button>
            <Button icon="content-save-outline" mode="contained" onPress={() => handleSubmit()}>
              Simpan
            </Button>
          </Card.Actions>
        </Card>
      )}
    </Formik>
  );
};

const Penilaian = () => {
  const theme = useTheme();
  const [tab, setTab] = React.useState('penilaian');
  const [loading, setLoading] = React.useState(false);
  
  const [riwayatPenilaianAkhlakKediri] = React.useState([
    {
      key: 1,
      tanggal: '12/12/2024',
      guru: 'Pak Qohar',
      catatan: "Merokok di lingkungan pondok.",
      poin: 20,
    },
    {
      key: 2,
      tanggal: '19/12/2024',
      guru: 'Pak Reza',
      catatan: "Mabuk di lingkungan pondok.",
      poin: 70,
    },
   ]);

  return (
    <Surface style={{ flex: 1}}>
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
          tab === 'penilaian' ?  <FormPenilaianAkhlakKediri/> :   
          <Card style={{marginHorizontal: 16, marginBottom: 16}} mode='outlined'>
            <Card.Content>
              {/* Tabel riwayat poin akhlak */}
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Tanggal</DataTable.Title>
                  <DataTable.Title numberOfLines={2}>Pengirim</DataTable.Title>
                  <DataTable.Title numberOfLines={2}>Catatan</DataTable.Title>
                  <DataTable.Title numeric>Poin</DataTable.Title>
                </DataTable.Header>

                {riwayatPenilaianAkhlakKediri.map((item) => (
                  <DataTable.Row key={item.key}>
                    <DataTable.Cell>{item.tanggal}</DataTable.Cell>
                    <DataTable.Cell>{item.guru}</DataTable.Cell>
                    <DataTable.Cell>{item.catatan}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.poin}</DataTable.Cell>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  inputGroup: {
    marginBottom: 8,
  },
  errorText: {
    marginTop: -2,
    fontSize: 12,
    color: 'red',
  },
});

export default Penilaian
