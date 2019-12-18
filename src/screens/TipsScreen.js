import React, { useEffect, useState, useRef } from "react";
import { Text, Button, Subheading, Surface } from "react-native-paper";
import { SafeAreaView, withNavigationFocus, FlatList } from "react-navigation";
import { Dimensions, View, StyleSheet } from "react-native";
import { FoodItem } from "../components/FoodItem";
import { useFavorites } from "../hooks/useFavorites";
import { tips } from "../shared/data/tips";
import { Video } from "expo-av";
import Carousel from "react-native-snap-carousel";
import { Feather } from "@expo/vector-icons";
import { pickRandom } from "../shared/util";
import { recetas } from "../shared/data";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  surface: {
    shadowColor: "black",
    shadowOffset: { width: 5, height: 7 },
    shadowRadius: 13,
    shadowOpacity: 0.8,
    elevation: 5,
    backgroundColor: "white",
    padding: 6,
    margin: 6
  },
  slider: {
    marginTop: 15,
    overflow: "visible" // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  }
});

export const TipsScreen = props => {
  const quickRecipes = pickRandom(recetas, 4);

  const popularRecipes = pickRandom(recetas, 4);

  const renderItem = ({ item }) => (
    <View style={styles.surface}>
      <Text style={{ height: 40 }}>{item.title}</Text>
      <Video
        source={{ uri: item.video || "" }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode='cover'
        useNativeControls={true}
        style={{ width: "100%", height: 250, borderRadius: 8 }}
      />
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ marginTop: 30 }}>
          <View style={{ flexDirection: "row" }}>
            <Carousel
              data={tips}
              renderItem={renderItem}
              sliderWidth={width}
              itemWidth={width / 1.15}
              inactiveSlideScale={0.95}
              inactiveSlideOpacity={1}
              enableMomentum={true}
              activeSlideAlignment={"start"}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              activeAnimationType={"spring"}
              activeAnimationOptions={{
                friction: 4,
                tension: 40
              }}
            />
            <Feather
              name={"chevrons-right"}
              size={24}
              style={{ alignSelf: "center" }}></Feather>
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Subheading style={{ marginTop: 12 }}>Recetas rápidas</Subheading>
            <View style={{ flexDirection: "row", marginBottom: 28 }}>
              <FlatList
                style={{ width: "95%" }}
                horizontal={true}
                data={quickRecipes}
                renderItem={FoodItem}
                keyExtractor={item => String(item.id)}
              />
              <Feather
                name={"chevrons-right"}
                size={24}
                style={{ alignSelf: "center" }}></Feather>
            </View>
            <Subheading style={{ marginTop: 12 }}>Más populares</Subheading>
            <View style={{ flexDirection: "row", marginBottom: 28 }}>
              <FlatList
                style={{ width: "95%" }}
                horizontal={true}
                data={popularRecipes}
                renderItem={FoodItem}
                keyExtractor={item => String(item.id)}
              />
              <Feather
                name={"chevrons-right"}
                size={24}
                style={{ alignSelf: "center" }}></Feather>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
