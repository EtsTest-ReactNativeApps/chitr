import * as React from 'react';
import {Image,StyleSheet,Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default class ChitPhoto extends React.Component {

    //This constructor is used to create and initialise the objects below 
    constructor(props){
        //super() is used to call the parent constructor, here the props is passed to the parent constructor to call React
        super(props);
        //This state defines the data type of the objects below
        this.state = {
        refreshing: false,
        setRefreshing : false,
        src : 'No Photo',
        user_id:''  
        };  
    }

    //This async function returns a promise which is the user id that is stored in a local storage, it needs to be retrieved to get the selected user id using the keyword await, which makes JavaScript wait until it gets the user id
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
        } catch(e) {
          // error reading value
        }
    }

    //This method is called after all the elements of the page are rendered, which renders the function getData() to get the selected user id instantly
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

