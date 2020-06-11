import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

export default (Button = props => {
  // destructure our props
  const {
    title,
    onPress,
    secondary,
    large,
    height,
    width,
    baseColor,
    textColor,
  } = props;

  if (!title) return new Error('No title added!');

  const HEIGHT = large ? 60 : height ? height : 40;
  const WIDTH = width ? width : 200;
  const BACKGROUND_COLOR = secondary ? 'red' : baseColor ? baseColor : 'blue';
  const TEXT_COLOR = textColor ? textColor : 'white';

  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BACKGROUND_COLOR,
        height: HEIGHT,
        width: WIDTH,
      }}
      onPress={onPress}>
      <Text style={{color: TEXT_COLOR}}>{title}</Text>
    </TouchableOpacity>
  );
});
