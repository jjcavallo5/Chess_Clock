import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
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
      interval: parseInt(tokens[1]),
    };
    console.log(hms);
    return hms;
  };

  const [hms, setHMS] = useState({
    hours: 0,
    minutes: 5,
    seconds: 0,
    interval: 0,
    reset: false,
  });

  useEffect(() => {
    const timeControl = route.params ? route.params.timeControl : '5|0';
    setHMS(getHMS(timeControl));
  }, [route.params]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.clocks, {backgroundColor: '#aa8351'}]}
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
            fontWeight: 'bold',
            transform: [{rotate: '180deg'}],
            color: '#251300',
          }}
          hr={hms.hours}
          min={hms.minutes}
          sec={hms.seconds}
          interval={hms.interval}
          reset={hms.reset}
          active={active2}
        />
      </TouchableOpacity>

      <View style={styles.pause}>
        <TouchableOpacity
          onPress={() => {
            setActive1(false);
            setActive2(false);
            setInitPress(true);
          }}>
          <Image source={require('../images/pause.png')} style={styles.icons} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => {
            setActive1(false);
            setActive2(false);
            setInitPress(true);
            navigation.navigate('Settings');
          }}>
          <Image source={require('../images/clock.png')} style={styles.icons} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => {
            setActive1(false);
            setActive2(false);
            setInitPress(true);
            const timeControl = route.params ? route.params.timeControl : '5|0';
            setHMS(getHMS(timeControl));
            setHMS({...hms, reset: !hms.reset});
          }}>
          <Image source={require('../images/reset.png')} style={styles.icons} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.clocks, {backgroundColor: '#251300'}]}
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
            color: '#fdf3c7',
            fontWeight: 'bold',
          }}
          hr={hms.hours}
          min={hms.minutes}
          sec={hms.seconds}
          interval={hms.interval}
          reset={hms.reset}
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
    transform: [{translateX: -75}, {translateY: -25}],
    backgroundColor: '#fdf3c7',
    borderWidth: 5,
    height: 50,
    width: 150,
    zIndex: 1,
    borderRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    height: 25,
    width: 25,
  },
});
