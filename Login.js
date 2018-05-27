import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Button, Alert, TextInput, Dimensions, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker'
import axios from 'axios'
import Navigation from './Navigation'
var fullWidth = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }

  }


  signUp() {
    axios.post('http://192.168.0.11:8081/auth/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }).then( result => {
      console.log(result.data) // result is result from back end responding to post request and .data is where axios stores the returned data
      AsyncStorage.setItem('mernToken', result.data.token) // change 'mernToken' to your app name or something useful
      //this.props.liftToken(result.data)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Navigation navigation={this.props.navigation} />
        </View>
        <View style={{flex: 11, paddingTop: 5,}}>
          <View>
            <TextInput
              placeholder="Name"
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Email"
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Password"
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              style={styles.textInput}
            />
            <Button
              title="SignUp"
              onPress={() => {this.signUp()}}
            />
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width: fullWidth,
    height: height,
  },
  textInput: {
    height: 40,
    borderColor: '#ededed',
    borderWidth: 1,
    borderRadius: 4,
    alignSelf: 'stretch',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 7,
    marginBottom: 7,
    padding: 5,
    backgroundColor: '#fff'
  }
});
