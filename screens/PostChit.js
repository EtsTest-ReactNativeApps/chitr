import React, { Component } from 'react';
import { PermissionsAndroid,Alert,Text, View,Button,TextInput,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

class HomeScreen extends Component{
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

    
   
    
   findCoordinates = () => {
    if(!this.state.locationPermission){
       this.state.locationPermission = requestLocationPermission();
      } 
    Geolocation.getCurrentPosition(
    (position) => {
    const location = JSON.stringify(position);
  
    this.setState({location},() =>{
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    const timestamp = position.timestamp;

    this.setState({longitude :longitude });
    this.setState({latitude :latitude });
    this.setState({timestamp :timestamp });

    console.log((position.coords.latitude));
    console.log((position.coords.longitude));
    console.log((position.timestamp));

  }
  );
     },
     (error) => {
     Alert.alert(error.message)
     },
     {
     enableHighAccuracy: true,
     timeout: 20000,
     maximumAge: 1000
     }
     );
}

  toNewsfeed =()=>{
    this.props.navigation.navigate('Newsfeed');
  }
   postChit(){
    let result = JSON.stringify({
        chit_content: this.state.chit_content,
        location: {
            longitude: this.state.longitude,
            latitude: this.state.latitude
        },
        timestamp : this.state.timestamp,
    })

    console.log(result)

    console.log("post" +this.state.token)
    return fetch("http://10.0.2.2:3333/api/v0.0.5/chits",
    {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Authorization':this.state.token ,
      },
    body: result
})
    .then((response) => {
    console.log("response"+response)

    if(response.status === 201){
    Alert.alert("Post added!");
    this.toNewsfeed();
    }
    else if (response.status === 401){
    console.log('Aunuhtorised ! no posts have been added') 
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
    <Text style = {styles.textStyle} >What's on your mind </Text>
    <TextInput style = {styles.textInput} placeholder="Type chit .." onChangeText={this.handlePost} value={this.state.chit_content} maxLength={141}/>
    <TouchableOpacity title="Post" style = {styles.buttonStyle}
    onPress={() => this.postChit()}>
    <Text style={styles.textStyle}>
    POST
    </Text>
    </TouchableOpacity>

    <TouchableOpacity style = {styles.buttonStyle}
    onPress={() => this.findCoordinates()}>
    <Text style={styles.textStyle}>
    Tag location
    </Text>
    </TouchableOpacity>
 </View>
 );
 }
}

async function requestLocationPermission(){
    try {
    const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
    title: 'Lab04 Location Permission',
    message:
    'This app requires access to your location.',
    buttonNeutral: 'Ask Me Later',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
    },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('You can access location');
    return true;
    } else {
    console.log('Location permission denied');
    return false;
    }
    } catch (err) {
    console.warn(err);
    }
   }
   export default HomeScreen;

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