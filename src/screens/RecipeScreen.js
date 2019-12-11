import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { Title, Text, Button, Subheading } from "react-native-paper";
import { Video } from "expo-av";
import { ScrollView } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { Microondas } from "../shared/data";
import { TouchableOpacity } from "react-native-gesture-handler";
import NavigationService from "../shared/NavigationService";

const ProductItem = ({ item }) => {
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

const RecipeScreen = props => {
  const { navigation } = props;

  const foodItem = navigation.getParam("item", "");

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={{ paddingVertical: 20 }}>
          <Video
            source={{ uri: foodItem.video || "" }}
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
        <View style={styles.ingredientesContainer}>
          {foodItem.ingredients &&
            foodItem.ingredients.map((item, index) => {
              return <Text key={index}>{item}</Text>;
            })}
        </View>
        <Title>Preparación</Title>
        <Text>{foodItem.recipe}</Text>

        <Subheading>Hornos microondas</Subheading>
        <View style={{ flexDirection: "row" }}>
          <FlatList
            style={{ width: "95%" }}
            horizontal={true}
            data={Microondas[foodItem.name]}
            renderItem={ProductItem}
            keyExtractor={item => String(item.id)}
          />
          <Feather
            name={"chevrons-right"}
            size={24}
            style={{ alignSelf: "center" }}></Feather>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  ingredientesContainer: {
    borderWidth: 1.5,
    borderColor: "black",
    marginVertical: 8,
    padding: 6
  },
  imgContainer: {
    alignSelf: "center",
    width: 110,
    height: 110,
    marginRight: 10
  }
});

RecipeScreen.navigationOptions = ({ navigation }) => {
  const foodItem = navigation.getParam("item", "");
  return {
    title: foodItem.name,
    headerRight: () => {
      return (
        <>
          <Ionicons name='md-share' size={32} color='white' />
          <Ionicons
            style={{ marginHorizontal: 14 }}
            name='md-heart'
            size={32}
            color='white'
          />
        </>
      );
    }
  };
};
export { RecipeScreen };
