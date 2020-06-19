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
