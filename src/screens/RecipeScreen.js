import React from "react";
import { View, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { Title, Text } from "react-native-paper";
import { Video } from "expo-av";
import { ScrollView } from "react-native";
export const RecipeScreen = props => {
  const { navigation } = props;

  const foodItem = navigation.getParam("item", "");
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Title>{foodItem.name} </Title>
        <View style={{ paddingVertical: 20 }}>
          <Video
            source={require("./img/placeholder.mp4")}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode='cover'
            useNativeControls={true}
            style={{ width: "100%", height: 250 }}
          />
        </View>
        <Title>Ingredientes</Title>
        <Text>Para ## personas</Text>
        {foodItem.ingredients &&
          foodItem.ingredients.map((item, index) => {
            return <Text key={index}>{item}</Text>;
          })}

        <Title>Preparación</Title>
        <Text>{foodItem.recipe}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  }
});
