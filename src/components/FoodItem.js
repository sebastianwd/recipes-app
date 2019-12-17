import React from "react";
import { Text } from "react-native-paper";
import { View, ImageBackground, StyleSheet } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";
import NavigationService from "../shared/NavigationService";

export const FoodItem = ({ item }) => {
  const handlePress = () => {
    NavigationService.navigate("Recipe", { item });
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress} style={{ marginRight: 10 }}>
      <View
        style={{
          flexDirection: "column",
          flex: 1,
          maxWidth: 160,
          marginVertical: 10,
          ...styles.shadow
        }}>
        <View style={styles.imgContainer}>
          <ImageBackground
            source={{ uri: item.image }}
            style={{
              width: "100%",
              height: "100%"
            }}
            imageStyle={{ borderTopRightRadius: 8, borderTopLeftRadius: 8 }}
            resizeMode={"cover"}></ImageBackground>
        </View>
        <Text style={{ textAlign: "center", paddingVertical: 6 }}>
          {item.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  imgContainer: {
    alignSelf: "center",
    width: 160,
    height: 110
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 3, height: 7 },
    shadowRadius: 13,
    shadowOpacity: 0.8,
    elevation: 5,
    backgroundColor: "white"
  }
});
