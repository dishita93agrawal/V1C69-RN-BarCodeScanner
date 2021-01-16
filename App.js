import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import ScanScreen from "./Screens/ScanScreen"
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

export default class App extends React.Component {
  render() {
    return (<AppContainer />)
  }
}

const tabNav = createBottomTabNavigator(
  {
    Scan: { screen: ScanScreen },
  })
  const AppContainer = createAppContainer(tabNav);