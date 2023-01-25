import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Touchable, TouchableOpacity, View, Text} from 'react-native';
import {BleManager} from 'react-native-ble-plx';

const manager = new BleManager();

const ConnectScreen = () => {
  const nav = useNavigation();
  const [devices, setDevices] = useState([]);
  const [characeristic, setCharacteristic] = useState();

  useEffect(() => {
    const bluetoothSubscription = manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        console.log('work');
        //scanAndConnect();
        bluetoothSubscription.remove();
      }
    }, true);
    return () => bluetoothSubscription.remove();
  }, []);

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        return;
      }
      if (device.name === 'GR_5') {
        manager.stopDeviceScan();
      }
    });
  };

  const findDevice = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('no bład');
        console.log(error);
        return;
      }
      if (device.name === 'GR_5') {
        setDevices(devices);
        manager.stopDeviceScan();
        device
          .connect()
          .then(device => {
            return device.discoverAllServicesAndCharacteristics();
          })
          .then(ch => {
            setCharacteristic({
              id: ch.id,
              serviceUUID: 'FFE0',
              characteristicUUID: 'FFE1',
            });
            console.log(ch);
            saveData({
              id: ch.id,
              serviceUUID: 'FFE0',
              characteristicUUID: 'FFE1',
            });
          })
          .catch(e => console.log(e));
      }
    });
  };

  connectDevice = () => {
    console.log('work connect');
    devices
      .connect()
      .then(device => {
        return device.discoverAllServicesAndCharacteristics();
      })
      .then(device => {
        setCharacteristic(device);
        console.log(device);
        saveData();
        return;
      })
      .catch(error => {
        console.log(error);
      });
  };

  const saveData = async data => {
    console.log('saved Data', JSON.stringify(data));
    await AsyncStorage.setItem('@deviceBlu', JSON.stringify(data));
    //nav.navigate('Modal');
  };

  return (
    <View>
      <TouchableOpacity onPress={findDevice}>
        <Text>Wyszukaj urządzenie</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectScreen;
