import React, { Component } from 'react';
import {Text, View,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';


class Geolocation extends Component{
    //This constructor is used to create and initialise the objects below 
    constructor(props){
        //super() is used to call the parent constructor, here the props is passed to the parent constructor to call React 
        super(props);
        //This state defines the data type of the objects below
        this.state = {
        locationPermission : false,
        timestamp: '',
        longitude: '',
        latitude: ''
        };  
    }
    
    //This async function returns a promise which is the location that is stored in a local storage, it needs to be retrieved to get the selected user id using the keyword await, which makes JavaScript wait until it gets the location
    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('location')
          console.log("location"+value)
          if(value !== null) {
            this.setState({
              timestamp: value
              });
          }
          console.log("timestamp"+this.state.timestamp)

        } catch(e) {
          // error reading value
        }
    }

      //This method is called after all the elements of the page are rendered, which renders the function getData() to get the selected user id instantly
      componentDidMount(){
          this.getData();
       } 
          
 render(){
return(
  <View style = {{flex : 1}}>
  <Text style= {styles.headerText}>Post's location </Text>
 <View style = {styles.container}> 
   <MapView
   provider = {PROVIDER_GOOGLE}
   style = {styles.map}

   region={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
   }}
   >
  </MapView>
 </View>
       </View>

 );
 }
}

   export default Geolocation;

   const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      top: 50,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      
    },
    headerText: {
      fontSize : 27,
      alignSelf:'center',
      color : '#007aff',
      fontWeight : '600',
    },
  });

// style={{flexDirection: 'row',flex:1,justifyContent:'space-evenly', alignItems : 'center' }}