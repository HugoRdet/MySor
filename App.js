import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View ,Linking,Pressable} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Get_Cal from './feed/get_Cal.js';
import Init_DB from './feed/init_DB.js'
import {  getData,storeData } from './feed/utilitaires';
import { stylesDM } from "./feed/stylesheets/StyleDM.js";
import { stylesLM } from "./feed/stylesheets/StyleLM.js";

const openURL = (url) => {
  Linking.openURL(url).catch((err) => console.error('An error occurred', err));
}

export default function App() {
  
  const [page_id, setpage_id] = useState("Home"); //0 calendrier //1 liens
  const [DarkMode, setDarkMode] = useState(true); //0 calendrier //1 liens
  const UsedStyle = useRef(DarkMode?stylesDM:stylesLM);
  
  Init_DB();

  const getMode=async  () => {
    getData("DarkMode").then((value) => {
      if (value == null) {
        storeData("DarkMode", "true");
        setDarkMode(true);
      } else {
        if (value == "true") {
          setDarkMode(true);
        }else{
          console.log("JE SUIS LA")
          UsedStyle.current=stylesLM;
          setDarkMode(false);
        }
      }
    });
  };
  
  useEffect(() => {
    getMode();
  }, []);
  
  useEffect(() => {
    console.log("DarkMode : "+DarkMode);
  }, [DarkMode]);
  
  return (
    <>
    
    
      
      {page_id==="Home"?
      <>
      <SafeAreaView style={UsedStyle.current.SafeAreaMode0} />
      <SafeAreaView style={UsedStyle.current.SafeAreaMode1} >
        {DarkMode?
        <StatusBar style="light" />:
        <StatusBar style="dark" />
        }
      
      <View style={UsedStyle.current.maincompHome}>
        <Text style={UsedStyle.current.Title}>
          Useful Links
        </Text>
        <View style={UsedStyle.current.ModeButton}>
          {DarkMode?
          <Icon.Button
          name='moon'
          size={30}
          color="white"
          backgroundColor="#181818"
          onPress={()=>{setDarkMode(!DarkMode);
            if(DarkMode){
              UsedStyle.current=stylesLM;
              storeData("DarkMode", "false");
            }
            else{
              UsedStyle.current=stylesDM;
              storeData("DarkMode", "true");
            }}}
          />
          
            :
            <Icon.Button
        name='moon'
        size={30}
        color="black"
        backgroundColor="#DCDCDC"
        onPress={()=>{setDarkMode(!DarkMode);
          if(DarkMode){
            UsedStyle.current=stylesLM;
            storeData("DarkMode", "false");
          }
          else{
            UsedStyle.current=stylesDM;
            storeData("DarkMode", "true");
          }}}
        />
          }
        
        </View>

        <View style={UsedStyle.current.maincompLinks}>
        <Pressable onPress={()=>{openURL("https://www-master.ufr-info-p6.jussieu.fr/2020/?page=mesNotes")}} style={UsedStyle.current.link} >
          <Text  style={UsedStyle.current.linktext}>
            Get your grades
          </Text>
          <Icon name="briefcase" size={25} color="#AAAAAA" style={{height:30,right:15}} />
        </Pressable>
        
        <Pressable onPress={()=>{openURL("https://buresa.sorbonne-universite.fr/ReservationSalles/Default.aspx")}} style={UsedStyle.current.link} >
          <Text style={UsedStyle.current.linktext}>
            Buresa
          </Text>
          <Icon name="book" size={25} color="#AAAAAA" style={{height:30,right:15}} />
        </Pressable>

        <Pressable onPress={()=>{openURL("https://discord.gg/7cvvBPj5t7")}} style={UsedStyle.current.link}> 
          <Text style={UsedStyle.current.linktext}>
            Join the Discord server
          </Text>
          <Icon name="hand" size={25} color="#AAAAAA" style={{height:30,right:15}} />
        </Pressable>

        <Pressable onPress={()=>{openURL("https://zcs.sorbonne-universite.fr")}} style={UsedStyle.current.link} >
          <Text style={UsedStyle.current.linktext}>
            Student Mail
          </Text>
          <Icon name="mail" size={25} color="#AAAAAA" style={{height:30,right:15}} />
        </Pressable>

        <Pressable onPress={()=>{openURL("https://github.com/HugoRdet/MySor")}} style={UsedStyle.current.link} >
          <Text style={UsedStyle.current.linktext}>
            Contribute on Git!
          </Text>
          <Icon name="github" size={25} color="#AAAAAA" style={{height:30,right:15}} />
        </Pressable>

        </View>
        
      </View>

      {DarkMode?
      <View style={UsedStyle.current.Row}>
      <View style={UsedStyle.current.RowIcon}>
      <Icon.Button
      name='globe'
      size={30}
      color="white"
      backgroundColor="#181818"
      onPress={()=>{setpage_id("Home")}}
      />
      </View>
      <View style={UsedStyle.current.RowIcon}>
      <Icon.Button
      name='calendar'
      size={30}
      color="#3D3D3D"
      backgroundColor="#181818"
      onPress={()=>{setpage_id("Calendar")}}
      />
      </View>
      
    </View>
      :
      <View style={UsedStyle.current.Row}>
        <View style={UsedStyle.current.RowIcon}>
        <Icon.Button
        name='globe'
        size={30}
        color="black"
        backgroundColor="#DCDCDC"
        onPress={()=>{setpage_id("Home")}}
        />
        </View>
        <View style={UsedStyle.current.RowIcon}>
        <Icon.Button
        name='calendar'
        size={30}
        color="#808080"
        backgroundColor="#DCDCDC"
        onPress={()=>{setpage_id("Calendar")}}
        />
        </View>
        
      </View>}

      
    
      
    
    
      </SafeAreaView>

      </>
      :
      <>
      {
        DarkMode?
        <>

      <SafeAreaView style={{ flex:0, backgroundColor: 'black' }} />
      <SafeAreaView style={{ flex:1, backgroundColor: 'black' }} >
      <StatusBar style="light" />
      <View style={UsedStyle.current.MainComponent}>
      <Get_Cal DarkMode={DarkMode}/>
      </View>

      <View style={UsedStyle.current.Row}>
        <View style={UsedStyle.current.RowIcon}>
        <Icon.Button
        name='globe'
        size={30}
        color="#3D3D3D"
        backgroundColor="#181818"
        onPress={()=>{setpage_id("Home")}}
        />
        </View>
        <View style={UsedStyle.current.RowIcon}>
        <Icon.Button
        name='calendar'
        size={30}
        color="white"
        backgroundColor="#181818"
        onPress={()=>{setpage_id("Calendar")}}
        />
        </View>
        
      </View>
    
    
      </SafeAreaView>
      </>
        :
        <>

        <SafeAreaView style={{ flex:0, backgroundColor: 'black' }} />
        <SafeAreaView style={{ flex:1, backgroundColor: 'black' }} >
        <StatusBar style="light" />
        <View style={UsedStyle.current.MainComponent}>
        <Get_Cal DarkMode={DarkMode}/>
        </View>
  
        <View style={UsedStyle.current.Row}>
          <View style={UsedStyle.current.RowIcon}>
          <Icon.Button
          name='globe'
          size={30}
          color="#808080"
          backgroundColor="#DCDCDC"
          onPress={()=>{setpage_id("Home")}}
          />
          </View>
          <View style={UsedStyle.current.RowIcon}>
          <Icon.Button
          name='calendar'
          size={30}
          color="black"
          backgroundColor="#DCDCDC"
          onPress={()=>{setpage_id("Calendar")}}
          />
          </View>
          
        </View>
      
      
        </SafeAreaView>
        </>

      }
      </>
      


      }
      

      
    
    </>
  );
}
  