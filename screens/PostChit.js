import React, { Component } from 'react';
import { PermissionsAndroid,Alert,Text, View,TextInput,StyleSheet,ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';

class PostChit extends Component{
      //This constructor is used to create and initialise the objects below     
    constructor(props){
        //super() is used to call the parent constructor, here the props is passed to the parent constructor to call React 
        super(props);
        //This state defines the data type of the objects below
        this.state = {
        token : '',
        locationPermission : false,
        given_name: '',
        family_name: '',
        text : '',
        email: '',
        password: '',
        chit_content:'',
        timestamp: '',
        longitude: '',
        latitude: ''
        };  
    }

    //This function handles the post textnput and is called everytime the post is changed
    handlePost = (text) => {
      this.setState({ chit_content: text})
    }

    //This async function is used to store the fetched token in a local storage in order to attach in the API request's headers
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
        }
    }

    
   
    
    //gets the coordinates of the current lcoation such as longitude and altitude
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

  //This function navigates the user to the Newsfeed page
  toNewsfeed =()=>{
    this.props.navigation.navigate('Newsfeed');
  }
    //This function sends an API request to the server in order to post a chit   
    postChit(){
      //create an object and include the relevant data to be posted, this object is placed in the body of request
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
        'X-Authorization':this.state.token , // attach the logged user's token into the header for this request to be valid
      },
    body: result
})
    .then((response) => {
    console.log("response"+response)

    if(response.status === 201){ // pop up confirmation message when a user is added
    Alert.alert("Post added !!!!");
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

      //This method is called after all the elements of the page are rendered, which renders the function getData() to get the user id
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

//gets the permissions of requesting the current location
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
   export default PostChit;

const styles = StyleSheet.create({
  title: {
  color: 'green',
  fontSize: 50,
  fontWeight: 'bold'
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
