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

  it('Should render', () => {
    expect(wrapper.toJSON()).toBeTruthy();
  });
});

describe('Testing secondary button', () => {
  const wrapper = renderer.create(<Button title="Test Button" secondary />);

  it('Should render', () => {
    expect(wrapper.toJSON()).toBeTruthy();
  });
});
