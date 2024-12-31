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
import { DataTable } from "react-native-paper";
import { useKertosono } from "@/lib/services/useKertosono";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Detail = () => {
  const theme = useTheme();
  const [tab, setTab] = useState("akademik");
  const { pilihPesertaKertosono } = useKertosono();

  return (
    <Surface style={{ flex: 1 }}>
      <ScrollView>
        <Card style={{ margin: 16 }} mode="outlined">
          <Card.Content>
            <View style={styles.header}>
              <Avatar.Image
                size={72}
                source={require("@/assets/images/dummy-profile.png")}
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
                <Text variant="titleSmall">
                  bin {pilihPesertaKertosono?.nama_ayah}
                </Text>
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
          <Card
            style={{ marginHorizontal: 16, marginBottom: 16 }}
            mode="outlined"
          >
            <Card.Content>
              {/* Tabel riwayat pengujian oleh guru lain */}
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Dewan Guru</DataTable.Title>
                  <DataTable.Title>Penilaian</DataTable.Title>
                  <DataTable.Title>Kekurangan</DataTable.Title>
                  <DataTable.Title>Catatan</DataTable.Title>
                </DataTable.Header>

                {pilihPesertaKertosono?.akademik.map((item) => (
                  <DataTable.Row key={item.id}>
                    <DataTable.Cell>{item.guru_nama}</DataTable.Cell>
                    <DataTable.Cell>{item.penilaian}</DataTable.Cell>
                    <DataTable.Cell>{[...item.kekurangan_tajwid, ...item.kekurangan_khusus, ...item.kekurangan_keserasian, ...item.kekurangan_kelancaran].join(', ')}</DataTable.Cell>
                    <DataTable.Cell>{item.catatan}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </Card.Content>
          </Card>
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

                {pilihPesertaKertosono?.akhlak.map((item) => (
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
