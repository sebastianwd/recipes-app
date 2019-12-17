import React, { useEffect, useState, useRef } from "react";
import { Text, Button, Subheading, Surface } from "react-native-paper";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import { Dimensions, View, StyleSheet } from "react-native";
import { FoodItem } from "../components/FoodItem";
import { useFavorites } from "../hooks/useFavorites";
import { tips } from "../shared/data/tips";
import { Video } from "expo-av";
import Carousel from "react-native-snap-carousel";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    elevation: 4
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
  const carouselRef = useRef();

  const renderItem = ({ item }) => (
    <Surface style={styles.surface}>
      <View>
        <Text style={{ height: 40 }}>{item.title}</Text>
        <Video
          source={{ uri: item.video || "" }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode='cover'
          useNativeControls={true}
          style={{ width: "100%", height: 250 }}
        />
      </View>
    </Surface>
  );

  return (
    <SafeAreaView>
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
      </View>
    </SafeAreaView>
  );
};
