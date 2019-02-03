/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { View, ActivityIndicator } from "react-native";
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore'
import { PersistGate } from 'redux-persist/lib/integration/react';

import ListingScreen from './components/ListingScreen';
import DetailsScreen from './components/DetailsScreen';

const RootStack = createStackNavigator({
  Listing: ListingScreen,
  Details: DetailsScreen
}, {
    initialRouteName: "Listing"
  }

);

const AppContainer = createAppContainer(RootStack);

const { store, persistor } = ConfigureStore();


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={
          <View style={{ flex: 1 }}>
            <ActivityIndicator size="large" />
          </View>}
          persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
