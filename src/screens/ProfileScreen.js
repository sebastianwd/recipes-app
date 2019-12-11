import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator, Subheading } from "react-native-paper";
import SafeAreaView from "react-native-safe-area-view";
import { ScrollView } from "react-native";
import { useStorage } from "../hooks/useStorage";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export const ProfileScreen = props => {
  const { navigation } = props;
  const [user, setUser] = useState();
  const { storage } = useStorage();

  useEffect(() => {
    (async () => {
      const currentUser = await storage.get("user");
      setUser(currentUser);
    })();
  }, []);

  if (!user) {
    return null;
  }
  const goSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <TouchableOpacity onPress={goSettings}>
          <Ionicons
            name='md-settings'
            style={{ alignSelf: "flex-end", padding: 12 }}
            size={32}
            color='black'
          />
        </TouchableOpacity>
        <View style={{ alignItems: "center", paddin: 10, marginTop: 6 }}>
          <Subheading> {user.name}</Subheading>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
