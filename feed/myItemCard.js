import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState , componentDidUpdate } from 'react';


export default function MyItemCard({style, item, dayIndex, daysTotal}) {
    
    return (
        <View style={{
            ...style,
            backgroundColor: '#33658A',
            borderRadius: 10,
            elevation: 5,
            paddingLeft: 10,
            paddingTop:3
        }}>
            
            <Text style={{color:"white"}} >{item.SUMMARY}</Text>
        {  (item.LOCATION.length>0)?
            
            
            <View style={{backgroundColor: '#86BBD8',
                borderRadius: 10,
                paddingRight: 10,
                elevation: 5,
                borderColor:'#eee',
                borderWidth:2,
                margin: 10,
                marginTop:10,
                maxWidth:150,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 2,}}>
            <Text >{item.LOCATION}</Text>
            
            </View>
            
            :
            <>
            </>
        }
            
        </View>
    );
}
    
