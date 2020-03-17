import React, { Component } from 'react';
import {Text, View,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';


class Geolocation extends Component{
    constructor(props){
        super(props);
        this.state = {
        locationPermission : false,
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

  toNewsfeed =()=>{
    this.props.navigation.navigate('Newsfeed');
  }
 
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