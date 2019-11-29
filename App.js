import React, { Component } from "react";
import AppContainer from "./src/shared/navigators";
import NavigationService from "./src/shared/NavigationService";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  mode: "exact",
  colors: {
    ...DefaultTheme.colors,
    primary: "#26263d",
    accent: "tomato"
  }
};

export default class App extends Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}></AppContainer>
      </PaperProvider>
    );
  }
}
