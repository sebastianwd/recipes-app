import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import NavigationService from "../shared/NavigationService";

export const ProductItem = ({ item }) => {
  const handlePress = () => {
    NavigationService.navigate("Product", { item });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ flexDirection: "column" }}>
        <View style={styles.imgContainer}>
          <ImageBackground
            source={{ uri: item.image }}
            style={{
              width: "100%",
              height: "100%"
            }}
            resizeMode={"contain"}></ImageBackground>
        </View>
        <Text style={{ textAlign: "center", marginRight: 10 }}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    alignSelf: "center",
    width: 120,
    height: 104,
    marginRight: 10
  }
});
