import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import Get_Cal from './feed/get_Cal.js';
import Init_DB from './feed/init_DB.js'

import { styles } from "./Style";


export default function App() {
  
  const [page_id, setpage_id] = useState(0); //0 calendrier //1 liens
  
  
  Init_DB();
  
  
  
  return (
    <>
    <SafeAreaView style={{ flex:0, backgroundColor: 'black' }} />
    <SafeAreaView style={{ flex:1, backgroundColor: 'white' }} >
      <StatusBar style="light" />
      <View style={styles.MainComponent}>
      <Get_Cal/>
      </View>
    
    
    </SafeAreaView>
    </>
  );
}
  