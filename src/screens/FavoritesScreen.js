import React from "react";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-navigation";
import { FlatList, View } from "react-native";

export const FavoritesScreen = props => {
  return (
    <SafeAreaView>
      <Text>Recetas favoritas</Text>
      <View style={{ flexDirection: "row" }}></View>
    </SafeAreaView>
  );
};
