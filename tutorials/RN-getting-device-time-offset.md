---
title: React Native: Getting user device timezone and converting time-stamps dynamically 
published: false
description: Contrary to web React Native does not run in a browser, so it get's tricky when trying to get timezone offsets and accounting for daylight savings time.   
tags: 
//cover_image: https://direct_url_to_image.jpg
---

Recently I was tasked to convert all backend generated timestamps from the default UTC to our users device timezone. This is my process of how I encountered some issues along the way and how I solved my ticket.

## Flowchart

**This is the flow I implemented:**

1. Get user UTC offset in hours.
2. Send backend timestamp & offset into a conversion function which returns the converted+formatted string to the frontend

**The function in step 2 would work like this:**

params:
`String: dateString`
`Int: offset`

1. Parse the date string `dateString`.
2. Convert data into JS Date object.
3. Get the current hours of the date object by using JS `Date` built in function `getHours()` method.
4. Set new hours on the Date object by using JS `Date` built in function `setHours()`, where we pass in the current hours and add the offset passed into the function.
5. Format the string to the frontend
6. Return the new converted timestamp

**Let's see that in action:**

# Building the conversion function

The function would be called like this:

```
const convertedTimeStamp = formatTimeByOffset(utcStringFromBE, offset)
```

And the function I built based on the steps above looks like this:

```
export const formatTimeByOffset = (dateString, offset) => {
  // Params:
  // How the backend sends me a timestamp
  // dateString: on the form yyyy-mm-dd hh:mm:ss
  // offset: the amount of hours to add.

  // If we pass anything falsy return empty string
  if (!dateString) return ''
  if (dateString.length === 0) return ''

  // Step 1: Parse the backend date string

  // Get Parameters needed to create a new date object
  const year = dateString.slice(0, 4)
  const month = dateString.slice(5, 7)
  const day = dateString.slice(8, 10)
  const hour = dateString.slice(11, 13)
  const minute = dateString.slice(14, 16)
  const second = dateString.slice(17, 19)

  // Step: 2 Make a JS date object with the data
  const dateObject = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`)

  // Step 3: Get the current hours from the object
  const currentHours = dateObject.getHours()

  // Step 4: Add the offset to the date object
  dateObject.setHours(currentHours + offset)

  // Step 5: stringify the date object, replace the T with a space and slice off the seconds.
  const newDateString = dateObject
    .toISOString()
    .replace('T', ' ')
    .slice(0, 16)

  // Step 6: Return the new formatted date string with the added offset
  return `${newDateString}`
}
```

I tested it out and boom, it works when I pass in random offsets. The time converts properly even when time goes over midnight etc. that is taken care of the JS Date `setHours()` method.

> Awesome now I just need to get the user offset and we are done.

**Not quite**

## JS Date

My initial thought was that I simply use this method according to the docs here: [JS Date getTimeZone() method](https://www.w3schools.com/jsref/jsref_gettimezoneoffset.asp)

```
const now = new Date()
const utcTimeOffset = now.getTimezoneOffset() / 60;
```

\*NOTE: Divided by 60 because the method returns the offset in minutes.

**Gave the wrong time**
However, changing my timezone to the west coast in America (for instance) gave me the wrong converted timestamp by 1 hour!

## Daylight Savings Time

If we running in a browser this probably would have worked, because the browsers these days will return you a DST adjusted offset (correct me if I'm wrong).

However since we are not running in the browser we need to figure out a different way to determine if the user is affected by daylight savings time events. To do this manually will be tricky, because not all countries use DST and when they do, they don't use the same date and time when it goes into power. **So what do we do?**

Let's figure out the timezone of the user somehow first, even though we are not running in a browser we are running on a mobile device. There must be a way of getting the time of the device and use that to our advantage.

## Getting the mobile device timezone

Every time I want to use a native module in react native, like using the camera, I turn to [React native community on Github](https://github.com/react-native-community)

Fortunately for us the community have a native module which is called [react-native-community/react-native-localize](https://github.com/react-native-community/react-native-localize)

I went in and read the docs and found the following method:
[getTimeZone()](https://github.com/react-native-community/react-native-localize#gettimezone)

it is described like this:

### getTimeZone()

Returns the user preferred timezone (based on its device settings, not on its position).

```
console.log(RNLocalize.getTimeZone());
// -> "Europe/Paris"
```

Alright, good. I installed the package into my project by doing the usual:

```
yarn add react-native-localize

cd ios && pod install

cd ..

yarn run ios
```

I ran the example above:

```
console.log(RNLocalize.getTimeZone());
// -> "Asia/Shanghai"
```

Ok great if worse comes to worse I can make some kind of lookup table where I keep track of when different timezones go into DST etc. **But there's no need for that, so let's bring in the moment time-zone library**

## Moment Timezone

[Moment Timezone Docs](https://momentjs.com/timezone/)

The moment timezone library can take the timezone value generated above and return the UTC offset. Neat!

Installation:

```
yarn add moment-timezone
```

Combined with getting the device timezone above we can use it like this

```
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import {formatTimeByOffset} from '../helpers/formatTimeByOffset';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment-timezone';

function Component() {
  const [timeToDisplay, setTimeToDisplay] = useState('');

  const backEndTimeStamp = '2001-04-11 10:00:00';

  // get device timezone eg. -> "Asia/Shanghai"
  const deviceTimeZone = RNLocalize.getTimeZone();

  // Make moment of right now, using the device timezone
  const today = moment().tz(deviceTimeZone);

  // Get the UTC offset in hours
  const currentTimeZoneOffsetInHours = today.utcOffset() / 60;

  useEffect(() => {
    // Run the function as we coded above.
    const convertedToLocalTime = formatTimeByOffset(
      backEndTimeStamp,
      currentTimeZoneOffsetInHours,
    );

    // Set the state or whatever
    setTimeToDisplay(convertedToLocalTime);
  }, []);

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 22, marginBottom: 20}}>Time-Example</Text>
      <Text style={{fontSize: 14, marginBottom: 20}}>
        Time passed into the function: {backEndTimeStamp}
      </Text>
      <Text style={{fontSize: 14, marginBottom: 20}}>
        Converted To local timezone: {timeToDisplay}
      </Text>
      <Text>Your timezone: {deviceTimeZone}</Text>
    </View>
  );
}

export default Component;
```

Let's see that in action:
