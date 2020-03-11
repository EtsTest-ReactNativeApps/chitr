import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Card (props){

    return(
        <View style = {styles.card}>
        <View style = {styles.cardContent}>
            {props.children}
        </View>

        </View>
    )
}

const styles = StyleSheet.create({
    card : {

        borderRadius : 6,
        elevation : 1,
        backgroundColor : '#fff',
        shadowOffset : {width : 1, height : 2},
        shadowColor : '#333',
        shadowOpacity : 1,
        shadowRadius : 9,
        marginHorizontal : 9,
        marginVertical : 9
    },

    cardContent:{
        marginHorizontal : 150,
        marginVertical :19,
    }

});