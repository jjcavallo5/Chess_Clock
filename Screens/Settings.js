import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';

const Settings = ({navigation}) => {
  const [selected, setSelected] = useState('5|0');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Text
        style={{
          color: '#251300',
          fontSize: 24,
          fontFamily: 'times new roman',
        }}>
        Time Control
      </Text>
      <Picker
        selectedValue={selected}
        style={styles.picker}
        mode="dropdown"
        onValueChange={(itemValue, index) => {
          setSelected(itemValue);
        }}>
        <Picker.Item label="   1|0   " value="1|0" />
        <Picker.Item label="   1|1   " value="1|1" />
        <Picker.Item label="   2|1   " value="2|1" />
        <Picker.Item label="   3|0   " value="3|0" />
        <Picker.Item label="   3|2   " value="3|2" />
        <Picker.Item label="   5|0   " value="5|0" />
        <Picker.Item label="   5|5   " value="5|5" />
        <Picker.Item label="   10|0  " value="10|0" />
        <Picker.Item label="   30|0  " value="30|0" />
        {/* <Picker.Item label="Custom" value="Custom" /> */}
      </Picker>
      <TouchableOpacity
        style={{
          backgroundColor: '#aa8351',
          height: 50,
          width: 100,
          borderRadius: 25,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('Home', {timeControl: selected});
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'times new roman',
          }}>
          Play!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fdf3c7',
    height: '100%',
  },
  header: {
    fontFamily: 'times new roman',
    fontSize: 48,
    margin: 30,
    color: '#251300',
    fontWeight: 'bold',
  },
  picker: {
    height: 100,
    width: 150,
    color: '#251300',
  },
});
