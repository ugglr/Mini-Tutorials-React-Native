import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Screen imports
import HomeScreen from './src/screens/Home';
import ButtonExampleScreen from './src/screens/ButtonExample';
import TimeZoneExampleScreen from './src/screens/TimeZoneExample';

// navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ButtonExample" component={ButtonExampleScreen} />
        <Stack.Screen
          name="TimeZoneExample"
          component={TimeZoneExampleScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
