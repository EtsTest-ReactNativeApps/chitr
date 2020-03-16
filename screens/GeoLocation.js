import React, { Component } from 'react';
import { PermissionsAndroid,Alert,Text, View,Button,TextInput,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyAZx7S0ngRA5ncVGocFOY1ndc57tG_Fvt8'); // use a valid API key
Geocoder.init('AIzaSyAZx7S0ngRA5ncVGocFOY1ndc57tG_Fvt8', {language : "en"}); // set the language , {language : “en”}); // set the language

class Geolocation extends Component{
    constructor(props){
        super(props);
        this.state = {
        token : '',
        locationPermission : false,
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
    
    handlePost = (text) => {
        this.setState({ chit_content: text})
       }

    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('token')
          console.log("getdata"+value)
          if(value !== null) {
            this.setState({
                token: value
              });
          }
        } catch(e) {
          // error reading value
        }
    }

  toNewsfeed =()=>{
    this.props.navigation.navigate('Newsfeed');
  }
 
      componentDidMount(){
          this.getData();
       } 
          
 render(){
return(
 <View> 
   <MapView
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
 </View>
 );
 }
}

   export default Geolocation;

const styles = StyleSheet.create({
    title: {
    color: 'green',
    fontSize: 50,
    fontWeight: 'bold'
    },
    chits: {
    color: 'black',
    fontSize: 20,
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

      textInput: {
        borderRadius : 25,
        borderWidth: 2,
        borderColor: '#007aff',
        marginLeft : 20,
        marginRight : 20,
        padding : 30,
        marginTop : 20,
        fontSize : 20
        },

        textStyle: {
            fontSize : 30,
            alignSelf:'center',
            color : '#007aff',
            fontWeight : '600',
            paddingTop : 10,
            paddingBottom : 10,
            marginTop : 30,
          },
});

// style={{flexDirection: 'row',flex:1,justifyContent:'space-evenly', alignItems : 'center' }}