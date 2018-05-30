import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Dimensions, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker'
import axios from 'axios'
import Navigation from './Navigation'
var fullWidth = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class ShowList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: false
    };
  }

  componentWillMount() {
    const artist = this.props.navigation.getParam('artist');
    axios.get('http://10.1.5.42:8081/concerts/' + artist).then( result => {
      // Alert.alert('result.data')
      console.log('hi ' + JSON.stringify(result.data))
      this.setState({
        list: JSON.stringify(result.data),
      })
    }).catch( err => console.log(err))
    // axios.get('http://192.168.0.11:8081/concerts').then( result => {
    //   // Alert.alert('result.data')
    //   this.setState({
    //     list: result.data,
    //   })
    // }).catch( err => console.log(err))
  }

  edit(id) {
    console.log(id)
    this.props.navigation.navigate('EditConcert', {concertId: id, list: this.state.list})
    // Alert.alert('edit concert: ' + id)
  };

  deleteShow(id) {
    console.log(id)
    Alert.alert(
      'Are you sure?',
      'This cannot be undone.',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Delete', onPress: () => {
          axios.delete('http://192.168.0.11:8081/concerts/show/' + id).then( result => {
            console.log(result)
          }).catch( err => console.log(err))
          this.props.navigation.navigate('Home');}
        },
      ],
      { cancelable: false }
    )
  }

  render() {
    let list
    if (this.state.list && this.state.list !== undefined) {
      const parsedList = JSON.parse(this.state.list)
      list = parsedList.map((item, i) => {
        return (
          <View key={i} style={styles.listItem}>
            <View style={{flex: 4}}>
              <Text style={{fontSize: 20}}>{item.location}</Text>
              <Text>{item.date}</Text>
            </View>
            <Button
              title="Edit"
              style={styles.editBtn}
              onPress={() => {this.edit(item._id)}} />
            <Button
              title="Delete"
              style={styles.deleteBtn}
              onPress={() => {this.deleteShow(item._id)}} />
          </View>
        )
      })

    }
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Navigation navigation={this.props.navigation} />
        </View>
        <View style={{flex: 11, paddingTop: 5,}}>
          <ScrollView>
            {list}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: fullWidth,
    height: height,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  listItem: {
    width: fullWidth - 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    margin: 5,
    marginTop: 2,
    marginBottom: 2,
    padding: 10,
    backgroundColor: '#dedede'
  },
  editBtn: {
    flex: 1
  },
  deleteBtn: {
    flex: 1
  }
});
