import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Dimensions } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';
var fullWidth = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };

  }


  render() {
    return (
      <View style={styles.navContainer}>
          <Button
            onPress={() => {
              this.props.navigation.navigate('Home')
            }}
            title="Artists"
            color="#fff"
            accessibilityLabel="Artists"
            style={styles.button} />
            <Button
              onPress={() => {
                this.props.navigation.navigate('SignUp')
              }}
              title="SignUp"
              color="#fff"
              accessibilityLabel="SignUp"
              style={styles.button} />
              <Button
                onPress={() => {
                  this.props.navigation.navigate('Login')
                }}
                title="Login"
                color="#fff"
                accessibilityLabel="Login"
                style={styles.button} />
          <View style={styles.buttonCont}>
            <Button
              onPress={() => {
                this.props.navigation.navigate('NewConcert')
              }}
              title="Add New"
              color="#fff"
              accessibilityLabel="Add New"
              style={styles.button} />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    backgroundColor: '#1ab0a2',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingTop: 0,
    height: 20,
  },
  buttonCont: {
    backgroundColor: '#9248e6',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0,
    marginTop: 20,

  },
  button: {
    borderRadius: 3,
  },
});
