import React, { useState } from "react";
import { BottomTabBar } from "react-navigation-tabs";
import { withTheme } from "react-native-paper";

const BottomNav = ({ theme, ...otherProps }) => {
  const { colors } = theme;

  return (
    <BottomTabBar
      {...otherProps}
      style={{ backgroundColor: colors.background }}
    />
  );
};

export default withTheme(BottomNav);
