import React from 'react'
import { Avatar, Button, Card, Chip, IconButton, RadioButton, Surface, Text, TextInput, useTheme } from 'react-native-paper'
import { ScrollView, StyleSheet, View } from "react-native";
import { Image } from 'expo-image';
import * as Yup from 'yup';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { Formik } from 'formik';

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  nilaiMakna: Yup.string().required('Nilai Makna is required'),
  nilaiKeterangan: Yup.string().required('Nilai Keterangan is required'),
  nilaiPenjelasan: Yup.string().required('Nilai Penjelasan is required'),
  nilaiPemahaman: Yup.string().required('Nilai Pemahaman is required'),
  catatanPenguji: Yup.string(), // Optional field
});

const FormPenilaian = () => {
  const theme = useTheme();

  return (
    <Formik
      initialValues={{
        nilaiMakna: '',
        nilaiKeterangan: '',
        nilaiPenjelasan: '',
        nilaiPemahaman: '',
        catatanPenguji: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleChange, handleSubmit, setFieldValue, errors, touched }) => (
        <Card style={{ marginHorizontal: 16, marginBottom: 16}} mode="outlined">
          <Card.Content>
            <View style={styles.info}>
              <Text variant="titleLarge" style={{ color: theme.colors.onPrimaryContainer, fontWeight: '500' }}>
                Form Penilaian
              </Text>
            </View>

            {/* Nilai Makna Radio Buttons */}
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

            {/* Nilai Keterangan Radio Buttons */}
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

            {/* Nilai Penjelasan Radio Buttons */}
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

            {/* Nilai Pemahaman Radio Buttons */}
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

            {/* Catatan Penguji TextInput */}
            <TextInput
              label="Catatan Penguji"
              value={values.catatanPenguji}
              onChangeText={handleChange('catatanPenguji')}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={styles.textInput}
            />
          </Card.Content>

          <Card.Actions>
            <Button icon={'delete'}>
              Hapus
            </Button>
            <Button icon="content-save-outline" mode="contained">
              Simpan
            </Button>
          </Card.Actions>
        </Card>
      )}
    </Formik>
  );
};

const Search = () => {
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();

  return (
    <Surface style={{ flex: 1, gap: 16}}>
      <View style={{ 
        flexDirection: 'row', 
        padding: 8, 
        justifyContent: 'center', 
        alignItems: 'center',
        flexWrap: 'wrap',  
        gap: 8,
        backgroundColor: theme.colors.elevation.level2 
      }}>
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
                borderColor: theme.colors.primaryContainer, 
                borderWidth: 4,
                borderRadius: 1000
              }} 
              source={require('@/assets/images/dummy-profile.png')} 
            />
            <Text 
              style={{
                backgroundColor: theme.colors.primaryContainer,
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
        <IconButton
          icon="plus"
          mode="contained"
          iconColor={theme.colors.primary}
          size={24}
          onPress={() => console.log('Pressed')}
        />
      </View>
      <ScrollView>
        <Card style={{marginHorizontal: 16, marginBottom: 16}} mode='outlined'>
          <Card.Content>
            <View style={styles.header}>
              <Avatar.Image
                size={72}
                source={require('@/assets/images/dummy-profile.png')}
              />
              <View style={styles.info}>
                <Text variant="titleLarge" style={{color: theme.colors.onPrimaryContainer, fontWeight:500}}>Annas Abdurrahman</Text>
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
              <Chip icon="map-marker" style={{backgroundColor:theme.colors.elevation.level3}}>
                Bantul Selatan
              </Chip>
              <Chip icon="school" style={{backgroundColor:theme.colors.elevation.level3}}>
                S1 - Informatika
              </Chip>
              <Chip icon="calendar" style={{backgroundColor:theme.colors.elevation.level3}}>
                21 years old
              </Chip>
            </View>
          </Card.Content>
        </Card>
        <FormPenilaian></FormPenilaian>
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
  info: {
    flex: 1,
    marginBottom: 8
  },

  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
  radioGroup: {
    flexDirection: 'row', // This makes the radio buttons appear horizontally
    flexWrap: 'nowrap', // Allows wrapping if there are many options
    marginBottom: 16,
    justifyContent: 'flex-start'
  },
  textInput: {
    marginBottom: 16,
  },
});

export default Search
