# Write re-useable React Native components and unit test them with jest.

## Cycle 1

Picture this: You have just delivered a new feature, you've passed code review and you send it to QA for one last check that everything is working before releasing it to production.

QA tests and passes your feature 🎉 So a product/project manager tests the app before the final approval.

After a few hours (days) he reports that there are bugs in completely different places in the app which seemingly are un-related to the feature you have been working on, and thus sends it back to you because it's your branch who introduces the issues.

## Cycle 2

You notice that a style change in a commonly used UI component caused a lot of trouble all throughout the app. You fix it, tests all the screens, **even the ones that are not related to your feature**, sends it off to QA, who sends it to PM who finally gives it the OK. 🍾! This extra cycle took 3 days. (or it took 2 weeks because it was a long weekend, and someone in the chain was sick at some point.)

Now obviously that's a lot of hands in the mix to test new code and each step in between are prone to a lot of bottlenecks. People get sick, holidays, weekends, dog ate my laptop... you name it.

## The Point

**As you might expect:** That the second cycle would not be there if there was automated testing in the project. The tests would notify you that the code introduces errors in the app, and you would have fixed it even before sending our a request for code review. Boom, days, weeks saved from testing.

**Believe it or not** this is how <del>most</del> many projects are governed because everything is prioritized before writing proper tests (😱).

# The Tutorial

Let's write a React Native Button component which is re-useable and testing.

**The designer has given you the following specification for buttons**

| Property         | Values                                        |
| ---------------- | --------------------------------------------- |
| Dimensions (HxW) | - standard: 40 x 200 <br /> - large: 60 x 200 |
| Primary type     | - base color: blue <br /> - text color: white |
| Secondary type   | - base color: red <br /> - text color: white  |

And because we are l33t developers we also realize that we need to add some prop controls to this button because designers will change their minds. So we add controls for:

- baseColor: Type String to set custom base color
- textColor: Type string to set custom text color
- height: Type number to set custom height
- width: Type number to set custom width

following common API we also add a title prop and an onPress for a callback:

- onPress: type function to execute when button pressed
- title: type String to display inside the button

Alright, we know what to code so let's setup our component:

```
import react from "react";
import { TouchableOpacity, Text } from "react-native";

export default function Button(props) {
  // destructure our props
  const { title, onPress, primary, secondary, height, width } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

```

Nice! Halfway done. Let's add styling for the base button first. (I actually like to use styled-components but let's do this with react StyleSheet)

```
import react from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button(props) {
  // destructure our props
  const { title, onPress, primary, secondary, height, width } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
```
