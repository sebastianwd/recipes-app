import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { ActivityIndicator, Subheading } from "react-native-paper";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { useStorage } from "../hooks/useStorage";
import { Ionicons, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRecentSeen } from "../hooks/useRecentSeen";
import { FoodItem } from "../components/FoodItem";
import { withNavigationFocus } from "react-navigation";

const ProfileScreen = props => {
  const { navigation, isFocused } = props;
  const [user, setUser] = useState();
  const [recents, setRecents] = useState();
  const { storage } = useStorage();

  const { getRecentSeen } = useRecentSeen();

  useEffect(() => {
    (async () => {
      const currentUser = await storage.get("user");
      setUser(currentUser);

      setRecents(await getRecentSeen());
    })();
  }, [isFocused]);

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
        <View style={{ paddingLeft: 10 }}>
          <Subheading style={{ marginTop: 12 }}>
            Vistas recientemente
          </Subheading>

          <View style={{ flexDirection: "row", marginBottom: 28 }}>
            <FlatList
              style={{ width: "95%" }}
              horizontal={true}
              data={recents}
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

export default withNavigationFocus(ProfileScreen);
