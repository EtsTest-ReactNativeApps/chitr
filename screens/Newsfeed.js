import React,{ Component} from 'react';
import {Button,StyleSheet, Text, View,TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Homescreen from './Homescreen'
import MyPhoto from './MyPhoto'
import MyProfile from './MyProfile'

class NewsFeed extends Component{

    static navigationOptions = {
        drawerLabel: 'NewsFeed',
        header : null,
      };
    constructor(props){
        super(props);
        this.state = {
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


    handleSearch = (text) => {
        this.setState({ given_name: text })
    }
    handleChits = (text) => {
        this.setState({ chit_content: text })
    }
    search(){
        return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q='+this.state.given_name)
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

    postChit(){
        return fetch("http://10.0.2.2:3333/api/v0.0.5/chits",
        {
        method: 'POST',
        body: JSON.stringify({
        chit: this.state.chit_content,
        longitude: this.state.longitude,
        latitude: this.state.latitude
        })
        })
        .then((response) => {
        Alert.alert("Item Added!");
        })
        .catch((error) => {
        console.error(error);
        });
        }
    
 render(){
 return(
<View style = {{ flex : 1, alignItems :'stretch'}}> 
    <TextInput style = {styles.input} placeholder="Search for users" onChangeText={this.handleSearch} value={this.state.given_name}/>
    <Button style = {styles.input} title="Search" 
    onPress={() => this.search()}/>
    <View style = {{ flex : 1, justifyContent : 'flex-start', alignItems:'baseline'}}> 
    <Text style = {styles.post}> what's on your mind</Text>
    <TextInput style = {styles.input} placeholder="Type a chit" onChangeText={this.handleChits} value={this.state.chit_content}/>
    <Button style = {styles.input} title="Post" 
    onPress={() => this.postChit()}/>    
    </View>

</View>
 );
 }
}

const MyDrawerNavigator = createDrawerNavigator({
    Newsfeed: {
      screen: NewsFeed,
    },
    MyProfile: {
        screen: MyProfile,
    },
    MyPhoto: {
        screen: MyPhoto,
    },
    Logout: {
        screen: Homescreen,
    },
  });

const MyApp = createAppContainer(MyDrawerNavigator);
export default MyApp;

const styles = StyleSheet.create({
    title: {
    color: 'green',
    fontSize: 50,
    fontWeight: 'bold'
    },
    chits: {
    color: 'black',
    fontSize: 19,
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
      post: {
        margin: 2,
        height: 25,
        fontSize : 20,
        borderBottomColor: 'gray',
      },
});