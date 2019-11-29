import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { SignInScreen } from "../screens/SignInScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { AuthLoadingScreen } from "../screens/AuthLoadingScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { MaterialCommunityIcons as MaterialIcon } from "@expo/vector-icons";
import { SearchScreen } from "../screens/SearchScreen";
import { RecipeScreen } from "../screens/RecipeScreen";
import { TipsScreen } from "../screens/TipsScreen";
import BottomNav from "../components/ui/BottomNav";

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

const AppStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <MaterialIcon
            name={"home"}
            size={24}
            color={`${focused ? "black" : "gray"}`}
          />
        )
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <MaterialIcon
            name={"magnify"}
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
