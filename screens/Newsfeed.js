import React,{ Component} from 'react';
import {Alert,Button,StyleSheet, Text, View,TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';
import Homescreen from './Homescreen'
import MyPhoto from './TakePhoto'
import MyProfile from './MyProfile'

class NewsFeed extends Component{

    static navigationOptions = {
        drawerLabel: 'NewsFeed',
        header : null,
      };
    constructor(props){
        super(props);
        this.state = {
        token :'',
        given_name: '',
        family_name: '',
        text : '',
        email: '',
        password: '',
        loginEmail:'',
        loginPass:'',
        chit_id: '',
        chit_content:'Hi there',
        timestamp: '13',
        location : {
        longitude: '123',
        latitude: '123'
        }
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

    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('token')
          if(value !== null) {
            this.setState({
                token: value
              });
          }
        } catch(e) {
          // error reading value
        }
      }

    postChit(){
        return fetch("http://10.0.2.2:3333/api/v0.0.5/chits",
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization':this.state.token ,
          }, 
        body: JSON.stringify({
        // chit_content: 'Whats popping',
        // longitude: '123',
        // latitude: '12341',
        // timestamp : '214',
        chit_content: this.state.chit_content,
        longitude: this.state.longitude,
        latitude: this.state.location.latitude,
        timestamp : this.state.timestamp,
        })
        })
        .then((response) => {
        console.log("response"+response)

        if(response.status === 200){
        Alert.alert("Item Added!");
        }
        else{

        console.log('no posts have been added') 
        Alert.alert("This chit is not added");
        }
        })
        
        .catch((error) => {
        console.error(error);
        });
        }

        componentDidMount(){
            this.getData();
           }
        logout = async  () => {
             await AsyncStorage.clear();
            this.props.navigation.navigate('StartPage');
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
     
    <Button style = {styles.input} title="Logout" 
    onPress={this.logout}/> 
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
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
      },
      post: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
      },
});