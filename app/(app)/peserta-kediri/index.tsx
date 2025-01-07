import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Card,
  Chip,
  Divider,
  Searchbar,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Dropdown, DropdownInputProps } from "react-native-paper-dropdown";
import { router, useFocusEffect } from "expo-router";
import { useSnackbar } from "@/lib/services/useSnackbar";
import { useKediri } from "@/lib/services/useKediri";
import { debounce } from "lodash";
import { FlatList } from "react-native-gesture-handler";
import { PesertaKediri } from "@/lib/types/Kediri";

const Search = () => {
   const theme = useTheme();
    const {
      pesertaKediri,
      getPesertaKediri,
      setPilihPesertaKediri,
    } = useKediri();
    const [queryNama, setQueryNama] = React.useState<string>("");
    const [queryJenisKelamin, setQueryJenisKelamin] = React.useState<string>("-");
    const [queryKelompok, setQueryKelompok] = React.useState<string>("-");
    const [loading, setLoading] = React.useState(true);
    const { newSnackbar } = useSnackbar();
  
    // Debounced API call
    const fetchPesertaKediri = React.useCallback(
      debounce(async () => {
        setLoading(true);
        try {
          await getPesertaKediri(queryJenisKelamin, queryKelompok, queryNama);
        } catch (error) {
          if (error instanceof Error) {
            newSnackbar(error.message);
          }
        }
        setLoading(false);
      }, 300),
      [queryNama, queryJenisKelamin, queryKelompok]
    );

    const selectPesertaKediri = (peserta:  PesertaKediri) => {
      setPilihPesertaKediri(peserta)
      router.push('/(app)/peserta-kediri/detail')
    };
  
    useEffect(() => {
      fetchPesertaKediri();
      return fetchPesertaKediri.cancel; // Cleanup the debounce on unmount
    }, [queryNama, queryJenisKelamin, queryKelompok]);

    useFocusEffect(
      React.useCallback(() => {
        fetchPesertaKediri();
        console.log(pesertaKediri?.length);
      }, [fetchPesertaKediri])
    );
  
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
        style={{
          backgroundColor: theme.colors.elevation.level3,
          borderRadius: theme.roundness * 7,
        }}
        textColor={theme.colors.onSurface}
        outlineStyle={{
          borderRadius: theme.roundness * 7,
          borderColor: theme.colors.elevation.level3,
        }}
        right={rightIcon}
      />
    );
  
    const jenisKelaminOptions = [
      { label: "Laki-laki & Perempuan ", value: "-" },
      { label: "Laki-laki", value: "Laki-laki" },
      { label: "Perempuan", value: "Perempuan" },
    ];
  
    const kelompokOptions = [
      { label: "Semua Camp", value: "-" },
      { label: "Camp A", value: "A" },
      { label: "Camp B", value: "B" },
      { label: "Camp C", value: "C" },
      { label: "Camp D", value: "D" },
      { label: "Camp E", value: "E" },
      { label: "Camp F", value: "F" },
      { label: "Camp G", value: "G" },
      { label: "Camp H", value: "H" },
      { label: "Camp I", value: "I" },
      { label: "Camp J", value: "J" },
      { label: "Camp K", value: "K" },
      { label: "Camp L", value: "L" },
      { label: "Camp M", value: "M" },
      { label: "Camp N", value: "N" },
      { label: "Camp O", value: "O" },
      { label: "Camp P", value: "P" },
      { label: "Camp Q", value: "Q" },
      { label: "Camp R", value: "R" },
      { label: "Camp S", value: "S" },
      { label: "Camp T", value: "T" },
    ];

  return (
    <Surface style={{ flex: 1, gap: 16, padding: 16 }}>
      <Searchbar
        value={queryNama}
        loading={loading}
        onChangeText={(v) => setQueryNama(v)}
        placeholder="Cari nama peserta tes..."
      />
      <Surface style={[styles.dropdownContainer]} mode="flat">
        <View style={styles.dropdownWrapper}>
          <Dropdown
            label="Jenis Kelamin"
            placeholder="Jenis Kelamin"
            options={jenisKelaminOptions}
            value={queryJenisKelamin}
            onSelect={setQueryJenisKelamin}
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
            value={queryKelompok}
            onSelect={setQueryKelompok}
            hideMenuHeader={true}
            mode="flat"
            CustomDropdownInput={CustomDropdownInput}
          />
        </View>
      </Surface>

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            style={{ marginHorizontal: 16, marginBottom: 16 }}
            size={40}
          />
        </View>
      ) : (
        <FlatList
          style={{ borderRadius: 24 }}
          data={pesertaKediri}
          renderItem={({ item }) => (
            <ParticipantCard
              peserta={item}
              onPress={() => selectPesertaKediri(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={{ padding: 32 }} variant="bodyLarge">
              Tidak ada data peserta tes.
            </Text>
          }
        />
      )}
    </Surface>
  );
};


const ParticipantCard = ({
  peserta,
  onPress,
}: {
  peserta: PesertaKediri;
  onPress;
}) => {
  const theme = useTheme();

  return (
    <Card
      style={{
        margin: 8,
        backgroundColor: theme.colors.background,
      }}
      onPress={onPress}
    >
      <Card.Content
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <View style={{ gap: 4 }}>
          <Image
            style={{
              height: 96,
              maxHeight: "100%",
              aspectRatio: 1,
              borderColor: theme.colors.elevation.level5,
              borderWidth: 4,
              borderRadius: theme.roundness * 3,
              alignSelf: "center",
            }}
            source={{uri: "https://ppwb.kita-kita.online/registrasi-tes/images/" + peserta.foto_smartcard}}
          />
          <Chip
            icon="account-group"
            style={{
              minWidth: "auto",
              alignSelf: "center",
              paddingHorizontal: 8,
            }}
          >
            {peserta.kelompok}
            {peserta.nomor_cocard}
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
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
              {peserta.nama}
            </Text>
            {peserta.jumlah_penyimakan >
              0 && (
              <Text
                style={{
                  paddingVertical: 1,
                  paddingHorizontal: 6,
                  borderRadius: 100,
                  backgroundColor: theme.colors.error,
                }}
              >
                {peserta.jumlah_penyimakan}
              </Text>
            )}
          </View>
          {peserta.jenis_kelamin == "Laki-laki" ?
            <Text variant="titleSmall">bin {peserta.nama_ayah}</Text> :
            <Text variant="titleSmall">binti {peserta.nama_ayah}</Text>
          }
          <Divider bold style={{ marginVertical: 1 }} />

          <View>
            <Text style={{ fontWeight: "bold", color: theme.colors.onSurface }}>
              Pondok:
            </Text>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              {peserta.asal_pondok_nama}
            </Text>
          </View>

          <View>
            <Text style={{ fontWeight: "bold", color: theme.colors.onSurface }}>
              Asal Daerah:
            </Text>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              {peserta.asal_daerah_nama}
            </Text>
          </View>

          <View>
            <Text style={{ fontWeight: "bold", color: theme.colors.onSurface }}>
              Umur:
            </Text>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              {peserta.umur}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Allows items to wrap to the next line
    gap: 16,
    width: "100%",
  },
  dropdownWrapper: {
    flex: 1, // Ensures dropdowns share space equally
    minWidth: "20%", // Ensures dropdowns have a minimum width
  },
});

export default Search;
