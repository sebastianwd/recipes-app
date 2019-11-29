import React from "react";
import { Image, View, StyleSheet, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import SafeAreaView from "react-native-safe-area-view";
import * as Google from "expo-google-app-auth";

const GOOGLE_CLIENT_ID =
  "813132219893-tiba195d7sm5i416tbtbq51hkp02gg1a.apps.googleusercontent.com";

const IOS_CLIENT_ID =
  "813132219893-0ta42n4s6oidhoar6mh3r8dt6v8aq6an.apps.googleusercontent.com";

export const SignInScreen = props => {
  const { navigation } = props;
  navigation.navigate("App");
  const goHome = () => {
    navigation.navigate("App");
  };

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
    console.log(result);
    goHome();
  };

  return (
    <SafeAreaView>
      <View style={styles.imgContainer}>
        <ImageBackground
          source={require("./img/logo.jpg")}
          style={{
            width: "100%",
            height: "100%"
          }}
          resizeMode={"contain"}></ImageBackground>
      </View>
      <Button mode={"outlined"}>Iniciar sesión con Facebook</Button>
      <Button mode={"outlined"} onPress={googleLogIn}>
        Iniciar sesión con Google
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    alignSelf: "center",
    width: "100%",
    height: 280
  }
});
