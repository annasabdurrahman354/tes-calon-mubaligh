import React from "react";
import { Card, Divider, Surface, Text, useTheme } from "react-native-paper";
import { useWindowDimensions, View, ScrollView } from "react-native";
import { Shadow } from "react-native-shadow-2";
import RNBounceable from "@freakycoder/react-native-bounceable";
import * as HeroIcons from "react-native-heroicons/outline";
import { router, useFocusEffect } from "expo-router";
import { useStatistik } from "@/lib/services/useStatistik";
import { useAuth } from "@/lib/services/useAuth";
import { ROLE } from "@/lib/types/Enums";
import { useSnackbar } from "@/lib/services/useSnackbar";

const TabsHome = () => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();
  const { getStatistikKediri, getStatistikKertosono, statistikKediri, statistikKertosono } = useStatistik();
  const { hasRole } =  useAuth();
  const { newSnackbar } = useSnackbar();

  // Fetch Statistik
  const fetchStatistik = async () => {
    try {
      if (hasRole(ROLE.GURU_KEDIRI) || hasRole(ROLE.ADMIN_KEDIRI) || hasRole(ROLE.SUPERADMIN)) {
        await getStatistikKediri();
      }
      if (hasRole(ROLE.GURU_KERTOSONO) || hasRole(ROLE.ADMIN_KERTOSONO) || hasRole(ROLE.SUPERADMIN)) {
        await getStatistikKertosono();
      }
    } catch (error) {
      if (error instanceof Error) {
        newSnackbar(error.message);
      }
    }
  };

  // Fetch Statistik when page is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchStatistik(); // Call the fetch function when the page is focused
    }, [])
  );
  
  return (
    <Surface style={{ flex: 1, flexDirection: "column" }}>
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
            </>
          }

          {(hasRole(ROLE.GURU_KEDIRI) || hasRole(ROLE.ADMIN_KEDIRI) || hasRole(ROLE.SUPERADMIN)) &&
            <View
              style={{
                paddingBottom: 16,
                gap: 16,
                flex: 1,
                width: "100%",
              }}
            >
              <Text
                variant="bodyLarge"
                style={{
                  fontWeight: "bold",
                  color: theme.colors.onSecondaryContainer,
                }}
              >
                Pengetesan Kediri
              </Text>

              {(hasRole(ROLE.GURU_KEDIRI) || hasRole(ROLE.SUPERADMIN)) &&
                <>
                  <MainMenu
                    title="Nilai Penyampaian"
                    cardBackgroundColor={theme.colors.background}
                    icon={HeroIcons.BookOpenIcon}
                    iconShadowColor="#E5FCD9"
                    iconBackgroundColor="#3FD13F"
                    onClick={() => router.push("/(app)/akademik-kediri")}
                  />
                  <MainMenu
                    title="Nilai Akhlak"
                    cardBackgroundColor={theme.colors.background}
                    icon={HeroIcons.FingerPrintIcon}
                    iconShadowColor="#E5FCD9"
                    iconBackgroundColor="#3FD13F"
                    onClick={() => router.push("/(app)/akhlak-kediri")}
                  />
                </>
              }           
              <MainMenu
                title="Daftar Peserta Tes"
                cardBackgroundColor={theme.colors.background}
                icon={HeroIcons.UserGroupIcon}
                iconShadowColor="#E5FCD9"
                iconBackgroundColor="#3FD13F"
                onClick={() => router.push("/(app)/peserta-kediri")}
              />
            </View>
          }
          {(hasRole(ROLE.GURU_KERTOSONO) || hasRole(ROLE.ADMIN_KERTOSONO) || hasRole(ROLE.SUPERADMIN)) &&
            <View
              style={{
                gap: 16,
                flex: 1,
                width: "100%",
              }}
            >
              <Text
                variant="bodyLarge"
                style={{
                  fontWeight: "bold",
                  color: theme.colors.onSecondaryContainer,
                }}
              >
                Pengetesan Kertosono
              </Text>

              {(hasRole(ROLE.GURU_KERTOSONO) || hasRole(ROLE.SUPERADMIN)) &&
               <>
                <MainMenu
                  title="Nilai Bacaan"
                  cardBackgroundColor={theme.colors.background}
                  icon={HeroIcons.BookOpenIcon}
                  iconShadowColor="#E5FCD9"
                  iconBackgroundColor="#3FD13F"
                  onClick={() => router.push("/(app)/akademik-kertosono")}
                />
                <MainMenu
                  title="Nilai Akhlak"
                  cardBackgroundColor={theme.colors.background}
                  icon={HeroIcons.FingerPrintIcon}
                  iconShadowColor="#E5FCD9"
                  iconBackgroundColor="#3FD13F"
                  onClick={() => router.push("/(app)/akhlak-kertosono")}
                />
               </>
              }
              
              <MainMenu
                title="Daftar Peserta Tes"
                cardBackgroundColor={theme.colors.background}
                icon={HeroIcons.UserGroupIcon}
                iconShadowColor="#E5FCD9"
                iconBackgroundColor="#3FD13F"
                onClick={() => router.push("/(app)/peserta-kertosono")}
              />
            </View>
          }
        </View>
      </ScrollView>
    </Surface>
  );
};

export const StatCard = ({
  title,
  value,
  cardBackgroundColor,
  icon: Icon,
  iconShadowColor,
  iconBackgroundColor,
}) => {
  const theme = useTheme();
  const { height, width } = useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 16,
        padding: 12,
        flexDirection: "column",
        gap: 4,
        backgroundColor: cardBackgroundColor,
        borderColor: theme.colors.outline,
        borderWidth: 1,
        minWidth: width < 600 ? "45%" : "22%",
      }}
    >
      <Shadow
        distance={4}
        startColor={iconShadowColor}
        style={{
          width: 48,
          height: 48,
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: iconBackgroundColor,
        }}
      >
        <Icon color={theme.colors.onPrimary} />
      </Shadow>
      <Text
        variant="bodyLarge"
        style={{ fontWeight: "bold", color: theme.colors.onSecondaryContainer }}
      >
        {title}
      </Text>
      <Text variant="titleMedium" style={{ color: theme.colors.outline }}>
        {value}
      </Text>
    </View>
  );
};

// Reusable MainMenu Component
const MainMenu = ({
  title,
  icon: Icon,
  cardBackgroundColor,
  iconBackgroundColor,
  iconShadowColor,
  onClick,
}) => {
  const theme = useTheme();
  return (
    <RNBounceable bounceEffectIn={0.98} onPress={onClick}>
      <Card style={{ backgroundColor: cardBackgroundColor }}>
        <Card.Content
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: 16,
          }}
        >
          <Shadow
            distance={4}
            startColor={iconShadowColor}
            style={{
              marginRight: 16,
              width: 42,
              height: 42,
              borderRadius: 1000,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: iconBackgroundColor,
            }}
          >
            <Icon
              color={theme.colors.onPrimary}
              style={{ width: 28, height: 28 }}
            />
          </Shadow>
          <Text
            style={{ color: theme.colors.primary, flex: 1 }}
            variant="titleMedium"
            numberOfLines={1}
          >
            {title}
          </Text>
          <HeroIcons.ChevronRightIcon
            color={theme.colors.primary}
            style={{ width: 24, height: 24, marginLeft: 16 }}
          />
        </Card.Content>
      </Card>
    </RNBounceable>
  );
};

export default TabsHome;
