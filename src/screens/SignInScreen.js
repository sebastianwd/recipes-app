import React, { useEffect } from "react";
import { Image, View, StyleSheet, ImageBackground, Button } from "react-native";
import { SafeAreaView } from "react-native";
import * as Google from "expo-google-app-auth";
import { Dimensions, PixelRatio } from "react-native";
import { Text } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useStorage } from "../hooks/useStorage";

const { width, height } = Dimensions.get("window");
const GOOGLE_CLIENT_ID =
  "813132219893-tiba195d7sm5i416tbtbq51hkp02gg1a.apps.googleusercontent.com";

const IOS_CLIENT_ID =
  "813132219893-0ta42n4s6oidhoar6mh3r8dt6v8aq6an.apps.googleusercontent.com";

export const SignInScreen = props => {
  const { navigation } = props;
  const { storage } = useStorage();

  // navigation.navigate("App");
  const goHome = () => {
    navigation.navigate("App");
  };

  // useEffect(() => {}, []);

  (async () => {
    const user = await storage.get("user");
    if (user) {
      goHome();
    }
  })();

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: GOOGLE_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        //result.accessToken;
        return result;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  const googleLogIn = async () => {
    const result = await signInWithGoogleAsync();
    await storage.set("user", {
      id: result.user.id,
      email: result.user.email,
      name: result.user.name
    });
    goHome();
  };

  return (
    <SafeAreaView style={{ position: "relative" }}>
      <View>
        <View style={styles.imgContainer}>
          <ImageBackground
            source={require("./img/chef_peruano.png")}
            style={{
              height: 90
            }}
            resizeMode={"contain"}></ImageBackground>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={googleLogIn}>
          <Text> Iniciar sesión con Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={googleLogIn}>
          <Text> Iniciar sesión con Google</Text>
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={require("./img/portada.png")}
        style={{
          width: width,
          height: height,
          position: "absolute",
          zIndex: -1
        }}
        resizeMode={"contain"}></ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    alignSelf: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: 280,
    marginBottom: 80
  },
  loginButton: {
    margin: 8,
    paddingVertical: 10,
    paddingHorizontal: 4,
    width: 240,
    alignItems: "center",
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 1.5,
    borderRightWidth: 4,
    borderBottomWidth: 5
  }
});
