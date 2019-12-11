import React from "react";
import { Text, TextInput, Searchbar } from "react-native-paper";
import SafeAreaView from "react-native-safe-area-view";
import { FlatList, StyleSheet, View, ImageBackground } from "react-native";
import { Entradas, Sopas, Postres, Platos_Fondo } from "../shared/data";
import {
  Feather,
  MaterialCommunityIcons as MaterialIcon
} from "@expo/vector-icons";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import NavigationService from "../shared/NavigationService";

const FoodItem = ({ item }) => {
  const handlePress = () => {
    NavigationService.navigate("Recipe", { item });
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

export const HomeScreen = props => {
  const handlePress = () => {
    NavigationService.navigate("Filter");
  };
  return (
    <SafeAreaView>
      <ScrollView style={{ position: "relative" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Searchbar placeholder='Buscar' style={styles.input} />
          <TouchableOpacity onPress={handlePress} style={{ marginTop: 4 }}>
            <MaterialIcon name={"tune"} size={32}></MaterialIcon>
          </TouchableOpacity>
        </View>
        <View style={{ paddingLeft: 6 }}>
          <Text>Entradas</Text>
          <View style={{ flexDirection: "row" }}>
            <FlatList
              style={{ width: "95%" }}
              horizontal={true}
              data={Entradas}
              renderItem={FoodItem}
              keyExtractor={item => String(item.id)}
            />
            <Feather
              name={"chevrons-right"}
              size={24}
              style={{ alignSelf: "center" }}></Feather>
          </View>
        </View>
        <View style={{ paddingLeft: 6 }}>
          <Text>Sopas</Text>
          <View style={{ flexDirection: "row" }}>
            <FlatList
              style={{ width: "95%" }}
              horizontal={true}
              data={Sopas}
              renderItem={FoodItem}
              keyExtractor={item => String(item.id)}
            />
            <Feather
              name={"chevrons-right"}
              size={24}
              style={{ alignSelf: "center" }}></Feather>
          </View>
        </View>
        <View style={{ paddingLeft: 6 }}>
          <Text>Platos de Fondo</Text>
          <View style={{ flexDirection: "row" }}>
            <FlatList
              style={{ width: "95%" }}
              horizontal={true}
              data={Platos_Fondo}
              renderItem={FoodItem}
              keyExtractor={item => String(item.id)}
            />
            <Feather
              name={"chevrons-right"}
              size={24}
              style={{ alignSelf: "center" }}></Feather>
          </View>
        </View>
        <View style={{ paddingLeft: 6 }}>
          <Text>Postres</Text>
          <View style={{ flexDirection: "row" }}>
            <FlatList
              style={{ width: "95%" }}
              horizontal={true}
              data={Postres}
              renderItem={FoodItem}
              keyExtractor={item => String(item.id)}
            />
            <Feather
              name={"chevrons-right"}
              size={24}
              style={{ alignSelf: "center" }}></Feather>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  imgContainer: {
    alignSelf: "center",
    width: 120,
    height: 104,
    marginRight: 10
  },
  input: {
    marginHorizontal: 10,
    marginTop: 18,
    marginBottom: 10,
    height: 40,
    width: "84%"
  }
});
