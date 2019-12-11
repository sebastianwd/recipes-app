import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Subheading,
  Searchbar,
  Chip
} from "react-native-paper";
import SafeAreaView from "react-native-safe-area-view";
import { ScrollView } from "react-native";
import { useStorage } from "../hooks/useStorage";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export const FilterScreen = props => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Searchbar placeholder='Buscar' style={styles.input} />

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
          <Chip style={styles.chip}>Example Chip</Chip>
          <Chip style={styles.chip}>Example Chip</Chip>
          <Chip style={styles.chip}>Example Chip</Chip>
        </View>
        <Subheading>Ocasión</Subheading>
        <View style={styles.chipContainer}>
          <Chip style={styles.chip}>Example Chip</Chip>
          <Chip style={styles.chip}>Example Chip</Chip>
          <Chip style={styles.chip}>Example Chip</Chip>
          <Chip style={styles.chip}>Example Chip</Chip>
          <Chip style={styles.chip}>Example Chip</Chip>
        </View>
        <Subheading>Estilo de plato</Subheading>
        <View style={styles.chipContainer}>
          <Chip style={styles.chip}>Example Chip</Chip>
          <Chip style={styles.chip}>Example Chip</Chip>
          <Chip style={styles.chip}>Example Chip</Chip>
          <Chip style={styles.chip}>Example Chip</Chip>
        </View>
        <Subheading>Dieta</Subheading>
        <View style={styles.chipContainer}>
          <Chip style={styles.chip}>Example Chip</Chip>
          <Chip style={styles.chip}>Example Chip</Chip>
          <Chip style={styles.chip}>Example Chip</Chip>
          <Chip style={styles.chip}>Example Chip</Chip>
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
    margin: 4
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
