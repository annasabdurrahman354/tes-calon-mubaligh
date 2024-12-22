import React from 'react'
import { Card, Divider, Surface, Text, useTheme } from 'react-native-paper'
import { Platform, useWindowDimensions, View } from 'react-native';
import { Image } from 'expo-image';
import { Shadow } from 'react-native-shadow-2';
import RNBounceable from '@freakycoder/react-native-bounceable';
import * as HeroIcons from "react-native-heroicons/outline";
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';


const TabsHome = () => {
  const theme = useTheme();
  const {height, width} = useWindowDimensions();
  const insets = useSafeAreaInsets(); // Get safe area insets dynamically
  const isMobile = Platform.OS !== 'web'; // Conditionally check if it's mobile

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <Surface style={{ flex: 1, flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              width: '100%',
              backgroundColor: theme.colors.inversePrimary,
              paddingTop: isMobile ? insets.top : 16
            }}
          >
            <View style={{flex: 1}}>
              <Text variant="bodyLarge" style={{ fontWeight: 'bold', color: theme.colors.onPrimary }}>
                Assalamualaikum
              </Text>
              <Text variant="titleMedium" style={{ color: theme.colors.onPrimary }}>
                Reza Rahardian
              </Text>
            </View>
            <Image
              style={{
                height: 48,
                width: 48,
                borderColor: theme.colors.primary,
                borderWidth: 4,
                borderRadius: 36, // Half of height/width for circular image
              }}
              source={require('@/assets/images/dummy-profile.png')}
            />
          </View>
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
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRadius: 16,
                    minWidth: width < 600 ? '45%' : '22%',
                    padding: 8,
                    flexDirection: 'column',
                    gap: 4,
                    backgroundColor: theme.colors.onPrimary,
                    borderColor: theme.colors.outline,
                    borderWidth: 1,
                  }}
                >
                  <Shadow
                    distance={8}
                    startColor={'#CEF1FC'}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#117AD6',
                    }}
                  >
                    <HeroIcons.UserGroupIcon color={theme.colors.onPrimary} />
                  </Shadow>
                  <Text variant="bodyLarge" style={{ fontWeight: 'bold', color: theme.colors.onSecondaryContainer }}>
                    Jumlah Santri
                  </Text>
                  <Text variant="titleMedium" style={{ color: theme.colors.outline }}>
                    899
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    minWidth: width < 600 ? '45%' : '22%', // Ensure similar behavior for other Views
                    borderRadius: 16,
                    padding: 8,
                    flexDirection: 'column',
                    gap: 4,
                    backgroundColor: theme.colors.onPrimary,
                    borderColor: theme.colors.outline,
                    borderWidth: 1,
                  }}
                >
                  <Shadow
                    distance={8}
                    startColor={'#D6FDDA'}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#34D886',
                    }}
                  >
                    <HeroIcons.ArrowTrendingUpIcon color={theme.colors.onPrimary} />
                  </Shadow>
                  <Text variant="bodyLarge" style={{ fontWeight: 'bold', color: theme.colors.onSecondaryContainer }}>
                    Penyimakan Terbanyak
                  </Text>
                  <Text variant="titleMedium" style={{ color: theme.colors.outline }}>
                    899
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    minWidth: width < 600 ? '45%' : '22%', // Apply the same logic for the next View
                    borderRadius: 16,
                    padding: 8,
                    flexDirection: 'column',
                    gap: 4,
                    backgroundColor: theme.colors.onPrimary,
                    borderColor: theme.colors.outline,
                    borderWidth: 1,
                  }}
                >
                  <Shadow
                    distance={8}
                    startColor={'#FFEBD4'}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#FF632B',
                    }}
                  >
                    <HeroIcons.ArrowTrendingDownIcon color={theme.colors.onPrimary} />
                  </Shadow>
                  <Text variant="bodyLarge" style={{ fontWeight: 'bold', color: theme.colors.onSecondaryContainer }}>
                    Penyimakan Tersedikit
                  </Text>
                  <Text variant="titleMedium" style={{ color: theme.colors.outline }}>
                    899
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    minWidth: width < 600 ? '45%' : '22%', // Apply the same for the last View
                    borderRadius: 16,
                    padding: 8,
                    flexDirection: 'column',
                    gap: 4,
                    backgroundColor: theme.colors.onPrimary,
                    borderColor: theme.colors.outline,
                    borderWidth: 1,
                  }}
                >
                  <Shadow
                    distance={8}
                    startColor={'#DCE6FD'}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#4B6AD8',
                    }}
                  >
                    <HeroIcons.BookOpenIcon color={theme.colors.onPrimary} />
                  </Shadow>
                  <Text variant="bodyLarge" style={{ fontWeight: 'bold', color: theme.colors.onSecondaryContainer }}>
                    Penyimakan Anda
                  </Text>
                  <Text variant="titleMedium" style={{ color: theme.colors.outline }}>
                    899
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                  paddingHorizontal: 16,
                  paddingBottom: 16,
                  gap: 16,
                  flex: 1, 
                  width: '100%',
                }}>
                <Text variant="bodyLarge" style={{ fontWeight: 'bold', color: theme.colors.onSecondaryContainer }}>
                  Pengetesan Kediri
                </Text>
                
                <RNBounceable bounceEffectIn={0.98}>
                  <Card
                  style={{
                    backgroundColor: theme.colors.onPrimary,
                  }}>
                    <Card.Content
                      style={{
                        flexDirection: 'row', // Arrange items in a row
                        alignItems: 'center', // Vertically center items
                        justifyContent: 'space-between', // Space between items
                        width: '100%', // Full width of parent
                        padding: 16, // Add padding for touch area
                      }}>
                      
                      <Shadow
                        distance={8}
                        startColor={'#E5FCD9'}
                        style={{
                          marginRight: 16, // Space between image and text
                          width: 42,
                          height: 42,
                          borderRadius: 1000,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#3FD13F',
                        }}
                      >
                        <HeroIcons.BookOpenIcon 
                          color={theme.colors.onPrimary}
                          style={{
                            width: 28, // Adjust width as needed
                            height: 28, // Adjust height as needed
                          }}
                        />
                      </Shadow>
                        
  
                      <Text
                        style={{
                          color: theme.colors.primary,
                          flex: 1, // Take up remaining space
                        }}
                        variant='titleMedium'
                        numberOfLines={1} // Limit text to a single line
                      >
                        Nilai Penyampaian
                      </Text>

                      {/* Right Image */}
                      <HeroIcons.ChevronRightIcon 
                        color={theme.colors.primary}
                        style={{
                          width: 24, // Adjust width as needed
                          height: 24, // Adjust height as needed
                          marginLeft: 16, // Space between text and image
                        }}
                      />
                    </Card.Content>
                  </Card>
                </RNBounceable>
                
                <RNBounceable bounceEffectIn={0.98}>
                  <Card
                  style={{
                    backgroundColor: theme.colors.onPrimary,
                  }}>
                    <Card.Content
                      style={{
                        flexDirection: 'row', // Arrange items in a row
                        alignItems: 'center', // Vertically center items
                        justifyContent: 'space-between', // Space between items
                        width: '100%', // Full width of parent
                        padding: 16, // Add padding for touch area
                      }}>
                      
                      <Shadow
                        distance={8}
                        startColor={'#E5FCD9'}
                        style={{
                          marginRight: 16, // Space between image and text
                          width: 42,
                          height: 42,
                          borderRadius: 1000,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#3FD13F',
                        }}
                      >
                        <HeroIcons.FingerPrintIcon 
                          color={theme.colors.onPrimary}
                          style={{
                            width: 28, // Adjust width as needed
                            height: 28, // Adjust height as needed
                          }}
                        />
                      </Shadow>
                        
  
                      <Text
                        style={{
                          color: theme.colors.primary,
                          flex: 1, // Take up remaining space
                        }}
                        variant='titleMedium'
                        numberOfLines={1} // Limit text to a single line
                      >
                        Nilai Akhlak
                      </Text>

                      {/* Right Image */}
                      <HeroIcons.ChevronRightIcon 
                        color={theme.colors.primary}
                        style={{
                          width: 24, // Adjust width as needed
                          height: 24, // Adjust height as needed
                          marginLeft: 16, // Space between text and image
                        }}
                      />
                    </Card.Content>
                  </Card>
                </RNBounceable>
            </View>

            <View
              style={{
                  paddingHorizontal: 16,
                  paddingBottom: 16,
                  gap: 16,
                  flex: 1, 
                  width: '100%',
                }}>
                <Text variant="bodyLarge" style={{ fontWeight: 'bold', color: theme.colors.onSecondaryContainer }}>
                  Pengetesan Kertosono
                </Text>
                
                <RNBounceable bounceEffectIn={0.98}>
                  <Card
                  style={{
                    backgroundColor: theme.colors.onPrimary,
                  }}>
                    <Card.Content
                      style={{
                        flexDirection: 'row', // Arrange items in a row
                        alignItems: 'center', // Vertically center items
                        justifyContent: 'space-between', // Space between items
                        width: '100%', // Full width of parent
                        padding: 16, // Add padding for touch area
                      }}>
                      
                      <Shadow
                        distance={8}
                        startColor={'#E5FCD9'}
                        style={{
                          marginRight: 16, // Space between image and text
                          width: 42,
                          height: 42,
                          borderRadius: 1000,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#3FD13F',
                        }}
                      >
                        <HeroIcons.BookOpenIcon 
                          color={theme.colors.onPrimary}
                          style={{
                            width: 28, // Adjust width as needed
                            height: 28, // Adjust height as needed
                          }}
                        />
                      </Shadow>
                        
  
                      <Text
                        style={{
                          color: theme.colors.primary,
                          flex: 1, // Take up remaining space
                        }}
                        variant='titleMedium'
                        numberOfLines={1} // Limit text to a single line
                      >
                        Nilai Bacaan
                      </Text>

                      {/* Right Image */}
                      <HeroIcons.ChevronRightIcon 
                        color={theme.colors.primary}
                        style={{
                          width: 24, // Adjust width as needed
                          height: 24, // Adjust height as needed
                          marginLeft: 16, // Space between text and image
                        }}
                      />
                    </Card.Content>
                  </Card>
                </RNBounceable>
                
                <RNBounceable bounceEffectIn={0.98}>
                  <Card
                  style={{
                    backgroundColor: theme.colors.onPrimary,
                  }}>
                    <Card.Content
                      style={{
                        flexDirection: 'row', // Arrange items in a row
                        alignItems: 'center', // Vertically center items
                        justifyContent: 'space-between', // Space between items
                        width: '100%', // Full width of parent
                        padding: 16, // Add padding for touch area
                      }}>
                      
                      <Shadow
                        distance={8}
                        startColor={'#E5FCD9'}
                        style={{
                          marginRight: 16, // Space between image and text
                          width: 42,
                          height: 42,
                          borderRadius: 1000,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#3FD13F',
                        }}
                      >
                        <HeroIcons.FingerPrintIcon 
                          color={theme.colors.onPrimary}
                          style={{
                            width: 28, // Adjust width as needed
                            height: 28, // Adjust height as needed
                          }}
                        />
                      </Shadow>
                        
  
                      <Text
                        style={{
                          color: theme.colors.primary,
                          flex: 1, // Take up remaining space
                        }}
                        variant='titleMedium'
                        numberOfLines={1} // Limit text to a single line
                      >
                        Nilai Akhlak
                      </Text>

                      {/* Right Image */}
                      <HeroIcons.ChevronRightIcon 
                        color={theme.colors.primary}
                        style={{
                          width: 24, // Adjust width as needed
                          height: 24, // Adjust height as needed
                          marginLeft: 16, // Space between text and image
                        }}
                      />
                    </Card.Content>
                  </Card>
                </RNBounceable>
            </View>

          </ScrollView>  
        </Surface>
      </GestureHandlerRootView>
    </SafeAreaProvider>

  )
}

export default TabsHome
