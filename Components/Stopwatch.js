import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, Alert} from 'react-native';
import Sound from 'react-native-sound';
Sound.setCategory('Playback');
let alarm = new Sound('alarm.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('Failed to load alarm', error);
    return;
  }
});

const formatString = number => {
  let str = number.toString();
  if (str.length == 1) str = '0' + number.toString();
  return str;
};

const Stopwatch = props => {
  const [timer, setTimer] = useState({
    hr: formatString(props.hr),
    min: formatString(props.min),
    sec: formatString(props.sec),
    interval: props.interval,
  });

  useEffect(() => {
    setTimer({
      hr: formatString(props.hr),
      min: formatString(props.min),
      sec: formatString(props.sec),
      interval: props.interval,
    });
  }, [props.min, props.interval, props.reset]);

  const [clock, setClock] = useState(null);

  const handleActivation = () => {
    let sec = Number(timer.sec);
    let min = Number(timer.min);
    let hr = Number(timer.hr);
    let clock = setInterval(() => {
      if (min == 0 && sec == 0 && hr == 0) {
        clearInterval(clock);
        handleOutOfTime();
      } else if (min == 0 && sec == 0) {
        hr -= 1;
        min = 59;
        sec = 59;
      } else if (sec == 0) {
        sec = 59;
        min -= 1;
      } else {
        sec -= 1;
      }

      let secString = formatString(sec);
      let minString = formatString(min);
      setTimer({...timer, sec: secString, min: minString});
    }, 1000);
    setClock(clock);
  };

  const handlePause = () => {
    console.log(timer.interval);
    let sec = Number(timer.sec);
    let min = Number(timer.min);
    if (sec + timer.interval > 59) {
      sec = sec + timer.interval - 60;
      min += 1;
    } else {
      sec = sec + timer.interval;
    }
    setTimer({...timer, sec: formatString(sec), min: formatString(min)});
    clearInterval(clock);
  };

  //! =========
  const handleOutOfTime = () => {
    alarm.play(success => {
      if (success) {
        console.log('Played alarm');
      } else {
        console.log('Failed to play alarm.');
      }
    });
    Alert.alert('Out of time');
  };

  useEffect(() => {
    if (props.active) handleActivation();
    else handlePause();
  }, [props.active]);

  return (
    <Text style={props.style}>
      {timer.min}:{timer.sec}
    </Text>
  );
};

export default Stopwatch;
