import { useState } from "react";
import {
  Avatar,
  Card,
  Chip,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { useKediri } from "@/lib/services/useKediri";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AkademikKediriCard from "@/lib/components/AkademikKediriCard";
import AkhlakCard from "@/lib/components/AkhlakCard";

const Detail = () => {
  const theme = useTheme();
  const [tab, setTab] = useState("akademik");
  const { pilihPesertaKediri } = useKediri();

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
              value: "akademik",
              label: "Akademik",
            },
            {
              value: "akhlak",
              label: "Akhlak",
            },
          ]}
        />
        {tab === "akademik" ? (
            <View style={{gap: 12, marginHorizontal:16, flexDirection: 'column'}}>
              {pilihPesertaKediri?.akademik.map((item) => (
                  <AkademikKediriCard key={item.id} data={item} />
              ))}
            </View>
        ) : (
            <View style={{gap: 12, marginHorizontal:16, flexDirection: 'column'}}>
              {pilihPesertaKediri?.akhlak.map((item) => (
                  <AkhlakCard key={item.id} data={item} />
              ))}
            </View>
        )}
      </ScrollView>
    </Surface>
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

export default Detail;
