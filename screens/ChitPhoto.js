import * as React from 'react';
import {Image,FlatList,TouchableOpacity,StyleSheet, ActivityIndicator,StatusBar,Text, View,Button,TextInput,Alert,KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {createSwitchNavigator, ThemeColors } from 'react-navigation';
import Newsfeed from './Newsfeed'

export default class ChitPhoto extends React.Component {


    constructor(props){
        super(props);
        this.state = {
        refreshing: false,
        setRefreshing : false,
        src : 'No Photo',
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
         
        
      getData = async () => {
        try {
          const value = await AsyncStorage.getItem('userid')
          console.log("value "+value)
          if(value !== null) {
            this.setState({
                user_id: value,
                src : `http://10.0.2.2:3333/api/v0.0.5/chits/${value}/photo`
              });
          }
          console.log("user id " + this.state.user_id)
          console.log("source " + this.state.src)

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
<Text style = {styles.textStyle} >User Chits' Photo</Text>

<Image 

  style={{width: '100%', height: '100%'}}        
  source={{uri : this.state.src}}

  />
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

