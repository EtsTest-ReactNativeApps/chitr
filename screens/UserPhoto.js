import * as React from 'react';
import {Image,FlatList,TouchableOpacity,StyleSheet, ActivityIndicator,StatusBar,Text, View,Button,TextInput,Alert,KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {createSwitchNavigator } from 'react-navigation';
import Newsfeed from './Newsfeed'

export default class UserPhoto extends React.Component {


    constructor(props){
        super(props);
        this.state = {
        pic: '',
        token : '',
        given_name: '',
        family_name: '',
        email: '',
        password: '',
        UserInfo : '',  
        user_id:''  
        };  
    }
      getPhoto(user_id){
        console.log(`http://10.0.2.2:3333/api/v0.0.5/user/user/${JSON.parse(user_id)}/photo`)
        return fetch(`http://10.0.2.2:3333/api/v0.0.5/user/user/${JSON.parse(user_id)}/photo`)
        .then((response) => response.json())
        .then((responseJson) => {
        this.setState({
        isLoading: false,
        userInfo: responseJson,
        
        });
        console.log(responseJson)
        })
        .catch((error) =>{
        console.log(error);
        });
      }

      photo (user_id){
          var outside
        console.log(`http://10.0.2.2:3333/api/v0.0.5/user/${JSON.parse(user_id)}/photo`)
        fetch(`http://10.0.2.2:3333/api/v0.0.5/user/${JSON.parse(user_id)}/photo`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((response) => response.blob())           
          .then((responseData) => {
            this.setState({
            pic: JSON.parse(responseData)                
            })
            outside = URL.createObjectURL(pic)
            console.log("status "+outside)

            console.log("status "+response.status)
            console.log(data)
            console.log(JSON.parse(responseData) )
        });
        }
    
      
 
      getData = async () => {
        try {
          const value = await AsyncStorage.getItem('userid')
          console.log("value "+value)
          if(value !== null) {
            this.setState({
                user_id: value
              });
              this.photo(value);
          }
        } catch(e) {
          // error reading value
        }
    }

    componentDidMount(){
        this.getData();
        
       } 
      
 render(){
 return (
     
<View style = {{ flex : 1,justifyContent:'flex-start'}}>   
<Text style = {styles.textStyle} >User profile picture</Text>

<Image
          style={{width: 50, height: 50}}
          src={ this.state.pic}
        />

  {/* <TouchableOpacity  style = {styles.buttonStyle}
    onPress={() =>this.props.navigation.navigate('UserInfo')}>
    <Text style={styles.textStyle}>
    Cancel
    </Text>
  </TouchableOpacity> */}
  

</View>
  );
 }
}

const styles = StyleSheet.create({

  fields: {
    margin: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical : 15,
    fontSize : 20,

  },
  textStyle: {
    fontSize : 22,
    alignSelf:'center',
    color : '#007aff',
    fontWeight : '600',
    paddingTop : 10,
    paddingBottom : 10 
  },

  buttonStyle: {
    alignItems : 'baseline',
    borderRadius : 25,
    borderWidth: 2,
    borderColor: '#007aff',
    marginLeft : 20,
    marginRight : 20,
    padding :9,
    marginBottom : 15,
  },
  
})

