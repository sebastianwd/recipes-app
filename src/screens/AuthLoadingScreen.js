import React from "react";

import { ActivityIndicator } from "react-native-paper";

export const AuthLoadingScreen = props => {
  setTimeout(() => {
    props.navigation.navigate("Auth");
  }, 500);

  return <ActivityIndicator></ActivityIndicator>;
};
