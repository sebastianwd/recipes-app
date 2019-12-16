import React, { useEffect, useState } from "react";
import { Text, TextInput, Searchbar } from "react-native-paper";
import { FlatList, StyleSheet, View, ImageBackground } from "react-native";
import { recetas } from "../shared/data";
import {
  Feather,
  MaterialCommunityIcons as MaterialIcon
} from "@expo/vector-icons";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import NavigationService from "../shared/NavigationService";
import { SafeAreaView } from "react-navigation";
import { FoodItem } from "../components/FoodItem";
import { useFavorites } from "../hooks/useFavorites";
import { useStorage } from "../hooks/useStorage";
import { useTagFilters } from "../hooks/useTagFilters";
import { withNavigationFocus } from "react-navigation";

const HomeScreen = ({ isFocused }) => {
  const { getFavorites } = useFavorites();
  const { getTagFilters } = useTagFilters();
  const { storage } = useStorage();

  const [filtersNumber, setFiltersNumber] = useState(0);

  useEffect(() => {
    (async () => {
      const filters = await getTagFilters();
      if (!filters) {
        storage.set("filters", []);
        return;
      }
      setFiltersNumber(filters.length);
      const favorites = await getFavorites();
      if (!favorites) {
        storage.set("favorites", []);
      }
    })();
  }, [isFocused]);
  const handlePress = () => {
    NavigationService.navigate("Filter");
  };

  const Entradas = recetas.filter(x => x.type === "entrada");
  const Sopas = recetas.filter(x => x.type === "sopa");
  const Postres = recetas.filter(x => x.type === "postre");
  const Platos_Fondo = recetas.filter(x => x.type === "fondo");

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
          {filtersNumber > 0 && (
            <Text>{filtersNumber} filtro(s) activo(s)</Text>
          )}
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
  input: {
    marginHorizontal: 10,
    marginTop: 18,
    marginBottom: 10,
    height: 40,
    width: "84%"
  }
});

export default withNavigationFocus(HomeScreen);
