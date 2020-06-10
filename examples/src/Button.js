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

  if (!title) {
    throw new Error('No title added!');
  }

  let HEIGHT = large ? 60 : 40;
  const WIDTH = width ? width : 200;
  let BACKGROUND_COLOR = secondary ? 'red' : 'blue';
  let TEXT_COLOR = 'white';

  if (height) HEIGHT = height;
  if (baseColor) BACKGROUND_COLOR = baseColor;
  if (textColor) TEXT_COLOR = textColor;

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
