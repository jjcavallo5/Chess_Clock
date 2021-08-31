import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, Alert} from 'react-native';

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
  });

  useEffect(() => {
    setTimer({
      hr: formatString(props.hr),
      min: formatString(props.min),
      sec: formatString(props.sec),
    });
  }, [props]);

  const [clock, setClock] = useState(null);

  const handleActivation = () => {
    let sec = Number(timer.sec);
    let min = Number(timer.min);
    let hr = Number(timer.hr);
    let clock = setInterval(() => {
      if (min == 0 && sec == 0 && hr == 0) handleOutOfTime();

      if (min == 0 && sec == 0) {
        hr -= 1;
        min = 59;
        sec = 59;
      }
      if (sec == 0) {
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
    clearInterval(clock);
  };

  //! =========
  const handleOutOfTime = () => {
    Alert.alert('Out of time');
  };

  useEffect(() => {
    console.log(props.active);
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
