import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import Stopwatch from '../Components/Stopwatch';

const Homescreen = ({navigation}) => {
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [initPress, setInitPress] = useState(true);

  return (
    <View style={styles.container}>
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
          hr={0}
          min={5}
          sec={0}
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
          hr={0}
          min={5}
          sec={10}
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
    backgroundColor: 'green',
    height: 50,
    width: 50,
    zIndex: 1,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
