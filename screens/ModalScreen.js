import React from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalScreen = () => {
  const nav = useNavigation();

  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [command, setCommand] = useState('');
  const [color, setColor] = useState('');

  handleSubmit = async () => {
    const obj = {
      name,
      place,
      command,
      color,
    };
    const prevObjects = await AsyncStorage.getItem('@addedDevices');
    if (prevObjects) {
      const newArray = JSON.parse(prevObjects);
      const arr = [...newArray, obj];
      await Promise.all(
        AsyncStorage.removeItem('@addedDevices'),
        AsyncStorage.setItem('@addedDevices', JSON.stringify(arr)),
      );
    } else {
      const data = [obj];
      await AsyncStorage.setItem('@addedDevices', JSON.stringify(data));
    }
    nav.goBack();
  };

  handleBack = () => {
    nav.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            style={styles.inputStyle}
          />
          <TextInput
            value={place}
            onChangeText={setPlace}
            placeholder="Place"
            style={styles.inputStyle}
          />
          <TextInput
            value={command}
            onChangeText={setCommand}
            placeholder="Command"
            style={styles.inputStyle}
          />
        </View>
        <View styles={styles.pickerContainer}>
          <Text>Choose color</Text>
          <ColorPicker
            color={color}
            onColorChange={color => setColor(color)}
            thumbSize={30}
            sliderSize={30}
            noSnap={true}
            row={false}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnStyle} onPress={handleBack}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStyle} onPress={handleSubmit}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  inputStyle: {
    borderColor: 'black',
    padding: 5,
    borderWidth: 1,
    margin: 5,
    borderRadius: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  btnStyle: {
    padding: 15,
    backgroundColor: 'gray',
    borderRadius: 20,
    margin: 10,
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
  },
});

export default ModalScreen;
