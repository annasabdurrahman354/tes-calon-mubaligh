import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Avatar,
  Card,
  Chip,
  Divider,
  FAB,
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
import { useKertosono } from "@/lib/services/useKertosono";
import { FlatList } from "react-native-gesture-handler";
import { PesertaKertosono } from "@/lib/types/Kertosono";
import { debounce } from "lodash";
import { useSnackbar } from "@/lib/services/useSnackbar";
import { useAuth } from "@/lib/services/useAuth";

const Search = () => {
  const theme = useTheme();
  const {
    pesertaKertosono,
    selectedPesertaKertosono,
    clearSelectedPesertaKertosono,
    getPesertaKertosono,
    toggleSelectedPesertaKertosono,
    isSelectedPesertaKertosono,
  } = useKertosono();
  const [queryNamaOrCocard, setQueryNamaOrCocard] = React.useState<string>("");
  const [queryJenisKelamin, setQueryJenisKelamin] = React.useState<string>("-");
  const [loading, setLoading] = React.useState(true);
  const { newSnackbar } = useSnackbar();

  // Debounced API call
  const fetchPesertaKertosono = React.useCallback(
    debounce(async () => {
      setLoading(true);
      try {
        await getPesertaKertosono(queryJenisKelamin, queryNamaOrCocard);
      } catch (error) {
        if (error instanceof Error) {
          newSnackbar(error.message);
        }
      }
      setLoading(false);
    }, 300),
    [queryNamaOrCocard, queryJenisKelamin]
  );

  useEffect(() => {
    fetchPesertaKertosono();
    return fetchPesertaKertosono.cancel; // Cleanup the debounce on unmount
  }, [queryNamaOrCocard, queryJenisKelamin]);

  useEffect(() => {
    // Run removeSelectedPesertaKertosono once when the component is mounted
    clearSelectedPesertaKertosono();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchPesertaKertosono();
      console.log(pesertaKertosono?.length);
    }, [fetchPesertaKertosono])
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

  return (
    <Surface style={{ flex: 1, gap: 16, padding: 16 }}>
      <Searchbar
        value={queryNamaOrCocard}
        loading={loading}
        onChangeText={(v) => setQueryNamaOrCocard(v)}
        placeholder="Cari nama atau nomor cocard peserta tes..."
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
      </Surface>

      {/* Selected Peserta List Chip */}
      {selectedPesertaKertosono?.length != 0 && (
        <View
          style={{
            marginTop: 12,
            marginBottom: 8,
            flexDirection: "row",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          {selectedPesertaKertosono?.map((item) => (
            <Chip
              key={item.id}
              icon={() => (
                <Avatar.Image
                  size={24}
                  source={{uri: "https://ppwb.kita-kita.online/registrasi-tes/images/" + item.foto_smartcard}}
                />
              )}
              onClose={() => toggleSelectedPesertaKertosono(item)}
            >
              {item.nama_panggilan + " - " + item.nomor_cocard}
            </Chip>
          ))}
        </View>
      )}
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
          data={pesertaKertosono}
          renderItem={({ item }) => (
            <ParticipantCard
              peserta={item}
              telahDisimak={item.telah_disimak}
              isSelected={isSelectedPesertaKertosono(item.id)}
              onPress={() => toggleSelectedPesertaKertosono(item)}
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
      {/* FAB */}
      <FAB
        icon="pencil"
        onPress={() => router.push("/(app)/akademik-kertosono/penilaian")} // Replace with desired action
        style={{
          bottom: 24,
          right: 24,
          position: "absolute",
        }}
        visible={selectedPesertaKertosono?.length != 0}
      />
    </Surface>
  );
};

const ParticipantCard = ({
  peserta,
  telahDisimak,
  isSelected,
  onPress,
}: {
  peserta: PesertaKertosono;
  telahDisimak: boolean;
  isSelected: boolean;
  onPress: () => void;
}) => {
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <Card
      style={{
        margin: 8,
        backgroundColor: isSelected
          ? theme.colors.secondaryContainer
          : telahDisimak
          ? theme.colors.elevation.level3
          : theme.colors.background,
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
          {telahDisimak && (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Chip
                icon={peserta.akademik.find(akademik => akademik.guru_id == user?.id)?.penilaian == "Lulus" ? "check" : 'cancel'}
                style={{
                  minWidth: "auto",
                  alignSelf: "center",
                  paddingHorizontal: 8,
                }}
              >
                Nilai Anda: { peserta.akademik.find(akademik => akademik.guru_id == user?.id)?.penilaian }
              </Chip>
            </View>
          )}
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
