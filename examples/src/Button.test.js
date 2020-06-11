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

  // console.log('wrapperJSON', wrapper.toJSON());

  // get's the styles of the wrapper
  const styles = wrapper.toJSON().props.style;
  // pulls the fields of interest out of the styles object
  const {height, width, backgroundColor} = styles;

  // console.log('Children', wrapper.toJSON().children[0].props.style);

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

describe('testing other primary variants', () => {
  it('large button', () => {
    const wrapper = renderer.create(<Button title="test" large />);
    const styles = wrapper.toJSON().props.style;
    const {height, width, backgroundColor} = styles;
    // Child
    const childStyles = wrapper.toJSON().children[0].props.style;
    const {color: buttonTextColor} = childStyles;

    expect(height).toBe(60);
    expect(width).toBe(200);
    expect(backgroundColor).toBe('blue');
    expect(buttonTextColor).toBe('white');
  });

  it('custom width button', () => {
    const wrapper = renderer.create(<Button title="test" width={333} />);
    const styles = wrapper.toJSON().props.style;
    const {height, width, backgroundColor} = styles;
    // Child
    const childStyles = wrapper.toJSON().children[0].props.style;
    const {color: buttonTextColor} = childStyles;

    expect(height).toBe(40);
    expect(width).toBe(333);
    expect(backgroundColor).toBe('blue');
    expect(buttonTextColor).toBe('white');
  });
});
