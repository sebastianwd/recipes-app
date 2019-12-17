import React, { useEffect, useState } from "react";
import { Text, Button, Subheading } from "react-native-paper";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import { FlatList, View } from "react-native";
import { FoodItem } from "../components/FoodItem";
import { useFavorites } from "../hooks/useFavorites";

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
      <View style={{ marginTop: 20, paddingLeft: 16 }}>
        <Subheading>Recetas favoritas</Subheading>
        <View style={{ flexDirection: "row" }}>
          <FlatList
            style={{ width: "95%" }}
            numColumns={3}
            data={state}
            renderItem={FoodItem}
            keyExtractor={item => String(item.id)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default withNavigationFocus(FavoritesScreen);
