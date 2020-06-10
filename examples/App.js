/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text, Dimensions, Alert} from 'react-native';

import Button from './src/Button';

const {height, width} = Dimensions.get('screen');

const App = () => {
  return (
    <View
      style={{height, width, alignItems: 'center', justifyContent: 'center'}}>
      {/* Renders standard / primary button */}
      <Text>Primary</Text>
      <Button title="Test Button" />

      {/* Renders standard / primary button */}
      <Text>Primary Large</Text>
      <Button title="Test Button" large />

      {/* Renders secondary button */}
      <Text>Secondary</Text>
      <Button title="Test Button" secondary />

      {/* Renders secondary button */}
      <Text>Secondary Large</Text>
      <Button title="Test Button" secondary large />

      {/* Renders button with custom width & height */}
      <Text>custom width & height</Text>
      <Button title="Test Button" height={100} width={300} />

      {/* Renders button with custom baseColor and custom textColor */}
      <Text>Custom colors</Text>
      <Button title="Test Button" baseColor="lightpink" textColor="purple" />

      {/* Renders button with alert callback function */}
      <Text>with onPress callback</Text>
      <Button
        title="Test Button"
        onPress={() => Alert.alert('Button pressed')}
      />
    </View>
  );
};

export default App;
