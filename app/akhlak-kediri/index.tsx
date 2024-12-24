import React from 'react';
import { Card, Chip, Divider, Searchbar, Surface, Text, TextInput, useTheme } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { Dropdown, DropdownInputProps } from 'react-native-paper-dropdown';
import { router } from 'expo-router';

const ParticipantCard = ({
  name,
  pondok,
  asalDaerah,
  umur,
  profileImage,
  cocardNumber,
  testHistory,
  onLongPress
}) => {
  const theme = useTheme();

  return (
    <Card
      style={{
        margin: 8,
        backgroundColor: theme.colors.background,
      }}
      onLongPress={onLongPress}
    >
      <Card.Content
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <View style={{ gap: 4 }}>
          <Image
            style={{
              height: 96,
              maxHeight: '100%',
              aspectRatio: 1,
              borderColor: theme.colors.elevation.level5,
              borderWidth: 4,
              borderRadius: theme.roundness * 3,
              alignSelf: 'center',
            }}
            source={profileImage}
          />
          <Chip
            icon="account-group"
            style={{
              minWidth: 'auto',
              alignSelf: 'center',
              paddingHorizontal: 8,
            }}
          >
            {cocardNumber}
          </Chip>
        </View>

        <View
          style={{
            flex: 1,
            gap: 6,
            padding: 8,
            backgroundColor: theme.colors.elevation.level2,
            borderRadius: theme.roundness * 2,
          }}
        >
          <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
            <Text variant="titleLarge">{name}</Text>
            {testHistory > 0 && (
              <Text
                style={{
                  paddingVertical: 1,
                  paddingHorizontal: 6,
                  borderRadius: 100,
                  backgroundColor: theme.colors.error,
                }}
              >
                {testHistory}
              </Text>
            )}
          </View>
          <Divider bold style={{ marginVertical: 1 }} />

          <View>
            <Text style={{ fontWeight: 'bold', color: theme.colors.onSurface }}>Pondok:</Text>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>{pondok}</Text>
          </View>

          <View>
            <Text style={{ fontWeight: 'bold', color: theme.colors.onSurface }}>Asal Daerah:</Text>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>{asalDaerah}</Text>
          </View>

          <View>
            <Text style={{ fontWeight: 'bold', color: theme.colors.onSurface }}>Umur:</Text>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>{umur}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const Search = () => {
  const theme = useTheme();
  const [query, setQuery] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [jenisKelamin, setJenisKelamin] = React.useState<string>('Laki-laki')
  const [kelompok, setKelompok] = React.useState<string>('A')

  const CustomDropdownInput = ({
    placeholder,
    selectedLabel,
    rightIcon,
  }: DropdownInputProps) => (
    <TextInput
      mode="outlined"
      placeholder={placeholder}
      placeholderTextColor={theme.colors.onSurfaceVariant}
      value={selectedLabel}
      style={{ backgroundColor: theme.colors.elevation.level3, borderRadius: theme.roundness * 7,}}
      textColor={theme.colors.onSurface}
      outlineStyle={{borderRadius: theme.roundness * 7, borderColor: theme.colors.elevation.level3}}
      right={rightIcon}
    />
  )

  const jenisKelaminOptions = [
    { label: 'Laki-laki', value: 'Laki-laki' },
    { label: 'Perempuan', value: 'Perempuan' },
  ];

  const kelompokOptions = [
    { label: 'Camp A', value: 'A' },
    { label: 'Camp B', value: 'B' },
    { label: 'Camp C', value: 'C' },
    { label: 'Camp D', value: 'D' },
    { label: 'Camp E', value: 'E' },
    { label: 'Camp F', value: 'F' },
    { label: 'Camp G', value: 'G' },
    { label: 'Camp H', value: 'H' },
    { label: 'Camp I', value: 'I' },
    { label: 'Camp J', value: 'J' },
    { label: 'Camp K', value: 'K' },
    { label: 'Camp L', value: 'L' },
    { label: 'Camp M', value: 'M' },
    { label: 'Camp N', value: 'N' },
    { label: 'Camp O', value: 'O' },
    { label: 'Camp P', value: 'P' },
    { label: 'Camp Q', value: 'Q' },
    { label: 'Camp R', value: 'R' },
    { label: 'Camp S', value: 'S' },
    { label: 'Camp T', value: 'T' },
  ];

  // Search logic
  React.useEffect(() => {
    if (query !== '') {
      setLoading(true)
    }

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [query])

  const participants = [
    {
      name: 'Reza Rahardian',
      pondok: 'PPM Roudlotul Jannah Surakarta',
      asalDaerah: 'Bantul Selatan',
      umur: 21,
      profileImage: require('@/assets/images/dummy-profile.png'),
      cocardNumber: 'A-12',
      testHistory: 3,
      onLongPress: () => router.push('/akhlak-kediri/penilaian'),
    },
    {
      name: 'Muhammad Iqbal',
      pondok: 'PPM Nurul Huda',
      asalDaerah: 'Solo Utara',
      umur: 22,
      profileImage: require('@/assets/images/dummy-profile.png'),
      cocardNumber: 'B-34',
      testHistory: 0,
      onLongPress: () => router.push('/akhlak-kediri/penilaian'),
    },
  ];

  return (
    <Surface style={{ flex: 1, gap: 16, padding: 16 }}>
      <Searchbar
        value={query}
        loading={loading}
        onChangeText={(v) => setQuery(v)}
        placeholder="Cari nama peserta tes..."
      />
      <Surface style={[styles.dropdownContainer]} mode="flat">
        <View style={styles.dropdownWrapper}>
          <Dropdown
            label="Jenis Kelamin"
            placeholder="Jenis Kelamin"
            options={jenisKelaminOptions}
            value={jenisKelamin}
            onSelect={setJenisKelamin}
            hideMenuHeader={true}
            mode="flat"
            CustomDropdownInput={CustomDropdownInput}
          />
        </View>
        <View style={styles.dropdownWrapper}>
          <Dropdown
            label="Kelompok"
            placeholder="Kelompok"
            options={kelompokOptions}
            value={kelompok}
            onSelect={setKelompok}
            hideMenuHeader={true}
            mode="flat"
            CustomDropdownInput={CustomDropdownInput}
          />
        </View>
      </Surface>

      <ScrollView style={{ borderRadius: 24 }}>
        {participants.map((participant, index) => (
          <ParticipantCard key={index} {...participant} />
        ))}
      </ScrollView>
    </Surface>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows items to wrap to the next line
    gap: 16,
    width: '100%',
  },
  dropdownWrapper: {
    flex: 1, // Ensures dropdowns share space equally
    minWidth: '20%', // Ensures dropdowns have a minimum width
  },
});

export default Search;
