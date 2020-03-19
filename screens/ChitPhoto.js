import * as React from 'react';
import {Image,FlatList,StyleSheet,Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Card } from 'react-native-paper';

export default class ChitPhoto extends React.Component {


    constructor(props){
        super(props);
        this.state = {
        refreshing: false,
        setRefreshing : false,
        src : 'No Photo',
        user_id:''  
        };  
    }

    // getChits(value){
    //     return fetch(`http://10.0.2.2:3333/api/v0.0.5/chits/${JSON.parse(value)}/photo`)
    //     .then((response) => {
    //      console.log("response" + response.status)
    //     })
    //     .catch((error) =>{
    //     console.log(error);
    //     });
    // }

      getData = async () => {
        try {
          const value = await AsyncStorage.getItem('UserID')
          console.log("value "+value)
          if(value !== null) {
            this.setState({
                user_id: value,
                src : `http://10.0.2.2:3333/api/v0.0.5/chits/${JSON.parse(value)}/photo`
              });
          }
        //   this.getChits(value);
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
        source={{uri: this.state.src + '?' + new Date()}}
    />     
</View>
  );
 }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize : 22,
    alignSelf:'center',
    color : '#007aff',
    fontWeight : '600',
    paddingTop : 10,
    paddingBottom : 10 
  },

})

