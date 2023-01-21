import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView, Text, View ,Linking,Pressable} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Get_Cal from './feed/get_Cal.js';
import Init_DB from './feed/init_DB.js'

import { styles } from "./Style";

const openURL = (url) => {
  Linking.openURL(url).catch((err) => console.error('An error occurred', err));
}

export default function App() {
  
  const [page_id, setpage_id] = useState("Home"); //0 calendrier //1 liens
  
  
  Init_DB();
  
  
  
  return (
    <>
    
    
      
      {page_id==="Home"?
      <>
      <SafeAreaView style={{ flex:0, backgroundColor: 'white' }} />
      <SafeAreaView style={{ flex:1, backgroundColor: 'white' }} >
      <StatusBar style="dark" />
      <View style={styles.maincompHome}>
        <Text style={styles.Title}>
          Useful Links
        </Text>

        <View style={styles.maincompLinks}>
        <Pressable onPress={()=>{openURL("https://www-master.ufr-info-p6.jussieu.fr/2020/?page=mesNotes")}} style={styles.link} >
          <Text  style={styles.linktext}>
            Get your grades
          </Text>
        </Pressable>
        
        <Pressable onPress={()=>{openURL("https://buresa.sorbonne-universite.fr/ReservationSalles/Default.aspx")}} style={styles.link} >
          <Text style={styles.linktext}>
            Buresa
          </Text>
        </Pressable>

        <Pressable onPress={()=>{openURL("https://discord.gg/7cvvBPj5t7")}} style={styles.link}> 
          <Text style={styles.linktext}>
            Join the Discord server
          </Text>
        </Pressable>

        <Pressable onPress={()=>{openURL("https://zcs.sorbonne-universite.fr")}} style={styles.link} >
          <Text style={styles.linktext}>
            Mail
          </Text>
        </Pressable>

        <Pressable onPress={()=>{openURL("https://github.com/HugoRdet/MySor")}} style={styles.link} >
          <Text style={styles.linktext}>
            Contribute on Git!
          </Text>
        </Pressable>

        </View>
        
      </View>

      

      <View style={styles.Row}>
        <View style={styles.RowIcon}>
        <Icon.Button
        name='globe'
        size={30}
        color="black"
        backgroundColor="white"
        onPress={()=>{setpage_id("Home")}}
        />
        </View>
        <View style={styles.RowIcon}>
        <Icon.Button
        name='calendar'
        size={30}
        color="black"
        backgroundColor="white"
        onPress={()=>{setpage_id("Calendar")}}
        />
        </View>
        
      </View>
    
    
      </SafeAreaView>

      </>
      :
      
      <>

      <SafeAreaView style={{ flex:0, backgroundColor: 'black' }} />
      <SafeAreaView style={{ flex:1, backgroundColor: 'white' }} >
      <StatusBar style="light" />
      <View style={styles.MainComponent}>
      <Get_Cal/>
      </View>

      <View style={styles.Row}>
        <View style={styles.RowIcon}>
        <Icon.Button
        name='globe'
        size={30}
        color="black"
        backgroundColor="white"
        onPress={()=>{setpage_id("Home")}}
        />
        </View>
        <View style={styles.RowIcon}>
        <Icon.Button
        name='calendar'
        size={30}
        color="black"
        backgroundColor="white"
        onPress={()=>{setpage_id("Calendar")}}
        />
        </View>
        
      </View>
    
    
      </SafeAreaView>
      </>


      }
      

      
    
    </>
  );
}
  