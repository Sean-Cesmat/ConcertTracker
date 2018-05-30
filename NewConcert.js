import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Dimensions } from 'react-native';
import DatePicker from 'react-native-datepicker'
import axios from 'axios'
import Navigation from './Navigation'
var fullWidth = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class NewConcert extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      location: '',
      memories: '',
      date:""
    };

  }

  addNewConcert() {
    const fullList = this.props.navigation.getParam('list')
    axios.post('http://10.1.5.42:8081/concerts', {
      artist: this.state.artist,
      location: this.state.location,
      date: this.state.date,
      memories: this.state.memories
    }).then( result => {
      this.props.navigation.navigate('Home')
      // this.setState({
      //   artist: '',
      //   location: '',
      //   memories: '',
      //   date:""
      // })
    }).catch( err => console.log(err))
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Navigation navigation={this.props.navigation} />
        </View>
        <View style={{flex: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: '#dedede'}}>
          <TextInput
            placeholder="Artist Name"
            onChangeText={(artist) => this.setState({artist})}
            value={this.state.artist}
            style={styles.textInput}
          />
          <DatePicker
            style={{
              width: fullWidth - 36,
              marginTop: 7,
              marginBottom: 7}
            }
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 45,
                backgroundColor: '#fff',
                borderRadius: 4,


              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />
          <TextInput
            placeholder="Location"
            onChangeText={(location) => this.setState({location})}
            value={this.state.location}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Memories"
            onChangeText={(memories) => this.setState({memories})}
            value={this.state.memories}
            style={styles.textInput}
          />
          <Text>Having trouble? Click here for help.</Text>
          <View style={styles.buttonCont}>
            <Button
              onPress={() => {
                this.addNewConcert();
              }}
              title="Add New Concert"
              color="#fff"
              accessibilityLabel="Add New Concert"
              style={styles.button}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1ab0a2',
    height: height,
  },
  buttonCont: {
    backgroundColor: '#9248e6',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0,
    marginTop: 15,
  },
  button: {
    borderRadius: 3,
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
