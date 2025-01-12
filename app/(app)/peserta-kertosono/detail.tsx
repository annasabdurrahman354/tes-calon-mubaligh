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
import { useKertosono } from "@/lib/services/useKertosono";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AkhlakCard from "@/lib/components/AkhlakCard";
import AkademikKertosonoCard from "@/lib/components/AkademikKertosonoCard";

const Detail = () => {
  const theme = useTheme();
  const [tab, setTab] = useState("akademik");
  const { pilihPesertaKertosono } = useKertosono();

  return (
    <Surface style={{ flex: 1 }}>
      <ScrollView style={{ paddingBottom: 16 }}>
        <Card style={{ margin: 16 }} mode="outlined">
          <Card.Content>
            <View style={styles.header}>
              <Avatar.Image
                size={72}
                source={{uri: "https://ppwb.kita-kita.online/registrasi-tes/images/" + pilihPesertaKertosono?.foto_smartcard}}
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
                  {pilihPesertaKertosono?.nama}
                </Text>
                {pilihPesertaKertosono?.jenis_kelamin == "Laki-laki" ?
                  <Text variant="titleSmall">bin {pilihPesertaKertosono?.nama_ayah}</Text> :
                  <Text variant="titleSmall">binti {pilihPesertaKertosono?.nama_ayah}</Text>
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
                {pilihPesertaKertosono?.nomor_cocard}
              </Chip>
              <Chip
                icon={() => (
                  <FontAwesome5 name="mosque" color={theme.colors.primary} />
                )}
                style={{ backgroundColor: theme.colors.elevation.level3 }}
              >
                {pilihPesertaKertosono?.asal_pondok_nama}
              </Chip>
              {/* Chip asal daerah peserta tes */}
              <Chip
                icon="map-marker"
                style={{ backgroundColor: theme.colors.elevation.level3 }}
              >
                {pilihPesertaKertosono?.asal_daerah_nama}
              </Chip>
              {/* Chip pendidikan terakhir terdiri dari Jenjang Pendidikan - Jurusan */}
              <Chip
                icon="school"
                style={{ backgroundColor: theme.colors.elevation.level3 }}
              >
                {pilihPesertaKertosono?.pendidikan}
              </Chip>
              <Chip
                icon="calendar"
                style={{ backgroundColor: theme.colors.elevation.level3 }}
              >
                {pilihPesertaKertosono?.umur} tahun
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
              {pilihPesertaKertosono?.akademik.map((item) => (
                  <AkademikKertosonoCard key={item.id} data={item} />
              ))}
            </View>
        ) : (
            <View style={{gap: 12, marginHorizontal:16, flexDirection: 'column'}}>
              {pilihPesertaKertosono?.akhlak.map((item) => (
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
