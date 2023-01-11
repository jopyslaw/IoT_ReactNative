import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import OneDeviceSquare from '../components/OneDeviceSquare';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';

const DeviceScreen = () => {
  const [devices, setDevices] = useState([]);
  const [ready, setReady] = useState(false);
  const focus = useIsFocused();
  const [orientation, setOrientation] = useState(
    Orientation.getInitialOrientation(),
  );

  useEffect(() => {
    SplashScreen.hide();
    getAddedDevices();
    Orientation.addDeviceOrientationListener(orientation => {
      setOrientation(orientation);
    });
    console.log(Orientation.getInitialOrientation());
  }, [focus]);

  const getAddedDevices = async () => {
    const data = await AsyncStorage.getItem('@addedDevices');
    if (data) {
      const parse = JSON.parse(data);
      setDevices(parse);
    } else {
      setDevices([]);
    }
    setReady(true);
  };

  if (ready && devices?.length !== 0) {
    return (
      <ScrollView>
        <View style={styles.container}>
          {devices.map((device, index) => (
            <OneDeviceSquare
              key={index}
              name={device.name}
              color={device.color}
              command={device.command}
              place={device.place}
              added={false}
              orientation={orientation}
            />
          ))}
          <OneDeviceSquare added={true} orientation={orientation} />
        </View>
      </ScrollView>
    );
  } else if (ready && devices.length === 0) {
    return (
      <View style={styles.container}>
        <OneDeviceSquare added={true} orientation={orientation} />
      </View>
    );
  } else {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeviceScreen;
