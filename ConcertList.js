import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Dimensions, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker'
import axios from 'axios'
import Navigation from './Navigation'
var fullWidth = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class ConcertList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: false
    };
  }

  componentDidMount() {
    axios.get('http://10.1.5.42:8081/concerts/by-artist').then( result => {
      // Alert.alert('result.data')
      this.setState({
        list: Object.entries(result.data.concerts),
      })
    }).catch( err => console.log(err))
    // axios.get('http://192.168.0.11:8081/concerts').then( result => {
    //   // Alert.alert('result.data')
    //   this.setState({
    //     list: result.data,
    //   })
    // }).catch( err => console.log(err))
  }

  update() {
    axios.get('http://10.1.5.42:8081/concerts').then( result => {
      // Alert.alert('result.data')
      this.setState({
        list: result.data,
      })

    }).catch( err => console.log(err))
  }

  edit(id) {
    console.log(id)
    this.props.navigation.navigate('EditConcert', {concertId: id, list: this.state.list})
    // Alert.alert('edit concert: ' + id)
  };

  render() {
    let totals
    if (this.state.list) {
      totals = this.state.list.map((item, i) => {
        console.log(item[0]);
        return (
          <View key={i} style={styles.listItem}>
            <Text style={{fontSize: 20, flex:4}}>{item[0]}</Text>
            <Text style={{flex: 1}}>{item[1]}</Text>
            <Button
              title="View Shows"
              onPress={() => this.props.navigation.navigate('ShowList', {artist: item[0]})}
              style={{flex: 2}}
            />
            <Text>{JSON.stringify(this.props.navigation.user)}</Text>
          </View>
        )
      });


      //console.log(timeSeen)
      // artist = this.state.list.concerts[0].artist

    }
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Navigation navigation={this.props.navigation} />
        </View>
        <View style={{flex: 11, paddingTop: 5,}}>
          <ScrollView>
            {totals}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: fullWidth,
    height: height,
  },
  listItem: {
    width: fullWidth - 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5,
    marginTop: 2,
    marginBottom: 2,
    padding: 10,
    backgroundColor: '#dedede'
  },
  editBtn: {
    right: 0,
    top: 0,
  }
});
