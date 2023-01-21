import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import {BleManager} from 'react-native-ble-plx';

const manager = new BleManager();

const OneDeviceSquare = props => {
  const nav = useNavigation();
  const openModal = () => {
    nav.navigate('Modal');
  };

  const openModalWithData = () => {
    //console.log(props.id);
    nav.navigate('Modal', {id: props.id});
  };

  const getStyles = () => {
    if (props.orientation === OrientationType.PORTRAIT) {
      return [styles.square, {backgroundColor: props.color}];
    } else {
      return [styles.squareLandscape, {backgroundColor: props.color}];
    }
  };

  const sendData = async () => {
    console.log('work one device');
    const deviceData = await AsyncStorage.getItem('@deviceBlu');
    const parsedData = JSON.parse(deviceData);
    if (parsedData) {
      console.log('data is send');
      manager
        .writeCharacteristicWithResponseForDevice(
          parsedData.id,
          parsedData.serviceUUIDs,
          parsedData.characteristicUUID,
          Buffer.from(props.command, 'base64'),
        )
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }
  };

  if (props.added) {
    return (
      <TouchableOpacity onPress={openModal}>
        <View style={styles.square}>
          <Text style={styles.fontSize}>+</Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={openModalWithData}>
        <View style={getStyles()}>
          <Text style={styles.dataFontSize}>{props.name}</Text>
          <Text style={styles.dataFontSize}>{props.place}</Text>
          <TouchableOpacity onPress={sendData}>
            <Text>Send data</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  square: {
    width: 175,
    height: 180,
    backgroundColor: 'blue',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 50,
    borderRadius: 20,
  },
  squareLandscape: {
    width: 165,
    height: 170,
    backgroundColor: 'blue',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 50,
    borderRadius: 20,
  },
  fontSize: {
    fontSize: 50,
  },
  dataFontSize: {
    fontSize: 25,
    fontFamily: 'SairaCondensed-ExtraLight',
  },
});

export default OneDeviceSquare;
