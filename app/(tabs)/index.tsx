import React from 'react'
import { Card, Divider, Surface, Text, useTheme } from 'react-native-paper'
import { useWindowDimensions, View, ScrollView } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import RNBounceable from '@freakycoder/react-native-bounceable';
import * as HeroIcons from "react-native-heroicons/outline";
import { router } from 'expo-router';


const TabsHome = () => {
  const theme = useTheme();
  const {height, width} = useWindowDimensions();
  
  return (
    <Surface style={{ flex: 1, flexDirection: 'column'}}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'column',
            padding: 16,
            width: '100%',
            gap: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View>
              <Text variant="bodyLarge" style={{ fontWeight: 'bold', color: theme.colors.onSecondaryContainer }}>
                Periode Tes
              </Text>
              <Text variant="titleMedium" style={{ color: theme.colors.outline }}>
                Januari 2024
              </Text>
            </View>

            <Shadow
              distance={8}
              startColor={'#E5FCD9'}
              style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#3FD13F',
              }}
            >
              <HeroIcons.CalendarIcon color={theme.colors.onPrimary} />
            </Shadow>
          </View>

          <Divider></Divider>

          <Text variant="bodyLarge" style={{ fontWeight: 'bold', color: theme.colors.onSecondaryContainer }}>
            Ringkasan
          </Text>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: width < 720 ? 'wrap' : 'nowrap', // Allow the items to wrap onto a new row
              gap: 16,
              paddingBottom: 16,
            }}
          >
            <StatCard
              title="Jumlah Santri"
              value="899"
              cardBackgroundColor={theme.colors.background}
              icon={HeroIcons.UserGroupIcon}
              iconShadowColor="#CEF1FC"
              iconBackgroundColor="#117AD6"
            />
            <StatCard
              title="Penyimakan Terbanyak"
              value="7"
              cardBackgroundColor={theme.colors.background}
              icon={HeroIcons.ArrowTrendingUpIcon}
              iconShadowColor="#D6FDDA"
              iconBackgroundColor="#34D886"
            />
            <StatCard
              title="Penyimakan Tersedikit"
              value="5"
              cardBackgroundColor={theme.colors.background}
              icon={HeroIcons.ArrowTrendingDownIcon}
              iconShadowColor="#FFEBD4"
              iconBackgroundColor="#FF632B"
            />
            <StatCard
              title="Penyimakan Anda"
              value="120"
              cardBackgroundColor={theme.colors.background}
              icon={HeroIcons.BookOpenIcon}
              iconShadowColor="#DCE6FD"
              iconBackgroundColor="#4B6AD8"
            />
          </View>
          <View
          style={{
              paddingBottom: 16,
              gap: 16,
              flex: 1, 
              width: '100%',
            }}>
            <Text variant="bodyLarge" style={{ fontWeight: 'bold', color: theme.colors.onSecondaryContainer }}>
              Pengetesan Kediri
            </Text>
            
            <MainMenu
              title="Nilai Penyampaian"
              cardBackgroundColor={theme.colors.background}
              icon={HeroIcons.BookOpenIcon}
              iconShadowColor="#E5FCD9"
              iconBackgroundColor="#3FD13F"
              onClick={() => router.push('/akademik-kediri')}
            />
            <MainMenu
              title="Nilai Akhlak"
              cardBackgroundColor={theme.colors.background}
              icon={HeroIcons.FingerPrintIcon}
              iconShadowColor="#E5FCD9"
              iconBackgroundColor="#3FD13F"
              onClick={() => router.push('/akhlak-kediri')}
            />
            <MainMenu
              title="Daftar Peserta Tes"
              cardBackgroundColor={theme.colors.background}
              icon={HeroIcons.UserGroupIcon}
              iconShadowColor="#E5FCD9"
              iconBackgroundColor="#3FD13F"
              onClick={() => console.log('Navigating to Daftar Peserta Tes')}
            />
          </View>

          <View
            style={{
                gap: 16,
                flex: 1, 
                width: '100%',
              }}>
              <Text variant="bodyLarge" style={{ fontWeight: 'bold', color: theme.colors.onSecondaryContainer }}>
                Pengetesan Kertosono
              </Text>
              
              <MainMenu
                title="Nilai Bacaan"
                cardBackgroundColor={theme.colors.background}
                icon={HeroIcons.BookOpenIcon}
                iconShadowColor="#E5FCD9"
                iconBackgroundColor="#3FD13F"
                onClick={() => console.log('Navigating to Nilai Bacaan')}
              />
              <MainMenu
                title="Nilai Akhlak"
                cardBackgroundColor={theme.colors.background}
                icon={HeroIcons.FingerPrintIcon}
                iconShadowColor="#E5FCD9"
                iconBackgroundColor="#3FD13F"
                onClick={() => console.log('Navigating to Nilai Akhlak')}
              />
              <MainMenu
                title="Daftar Peserta Tes"
                cardBackgroundColor={theme.colors.background}
                icon={HeroIcons.UserGroupIcon}
                iconShadowColor="#E5FCD9"
                iconBackgroundColor="#3FD13F"
                onClick={() => console.log('Navigating to Daftar Peserta Tes')}
              />
          </View>
        </View>
      </ScrollView>  
    </Surface>
  )
}

const StatCard = ({ title, value, cardBackgroundColor, icon: Icon, iconShadowColor, iconBackgroundColor }) => {
  const theme = useTheme();
  const {height, width} = useWindowDimensions();
  
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 16,
        padding: 12,
        flexDirection: 'column',
        gap: 4,
        backgroundColor: cardBackgroundColor,
        borderColor: theme.colors.outline,
        borderWidth: 1,
        minWidth: width < 600 ? '45%' : '22%',
      }}
    >
      <Shadow
        distance={4}
        startColor={iconShadowColor}
        style={{
          width: 48,
          height: 48,
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: iconBackgroundColor,
        }}
      >
        <Icon color={theme.colors.onPrimary} />
      </Shadow>
      <Text variant="bodyLarge" style={{ fontWeight: 'bold', color: theme.colors.onSecondaryContainer }}>
        {title}
      </Text>
      <Text variant="titleMedium" style={{ color: theme.colors.outline }}>
        {value}
      </Text>
    </View>
  );
};


// Reusable MainMenu Component
const MainMenu = ({ title, icon: Icon, cardBackgroundColor, iconBackgroundColor, iconShadowColor, onClick }) => {
  const theme = useTheme();
  return (
    <RNBounceable bounceEffectIn={0.98} onPress={onClick}>
      <Card style={{ backgroundColor: cardBackgroundColor }}>
        <Card.Content
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
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
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: iconBackgroundColor,
            }}
          >
            <Icon color={theme.colors.onPrimary} style={{ width: 28, height: 28 }} />
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

export default TabsHome
