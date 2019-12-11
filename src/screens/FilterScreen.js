import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Subheading,
  Searchbar,
  Chip,
  Headline
} from "react-native-paper";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { useStorage } from "../hooks/useStorage";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const FilterScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ paddingHorizontal: 12, marginVertical: 12 }}>
          <Subheading>Dificultad</Subheading>
          <View style={styles.chipContainer}>
            <Chip style={styles.chip}>Menos de 15 minutos</Chip>
            <Chip style={styles.chip}>Fácil</Chip>
            <Chip style={styles.chip}>Con 5 ingredientes</Chip>
          </View>
          <Subheading>Comida</Subheading>
          <View style={styles.chipContainer}>
            <Chip style={styles.chip}>Desayunos</Chip>
            <Chip style={styles.chip}>Almuerzo</Chip>
            <Chip style={styles.chip}>Aperitivos</Chip>
            <Chip style={styles.chip}>Postres</Chip>
            <Chip style={styles.chip}>Cena</Chip>
            <Chip style={styles.chip}>Snacks</Chip>
          </View>
          <Subheading>Ocasión</Subheading>
          <View style={styles.chipContainer}>
            <Chip style={styles.chip}>BBQ</Chip>
            <Chip style={styles.chip}>Brunch</Chip>
            <Chip style={styles.chip}>Casual</Chip>
            <Chip style={styles.chip}>Ocasión especial</Chip>
            <Chip style={styles.chip}>Cena de noche</Chip>
          </View>
          <Subheading>Estilo de plato</Subheading>
          <View style={styles.chipContainer}>
            <Chip style={styles.chip}>Internacional</Chip>
            <Chip style={styles.chip}>Comida criolla</Chip>
            <Chip style={styles.chip}>Fusión</Chip>
            <Chip style={styles.chip}>Peruana</Chip>
          </View>
          <Subheading>Dieta</Subheading>
          <View style={styles.chipContainer}>
            <Chip style={styles.chip}>Example Chip</Chip>
            <Chip style={styles.chip}>Example Chip</Chip>
            <Chip style={styles.chip}>Example Chip</Chip>
            <Chip style={styles.chip}>Example Chip</Chip>
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
    height: 40
  },
  chip: {
    alignSelf: "flex-start",
    margin: 4,
    paddingVertical: 4
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

FilterScreen.navigationOptions = () => {
  return {
    title: "Filtros"
  };
};

export { FilterScreen };
