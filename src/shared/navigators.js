import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { SignInScreen } from "../screens/SignInScreen";
import HomeScreen from "../screens/HomeScreen";
import { AuthLoadingScreen } from "../screens/AuthLoadingScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { MaterialCommunityIcons as MaterialIcon } from "@expo/vector-icons";
import { SearchScreen } from "../screens/SearchScreen";
import { RecipeScreen } from "../screens/RecipeScreen";
import { TipsScreen } from "../screens/TipsScreen";
import BottomNav from "../components/ui/BottomNav";
import { ProfileScreen } from "../screens/ProfileScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { FilterScreen } from "../screens/FilterScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null
      }
    },
    Settings: {
      screen: SettingsScreen
    }
  },
  {
    initialRouteName: "Profile",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#26263d"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    Recipe: {
      screen: RecipeScreen
    },
    Filter: {
      screen: FilterScreen
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#26263d"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const FavoritesStack = createStackNavigator(
  {
    Favorites: {
      screen: FavoritesScreen,
      navigationOptions: {
        header: null
      }
    },
    Recipe: {
      screen: RecipeScreen
    }
  },
  {
    initialRouteName: "Favorites",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#26263d"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const AppStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        title: "Buscar",
        tabBarIcon: ({ focused }) => (
          <MaterialIcon
            name={"magnify"}
            size={24}
            color={`${focused ? "black" : "gray"}`}
          />
        )
      }
    },
    Favorites: {
      screen: FavoritesStack,
      navigationOptions: {
        title: "Favoritos",
        tabBarIcon: ({ focused }) => (
          <MaterialIcon
            name={"heart"}
            size={24}
            color={`${focused ? "black" : "gray"}`}
          />
        )
      }
    },
    Tips: {
      screen: TipsScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <MaterialIcon
            name={"lightbulb-outline"}
            size={24}
            color={`${focused ? "black" : "gray"}`}
          />
        )
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        title: "Perfil",
        tabBarIcon: ({ focused }) => (
          <MaterialIcon
            name={"account"}
            size={24}
            color={`${focused ? "black" : "gray"}`}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    tabBarComponent: props => <BottomNav {...props} />,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#26263d"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const AuthStack = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      header: null
    }
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
