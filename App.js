import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker'
import axios from 'axios'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: 'Artist Name',
      location: 'Location',
      memories: 'Memories',
      date:"2018-01-01"
    };
  }

  addNewConcert() {
    axios.post('http://192.168.0.11:8081/concerts', {
      artist: this.state.artist,
      location: this.state.location,
      date: this.state.date,
      memories: this.state.memories
    }).then( result => {
      Alert.alert('result.data')
      this.setState({
        artist: 'Artist Name',
        location: 'Location',
        memories: 'Memories',
        date:"2018-01-01"
      })
    }).catch( err => console.log(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={(artist) => this.setState({artist})}
          value={this.state.artist}
          style={styles.textInput}
        />
        <TextInput
          onChangeText={(location) => this.setState({location})}
          value={this.state.location}
          style={styles.textInput}
        />
        <DatePicker
          style={{width: 200}}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
        <TextInput
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
            style={styles.button} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCont: {
    backgroundColor: '#08426a',
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
    borderColor: 'gray',
    borderWidth: 1,
    alignSelf: 'stretch',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 7,
    marginBottom: 7,
    padding: 5,
  }
});
