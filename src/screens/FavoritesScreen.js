import React, { useEffect, useState } from "react";
import { Text, Button, Subheading } from "react-native-paper";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import { FlatList, View } from "react-native";
import { FoodItem } from "../components/FoodItem";
import { useFavorites } from "../hooks/useFavorites";
import { Microondas } from "../shared/data";
import { Feather } from "@expo/vector-icons";
import { ProductItem } from "../components/ProductItem";

const FavoritesScreen = props => {
  const { isFocused } = props;
  const { getFavorites } = useFavorites();

  const [state, setState] = useState();

  useEffect(() => {
    (async () => {
      setState(await getFavorites());
    })();
  }, [isFocused]);

  return (
    <SafeAreaView>
      <View style={{ marginTop: 20, paddingLeft: 14 }}>
        <Subheading>Recetas favoritas</Subheading>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginLeft: 2
          }}>
          {state &&
            state.map(item => {
              return <FoodItem item={item} key={item.id}></FoodItem>;
            })}
        </View>
      </View>
      <View style={{ paddingLeft: 10, marginTop: 30 }}>
        <Subheading>Hornos microondas Daewoo</Subheading>

        <View style={{ flexDirection: "row", marginBottom: 28 }}>
          <FlatList
            style={{ width: "95%", paddingBottom: 10 }}
            horizontal={true}
            data={Microondas}
            renderItem={ProductItem}
            keyExtractor={item => String(item.id)}
          />
          <Feather
            name={"chevrons-right"}
            size={24}
            style={{ alignSelf: "center" }}></Feather>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default withNavigationFocus(FavoritesScreen);
