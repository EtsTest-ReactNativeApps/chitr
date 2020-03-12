import React, { Component } from 'react';
import { TouchableOpacity,Text, View,Button,TextInput,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Card from './Cards';

class Followers extends Component{
    constructor(props){
        super(props);
        this.state = {
        user_id: '',
        given_name: '',
        family_name: '',
        text : '',
        email: '',
        chit_id: '',
        chit_content:'',
        timestamp: '',
        longitude: '',
        latitude: ''
        };  
    }
    
    handleGivenName = (text) => {
        this.setState({ given_name: text })
    }

    handleSearch = (text) => {
        this.setState({ given_name: text })
    }
    

    getData = async () => {
      try {
        const value = await AsyncStorage.getItem('UserID')
        console.log("value "+value)
        if(value !== null) {
          this.setState({
              user_id: value
            });
        }
        this.followers(this.state.user_id);
      } catch(e) {
        // error reading value
      }
  }

  storeUserId= async (user_id) => {
    try {
      console.log('hey')
      await AsyncStorage.setItem('userid', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      this.props.navigation.navigate('UserInfo');
    } catch (e) {
    }
  }

  
      followers(user_id){
        console.log( `http://10.0.2.2:3333/api/v0.0.5/user/${JSON.parse(user_id)}/followers`)
        return fetch(`http://10.0.2.2:3333/api/v0.0.5/user/${JSON.parse(user_id)}/followers`)
        .then((response) => response.json())
        .then((responseJson) => {
        this.setState({
        isLoading: false,
        userInfo: responseJson,
        });
        })
        .catch((error) =>{
        console.log(error);
        });
      }

      componentDidMount(){
        this.getData();
       } 
          
 render(){
    if(this.state.isLoading){
        return(
        <View>
        <ActivityIndicator/>
        </View>
        )
    }
return(   
<View style = {{ flex : 1}}> 
    <Text style= {styles.textStyle}>Followers users</Text>
<FlatList
    data={this.state.userInfo}
    renderItem={({item})=>
  <View style={{flexDirection: 'row',flex:1,justifyContent:'space-evenly', alignItems : 'center' }}>
  <TouchableOpacity onPress={() =>this.storeUserId(item.user_id)} >
  <Card>
  <Text style = {styles.chits}>{item.given_name + ' '+ item.family_name + '- ' + item.email}</Text>
  </Card>
  </TouchableOpacity>
  </View>
  }
  keyExtractor={({id}, index) => id}
 />
 </View>
 );
 }
}
export default Followers;

const styles = StyleSheet.create({
  textStyle: {
    fontSize : 30,
    alignSelf:'center',
    color : '#007aff',
    fontWeight : '600',
    paddingTop : 10,
    paddingBottom : 10 
  },
    title: {
    color: 'green',
    fontSize: 50,
    fontWeight: 'bold'
    },
    chits: {
    color: 'black',
    fontSize: 16,
    textShadowColor: 'gray',
    fontFamily: 'sans-serif',
    textShadowRadius: 19,
    },
    input: {
        margin: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
      },
      button: {
        backgroundColor: '#DDDDDD',
        padding: 5,
        margin : 10,
      }
});