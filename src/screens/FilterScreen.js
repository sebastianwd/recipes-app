import React, { useRef, memo, Fragment, useState, useEffect } from "react";
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
import { Tags } from "../shared/data/tags";
import { useTagFilters } from "../hooks/useTagFilters";

const ChipItem = memo(props => {
  const { item } = props;
  const { addTagFilter, findTagFilter, removeTagFilter } = useTagFilters();
  const [isActive, setActive] = useState(false);

  const addFilter = async () => {
    setActive(true);
    await addTagFilter(item);
  };

  const removeFilter = async () => {
    setActive(false);
    await removeTagFilter(item.id);
  };

  useEffect(() => {
    (async () => {
      const found = await findTagFilter(item.id);
      setActive(!!found);
    })();
  }, []);

  return (
    <TouchableOpacity onPress={() => (isActive ? removeFilter() : addFilter())}>
      <Chip key={item.id} style={isActive ? styles.activeChip : styles.chip}>
        {item.name}
        {isActive && "   X"}
      </Chip>
    </TouchableOpacity>
  );
});

const FilterScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ paddingHorizontal: 12, marginVertical: 12 }}>
          {Tags.map(tag => {
            return (
              <Fragment key={tag.title}>
                <Subheading>{tag.title}</Subheading>
                <View style={styles.chipContainer}>
                  {tag.items.map(item => {
                    return <ChipItem key={item.id} item={item}></ChipItem>;
                  })}
                </View>
              </Fragment>
            );
          })}
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
  activeChip: {
    alignSelf: "flex-start",
    margin: 4,
    paddingVertical: 4,
    backgroundColor: "salmon"
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
