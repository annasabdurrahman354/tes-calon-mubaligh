import React, { useState } from "react";
import { ActivityIndicator, Avatar, Button, Card, Paragraph, Surface, Text, Title } from "react-native-paper";
import { styles } from "@/lib";
import { useAuth } from "@/lib/services/useAuth";
import { useSnackbar } from "@/lib/services/useSnackbar";
import { View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const Profil = () => {
  const [loading, setLoading] = useState(false);
  const { logout, user } = useAuth();
  const { newSnackbar } = useSnackbar()

  const onLogout = async () => {
    setLoading(true);
    try {
      const response = await logout();
      console.log(response.message)
      newSnackbar(response.message)
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        newSnackbar(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <Surface style={styles.screen}>
        <Card style={{ borderRadius: 10, elevation: 3, padding: 20 }}>
          <Card.Content>
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <Avatar.Image
                source={{ uri: user?.foto }}
                size={80}
                style={{ marginBottom: 10 }}
              />
              <Title style={{ fontSize: 20, fontWeight: "bold" }}>{user?.nama}</Title>
              <Paragraph style={{ fontSize: 16, color: "gray" }}>@{user?.username}</Paragraph>
            </View>
            <View style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <FontAwesome name="envelope" size={20} color="gray" />
                <Text style={{ marginLeft: 10, fontSize: 16, color: "gray" }}>{user?.email}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <FontAwesome name="building" size={20} color="gray" />
                <Text style={{ marginLeft: 10, fontSize: 16, color: "gray" }}>{user?.pondok}</Text>
              </View>
              {user?.nomor_telepon && (
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                  <FontAwesome name="phone" size={20} color="gray" />
                  <Text style={{ marginLeft: 10, fontSize: 16, color: "gray" }}>{user.nomor_telepon}</Text>
                </View>
              )}
            </View>
            { loading ? <ActivityIndicator/>
              :
              <Button onPress={() => onLogout()} mode="contained" style={{ marginTop: 20, borderRadius: 5 }}>
                Logout
              </Button>
            }
          </Card.Content>
        </Card>
    </Surface>
  );
};

export default Profil;
