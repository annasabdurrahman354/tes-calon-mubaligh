import React from "react";
import {
  Surface,
  Text,
  useTheme,
  Divider,
  IconButton,
  Card,
  Avatar,
} from "react-native-paper";
import { useSnackbar } from "@/lib/services/useSnackbar";
import { useStatistik } from "@/lib/services/useStatistik";
import { useAuth } from "@/lib/services/useAuth";
import { ROLE } from "@/lib/types/Enums";
import { useFocusEffect } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import * as HeroIcons from "react-native-heroicons/outline";
import { Shadow } from "react-native-shadow-2";
import { StatCard } from ".";
import { StyleSheet, useWindowDimensions, View } from "react-native";

const Rekap = () => {
  const theme = useTheme();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { getStatistikKediri, getStatistikKertosono, statistikKediri, statistikKertosono } = useStatistik();
  const { hasRole } =  useAuth();
  const { newSnackbar } = useSnackbar();
  const { height, width } = useWindowDimensions();

  // Fetch Statistik
  const fetchStatistik = async () => {
    try {
      if (hasRole(ROLE.GURU_KEDIRI) || hasRole(ROLE.ADMIN_KEDIRI) || hasRole(ROLE.SUPERADMIN)) {
        setLoading(true)
        await getStatistikKediri();
      }
      if (hasRole(ROLE.GURU_KERTOSONO) || hasRole(ROLE.ADMIN_KERTOSONO) || hasRole(ROLE.SUPERADMIN)) {
        setLoading(true)
        await getStatistikKertosono();
      }
    } catch (error) {
      if (error instanceof Error) {
        newSnackbar(error.message);
      }
      setLoading(false)
    }
  };

  // Fetch Statistik when page is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchStatistik(); // Call the fetch function when the page is focused
    }, [])
  );

  const DataCard = ({ icon, title, value }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
      }}
    >
      <IconButton
        icon={icon}
        size={24}
        style={{
          backgroundColor: '#e3f2fd',
          marginRight: 12,
        }}
      />
      <View>
        <Text
          style={{
            fontSize: 16,
            color: '#555555',
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#333333',
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
  
  const GenderStats = ({ gender, stats }) => (
    <Card
      style={{
        marginBottom: 8,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#ffffff',
      }}
      mode="outlined"
    >
      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Avatar.Icon
            size={40}
            icon={gender === "Laki-laki" ? "account" : "account-outline"}
            style={{
              marginRight: 12,
              backgroundColor: theme.colors.primary,
            }}
          />
          <Text
            variant="bodyLarge"
            style={{
              color: theme.colors.onBackground,
            }}
          >
            {gender}
          </Text>
        </View>
        <Divider
          style={{
            marginVertical: 8,
            backgroundColor: '#dddddd',
          }}
        />
        <DataCard
          icon="account-group"
          title="Total Active Peserta"
          value={stats.total_active_peserta}
        />
        <DataCard
          icon="numeric-6-circle"
          title="Min Akademik per Peserta"
          value={stats.min_akademik_per_peserta}
        />
        <DataCard
          icon="numeric-7-circle"
          title="Max Akademik per Peserta"
          value={stats.max_akademik_per_peserta}
        />
        <DataCard
          icon="school"
          title="User Akademik Count"
          value={stats.user_akademik_count}
        />
        <Divider
          style={{
            marginVertical: 8,
            backgroundColor: '#dddddd',
          }}
        />
        <Text
          variant="bodyLarge"
          style={{
            marginTop: 8,
            color: theme.colors.onBackground,
          }}
        >
          Hasil Sistem:
        </Text>
        <DataCard
          icon="check-circle"
          title="Lulus"
          value={stats.hasil_sistem.lulus}
        />
        <DataCard
          icon="close-circle"
          title="Tidak Lulus"
          value={stats.hasil_sistem.tidak_lulus}
        />
        <DataCard
          icon="alert-circle"
          title="Perlu Musyawarah"
          value={stats.hasil_sistem.perlu_musyawarah}
        />
        <DataCard
          icon="help-circle"
          title="Belum Pengetesan"
          value={stats.hasil_sistem.belum_pengetesan}
        />
      </Card.Content>
    </Card>
  );
  

  return (
    <Surface style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "column",
            padding: 16,
            width: "100%",
            gap: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View>
              <Text
                variant="bodyLarge"
                style={{
                  fontWeight: "bold",
                  color: theme.colors.onSecondaryContainer,
                }}
              >
                Periode Tes
              </Text>
              <Text
                variant="titleMedium"
                style={{ color: theme.colors.outline }}
              >
                {statistikKediri.periode_tes != '-' ? statistikKediri.periode_tes : statistikKertosono.periode_tes}
              </Text>
            </View>

            <Shadow
              distance={8}
              startColor={"#E5FCD9"}
              style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#3FD13F",
              }}
            >
              <HeroIcons.CalendarIcon color={theme.colors.onPrimary} />
            </Shadow>
          </View>

          {(hasRole(ROLE.GURU_KEDIRI) || hasRole(ROLE.ADMIN_KEDIRI) || hasRole(ROLE.SUPERADMIN)) &&
            <>
              <Divider></Divider>
              <Text
                variant="bodyLarge"
                style={{
                  fontWeight: "bold",
                  color: theme.colors.onSecondaryContainer,
                }}
              >
                Ringkasan Tes Kediri
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: width < 720 ? "wrap" : "nowrap", // Allow the items to wrap onto a new row
                  gap: 16,
                  paddingBottom: 16,
                }}
              >
                <StatCard
                  title="Jumlah Santri"
                  value={statistikKediri.overall.total_active_peserta}
                  cardBackgroundColor={theme.colors.background}
                  icon={HeroIcons.UserGroupIcon}
                  iconShadowColor="#CEF1FC"
                  iconBackgroundColor="#117AD6"
                />
                <StatCard
                  title="Penyimakan Maksimum"
                  value={statistikKediri.overall.max_akademik_per_peserta}
                  cardBackgroundColor={theme.colors.background}
                  icon={HeroIcons.ArrowTrendingUpIcon}
                  iconShadowColor="#D6FDDA"
                  iconBackgroundColor="#34D886"
                />
                <StatCard
                  title="Penyimakan Minimum"
                  value={statistikKediri.overall.min_akademik_per_peserta}
                  cardBackgroundColor={theme.colors.background}
                  icon={HeroIcons.ArrowTrendingDownIcon}
                  iconShadowColor="#FFEBD4"
                  iconBackgroundColor="#FF632B"
                />
                <StatCard
                  title="Penyimakan Anda"
                  value={statistikKediri.overall.user_akademik_count}
                  cardBackgroundColor={theme.colors.background}
                  icon={HeroIcons.BookOpenIcon}
                  iconShadowColor="#DCE6FD"
                  iconBackgroundColor="#4B6AD8"
                />
              </View>
              {Object.entries(statistikKediri.by_gender).map(([gender, stats]) => (
                <GenderStats key={gender} gender={gender} stats={stats} />
              ))}
            </>
          }
          
          {(hasRole(ROLE.GURU_KERTOSONO) || hasRole(ROLE.ADMIN_KERTOSONO) || hasRole(ROLE.SUPERADMIN)) &&
            <>
              <Divider></Divider>
              <Text
                variant="bodyLarge"
                style={{
                  fontWeight: "bold",
                  color: theme.colors.onSecondaryContainer,
                }}
              >
                Ringkasan Tes Kertosono
              </Text>
            <View
                style={{
                  flexDirection: "row",
                  flexWrap: width < 720 ? "wrap" : "nowrap", // Allow the items to wrap onto a new row
                  gap: 16,
                  paddingBottom: 16,
                }}
              >
                <StatCard
                  title="Jumlah Santri"
                  value={statistikKertosono.overall.total_active_peserta}
                  cardBackgroundColor={theme.colors.background}
                  icon={HeroIcons.UserGroupIcon}
                  iconShadowColor="#CEF1FC"
                  iconBackgroundColor="#117AD6"
                />
                <StatCard
                  title="Penyimakan Maksimum"
                  value={statistikKertosono.overall.max_akademik_per_peserta}
                  cardBackgroundColor={theme.colors.background}
                  icon={HeroIcons.ArrowTrendingUpIcon}
                  iconShadowColor="#D6FDDA"
                  iconBackgroundColor="#34D886"
                />
                <StatCard
                  title="Penyimakan Minimum"
                  value={statistikKertosono.overall.min_akademik_per_peserta}
                  cardBackgroundColor={theme.colors.background}
                  icon={HeroIcons.ArrowTrendingDownIcon}
                  iconShadowColor="#FFEBD4"
                  iconBackgroundColor="#FF632B"
                />
                <StatCard
                  title="Penyimakan Anda"
                  value={statistikKertosono.overall.user_akademik_count}
                  cardBackgroundColor={theme.colors.background}
                  icon={HeroIcons.BookOpenIcon}
                  iconShadowColor="#DCE6FD"
                  iconBackgroundColor="#4B6AD8"
                />
              </View>
              {Object.entries(statistikKertosono.by_gender).map(([gender, stats]) => (
                <GenderStats key={gender} gender={gender} stats={stats} />
              ))}
            </>
          }
        </View>
      </ScrollView>
    </Surface>
  );
};

export default Rekap;
