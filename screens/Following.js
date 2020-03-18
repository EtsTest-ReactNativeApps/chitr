import React, { Component } from 'react';
import { Image,TouchableOpacity,Text, View,Button,TextInput,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import Card from './Cards';
import { Card, Title, Paragraph } from 'react-native-paper';

class Following extends Component{
    constructor(props){
        super(props);
        this.state = {
        user_id: '',
        given_name: '',
        family_name: '',
        text : '',
        email: '',
        password: '',
        loginEmail:'',
        loginPass:'',
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
        this.following(this.state.user_id);
      } catch(e) {
        // error reading value
      }
  }

  storeUserId= async (user_id) => {
    try {
      console.log('hey')
      await AsyncStorage.setItem('userid', JSON.stringify(user_id))
      console.log("user id => " + user_id);
      this.props.navigation.replace('UserInfo'); // when clicking on any following user, the next page woud be the current user becasue the page wasn't closed . Applied replace to close it making sure to load up the new opened page without caching it 
    } catch (e) {
    }
  }

  
      following(user_id){
        return fetch(`http://10.0.2.2:3333/api/v0.0.5/user/${JSON.parse(user_id)}/following`)
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
    <Text style= {styles.textStyle}>Following users</Text>
<FlatList
    data={this.state.userInfo}
    renderItem={({item})=>
  <View >

  <TouchableOpacity onPress={() =>this.storeUserId(item.user_id)} >
  <Card style = {styles.card}>
  <Image
   style = {styles.container}
     source = {require('../photo/profile.png')}
   />
<Card.Content>
<Text style = {styles.chits}>{item.given_name + ' '+ item.family_name}</Text>
<Paragraph style= {styles.chits} >{item.email}</Paragraph>
    </Card.Content>

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
export default Following;

const styles = StyleSheet.create({

  textStyle: {
    fontSize : 30,
    alignSelf:'center',
    color : '#007aff',
    fontWeight : '600',
    paddingTop : 10,
    paddingBottom : 10 
  },
    chits: {
    textAlign : 'center',
    color: 'black',
    textShadowColor: 'gray',
    fontFamily: 'sans-serif',
    textShadowRadius: 19,
    fontSize : 20,
    }, 
    title: {
    color: 'green',
    fontSize: 50,
    fontWeight: 'bold'
    },
    container: {
    flex : 1,
    justifyContent : 'flex-start',
    width : 60,
    height : 62,
    position : 'absolute',
    left : 20
    },
    card: {
     margin : 5
    },
});