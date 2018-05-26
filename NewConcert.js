import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Input } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button onPress={() => {
            Alert.alert('You tapped the button!');
          }} title="Add New Show" color="#e35252" style="styles.button" />
        </View>
        <Input type="text" />
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.This is dope!</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#08426a',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0,
    margin: 0,
    borderRadius: 3,
  },
});
