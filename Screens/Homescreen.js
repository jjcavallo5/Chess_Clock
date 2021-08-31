import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import Stopwatch from '../Components/Stopwatch';

const Homescreen = ({route, navigation}) => {
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [initPress, setInitPress] = useState(true);

  const getHMS = timeControl => {
    console.log(timeControl);
    let tokens = timeControl.split('|');

    let hms = {
      hours: 0,
      minutes: parseInt(tokens[0]),
      seconds: 0,
    };
    console.log(hms);
    return hms;
  };

  const [hms, setHMS] = useState({
    hours: 0,
    minutes: 5,
    seconds: 0,
  });

  useEffect(() => {
    const timeControl = route.params ? route.params.timeControl : '5|0';
    setHMS(getHMS(timeControl));
  }, [route.params]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settings}
        onPress={() => {
          navigation.navigate('Settings');
        }}
      />

      <TouchableOpacity
        style={[styles.clocks, {backgroundColor: 'blue'}]}
        onPress={() => {
          if (initPress) {
            setActive1(!active1);
            setInitPress(false);
            return;
          }
          setActive2(!active2);
          setActive1(!active1);
        }}>
        <Stopwatch
          style={{
            fontFamily: 'times new roman',
            fontSize: 60,
            transform: [{rotate: '180deg'}],
          }}
          hr={hms.hours}
          min={hms.minutes}
          sec={hms.seconds}
          active={active2}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.pause}
        onPress={() => {
          setActive1(false);
          setActive2(false);
          setInitPress(true);
        }}>
        <Text style={{fontSize: 20}}>ll</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.clocks, {backgroundColor: 'red'}]}
        onPress={() => {
          if (initPress) {
            setActive2(!active2);
            setInitPress(false);
            return;
          }
          setActive2(!active2);
          setActive1(!active1);
        }}>
        <Stopwatch
          style={{
            fontFamily: 'times new roman',
            fontSize: 60,
          }}
          hr={hms.hours}
          min={hms.minutes}
          sec={hms.seconds}
          active={active1}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  clocks: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    width: '100%',
  },
  pause: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -25}, {translateY: -25}],
    backgroundColor: 'lime',
    height: 50,
    width: 50,
    zIndex: 1,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settings: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'gray',
    height: 40,
    width: 40,
    borderRadius: 20,
    zIndex: 1,
  },
});
