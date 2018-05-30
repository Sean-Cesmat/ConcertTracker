import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Button, Alert, TextInput, Dimensions, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker'
import axios from 'axios'
import Navigation from './Navigation'
var fullWidth = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }

  }
  login() {
    axios.post('http://10.1.5.42:8081/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then( result => {
      console.log(result.data) // result is result from back end responding to post request and .data is where axios stores the returned data
      AsyncStorage.setItem('mernToken', result.data.token) // change 'mernToken' to your app name or something useful
      //this.props.liftToken(result.data)
    }).catch( err => console.log('err') )
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
              title="Login"
              onPress={() => {this.login()}}
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
