/**
 * @format
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import Button from './Button';

describe('Testing primary button', () => {
  const wrapper = renderer.create(<Button title="Test Button" />);
  // get's the styles of the wrapper
  const styles = wrapper.toJSON().props.style;
  // pulls the fields of interest out of the styles object
  const {height, width, backgroundColor} = styles;

  // console.log('Wrapper children', wrapper.toJSON().children[0]);

  // get's the child styles
  const childStyles = wrapper.toJSON().children[0].props.style;
  // pulls the field of interest
  const {color: buttonTextColor} = childStyles;

  it('Should render', () => {
    expect(wrapper.toJSON()).toBeTruthy();
  });

  it('Should have height of 40', () => {
    expect(height).toBe(40);
  });

  it('Should have width of 200', () => {
    expect(width).toBe(200);
  });

  it('Should have blue background', () => {
    expect(backgroundColor).toBe('blue');
  });

  // Child Tests
  it('Should have white text', () => {
    expect(buttonTextColor).toBe('white');
  });
});
