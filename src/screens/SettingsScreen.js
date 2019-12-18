import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  ActivityIndicator,
  Subheading,
  List,
  Divider,
  Headline,
  Title,
  RadioButton
} from "react-native-paper";
import { SafeAreaView } from "react-native";
import { ScrollView, StyleSheet } from "react-native";
import { useStorage } from "../hooks/useStorage";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "expo";

const SettingsScreen = props => {
  const { navigation } = props;
  const { storage } = useStorage();

  const [settings, setSettings] = useState({});

  const sendMail = () => {
    Linking.openURL("mailto:contactos@dwe.com.pe?subject=App&body=Hola,");
  };
  const sendCall = () => {
    Linking.openURL("tel://017167700");
  };

  useEffect(() => {
    (async () => {
      setSettings({ isAutoplay: await storage.get("autoplay") });
    })();
  }, []);

  const signOut = async () => {
    await storage.remove("user");
    navigation.navigate("Auth");
  };

  const setAutoplay = async () => {
    await storage.set("autoplay", !settings.isAutoplay);

    setSettings(prevState => {
      return { ...prevState, isAutoplay: !prevState.isAutoplay };
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 10 }}>
        <Subheading>General</Subheading>
        <List.Item
          title='Reproducción automática de videos'
          style={styles.item}
          onPress={setAutoplay}
          right={props => (
            <RadioButton
              value='first'
              onPress={setAutoplay}
              status={settings.isAutoplay ? "checked" : "unchecked"}
            />
          )}
        />
        <List.Item
          title='Restricciones de dieta'
          style={styles.item}
          right={props => <RadioButton value='first' status={"checked"} />}
        />
        <List.Item
          title='Notificaciones y sonido'
          style={styles.item}
          right={props => <RadioButton value='first' status={"checked"} />}
        />
        <Divider />

        <Subheading>Ayuda</Subheading>
        <Divider />
        <List.Item
          title='Correo electrónico de soporte'
          onPress={sendMail}
          style={styles.item}
        />
        <List.Item
          onPress={sendCall}
          title='Comunícate con nosotros'
          style={styles.item}
        />
        <Divider />

        <Subheading>Legales</Subheading>
        <Divider />
        <List.Item title='Términos y condiciones' style={styles.item} />
        <List.Item title='Política de privacidad' style={styles.item} />
        <Divider />

        <Subheading>Cuenta</Subheading>
        <Divider />
        <List.Item title='Borrar cuenta' style={styles.item} />
        <List.Item
          title='Cerrar sesión'
          onPress={signOut}
          style={styles.item}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 8,
    height: 30
  },
  item: {
    paddingVertical: 4
  }
});

SettingsScreen.navigationOptions = () => {
  return {
    title: "Configuración"
  };
};
export { SettingsScreen };
