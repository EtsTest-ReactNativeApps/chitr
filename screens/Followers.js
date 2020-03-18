import React, { Component } from 'react';
import { Image,TouchableOpacity,Text, View,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import Card from './Cards';
import { Card, Paragraph } from 'react-native-paper';

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
      this.props.navigation.replace('UserInfo');
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
      <View>
        <TouchableOpacity onPress={() =>this.storeUserId(item.user_id)} >
          <Card style = {styles.card}>
            <Image
              style = {styles.container}
              source = {require('../photo/profile.png')}
            />
              <Card.Content>
                <Text style= {styles.chits}>{item.given_name + ' '+ item.family_name}</Text>
                <Paragraph style = {styles.chits}>{item.email}</Paragraph>  
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
    height : 70,
    position : 'absolute',
    left : 20
    },
    card: {
    margin : 5
    },
});