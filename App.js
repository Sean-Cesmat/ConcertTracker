import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Button, Alert, TextInput, Dimensions } from 'react-native';
import { createSwitchNavigator, createStackNavigator, NavigationActions } from 'react-navigation';
import axios from 'axios'
import ConcertList from './ConcertList'
import NewConcert from './NewConcert'
import EditConcert from './EditConcert'
import ShowList from './ShowList'
import SignUp from './SignUp'

const RootStack = createSwitchNavigator({
  Home: { screen: ConcertList },
  NewConcert: { screen: NewConcert },
  EditConcert: { screen: EditConcert },
  ShowList: { screen: ShowList },
  SignUp: { screen: SignUp },
},
{
  initialRouteName: 'Home',
});

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: null,
      user: null,
    }
  }

  componentDidMount() {
    var token = AsyncStorage.getItem('mernToken')
    if (token === 'undefined' || token === 'null' || token === '' || token === undefined) {
      AsyncStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: {}
      })
    } else {
      axios.post('http://192.168.0.11:8081/auth/me/from/token', {
        token // same as token: token
      }).then( result => {
        AsyncStorage.setItem('mernToken', result.data.token)
        this.setState({
          token: result.data.token,
          user: result.data.user
        })
      }).catch( err => console.log(err))
    }
  }

  render() {
    return (
        <RootStack user={this.state.user} />
    )
  }
}
