import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native";
import { Title, Text, Button, Subheading } from "react-native-paper";
import { Video } from "expo-av";
import { ScrollView, Share } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { Microondas, recetas } from "../shared/data";
import {
  TouchableOpacity,
  TouchableHighlight
} from "react-native-gesture-handler";
import { pickRandom } from "../shared/util";
import { ProductItem } from "../components/ProductItem";
import { FoodItem } from "../components/FoodItem";
import { useFavorites } from "../hooks/useFavorites";
import { ToastAndroid } from "react-native";

const ShareButton = props => {
  const { shareItem } = props;

  const shareRecipe = async () => {
    try {
      await Share.share({
        message: `Mira la receta para ${shareItem.name} en el siguiente link: ${shareItem.video}`
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TouchableOpacity onPress={shareRecipe}>
      <Ionicons name='md-share' size={32} color='white' />
    </TouchableOpacity>
  );
};

const FavoriteButton = ({ favoriteItem }) => {
  const { addFavorite, findFavorite, removeFavorite } = useFavorites();

  const [isFavorite, setFavorite] = useState(false);

  const checkIsFavorite = async () => {
    const favorite = await findFavorite(favoriteItem.id);
    if (favorite) {
      setFavorite(true);
    }
  };

  useEffect(() => {
    checkIsFavorite();
  }, []);

  const addToFavorites = async () => {
    await addFavorite(favoriteItem);
    setFavorite(true);
    await checkIsFavorite();
    ToastAndroid.show("Añadido a favoritos", ToastAndroid.SHORT);
  };

  const removeFromFavorites = async () => {
    setFavorite(false);
    await removeFavorite(favoriteItem.id);
    ToastAndroid.show(
      "Se removió esta receta de tus favoritos",
      ToastAndroid.SHORT
    );
  };

  return (
    <TouchableOpacity
      onPress={isFavorite ? removeFromFavorites : addToFavorites}>
      <Ionicons
        style={{ marginHorizontal: 14 }}
        name={`${isFavorite ? "md-heart" : "md-heart-empty"}`}
        size={32}
        color='white'
      />
    </TouchableOpacity>
  );
};

const RecipeScreen = props => {
  const { navigation } = props;

  const foodItem = navigation.getParam("item", "");

  const recipesOfType = recetas.filter(x => x.type === foodItem.type);

  const filteredSuggestions = recipesOfType.filter(recipe => {
    return recipe.id !== foodItem.id;
  });

  const suggestedRecipes = pickRandom(filteredSuggestions, 4);

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
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 12 }}>
            Para {foodItem.quantity} personas
          </Text>
          <Text style={{ fontSize: 12, marginLeft: "auto" }}>
            Tiempo de preparación: {foodItem.time} minutos
          </Text>
        </View>
        <View style={styles.ingredientesContainer}>
          {foodItem.ingredients &&
            foodItem.ingredients.map((item, index) => {
              return <Text key={index}>{item}</Text>;
            })}
        </View>
        <Title>Preparación</Title>
        {Array.isArray(foodItem.recipe) &&
          foodItem.recipe.map((item, index) => {
            return <Text key={index}>. {item}</Text>;
          })}
        <Subheading style={{ marginTop: 12 }}>Hornos microondas</Subheading>
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
        <Subheading style={{ marginTop: 12 }}>Recetas sugeridas</Subheading>
        <View style={{ flexDirection: "row", marginBottom: 28 }}>
          <FlatList
            style={{ width: "95%" }}
            horizontal={true}
            data={suggestedRecipes}
            renderItem={FoodItem}
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
          <ShareButton shareItem={foodItem}></ShareButton>
          <FavoriteButton favoriteItem={foodItem}></FavoriteButton>
        </>
      );
    }
  };
};
export { RecipeScreen };
