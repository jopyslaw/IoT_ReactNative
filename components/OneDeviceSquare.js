import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Orientation, {OrientationType} from 'react-native-orientation-locker';

const OneDeviceSquare = props => {
  const nav = useNavigation();
  const openModal = () => {
    nav.navigate('Modal');
  };

  const getStyles = () => {
    if (props.orientation === OrientationType.PORTRAIT) {
      return [styles.square, {backgroundColor: props.color}];
    } else {
      return [styles.squareLandscape, {backgroundColor: props.color}];
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
      <TouchableOpacity>
        <View style={getStyles()}>
          <Text style={styles.dataFontSize}>{props.name}</Text>
          <Text style={styles.dataFontSize}>{props.place}</Text>
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
