import React from 'react';
import {View, Text, Button} from 'react-native';

export default function Home({navigation}) {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 22, marginBottom: 20}}>Available Examples</Text>
      <Button
        title="Button Example"
        onPress={() => navigation.navigate('ButtonExample')}
      />
      <Button
        title="TimeZone Example"
        onPress={() => navigation.navigate('TimeZoneExample')}
      />
    </View>
  );
}
