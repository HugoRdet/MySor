import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView,ScrollView , Button} from 'react-native';
import React, { useEffect, useState , useRef} from 'react';
import * as SQLite from 'expo-sqlite';
import { CalendarMainCompStyle } from "./stylesheets/CalendarMainCompStyle";
import Icon from 'react-native-vector-icons/Entypo';

//import moment from "moment";
import Update_DB from './update_DB.js'

function GetTheDate(days){
  var res = new Date(Date.now());
  res.setDate(res.getDate() + days);
  return res;
}

function convert_date(dateStr) {
  var a=dateStr.split(" ");
  var d=a[0].split("-");
  var t=a[1].split(":");
  var formatedDate = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);
  return formatedDate
}



export default function Get_Cal() {
  const [master_id, setmaster_id] = useState("ANDROIDE");     //master choisi
  const [master_lvl, setmaster_lvl] = useState("M1");         //niveau M1 / M2
  const [date_v, setdate_v] = useState(0);                    //date affichee a l'ecran

  const [items_today, setitems_today] = useState([]);         // evenements a la date date_v
  const [items_tmrw, setitems_tmrw] = useState([]);           // evenements a la date date_v+1
  const [items_ystrd, setitems_ystrd] = useState([]);         // evenements a la date date_v-1
  
  const req_events=((master,lvl,mode)=>{
    
    let date_prec=new Date();
    let date_post=new Date();
    date_prec.setDate(date_prec.getDate()+mode)
    date_post.setDate(date_post.getDate()+mode)
    date_prec.setHours(0)
    date_post.setHours(23)
    date_prec=date_prec.toISOString().slice(0, 19).replace('T', ' ');
    date_post=date_post.toISOString().slice(0, 19).replace('T', ' ');
    
    global.dbCalDavEvents.transaction(tx => {
      
      tx.executeSql('SELECT DTEND,DTSTART,LOCATION,SUMMARY FROM CalDavEvents  WHERE MASTER==(?) AND LVL==(?) AND DTSTART >= (?) AND DTEND <= (?) ', [master,lvl,date_prec,date_post], // passing sql query and parameters:null
        
        (txObj, { rows: { _array } }) => { 
          let tmp_arg=[]
          
          _array.forEach(element => {
            
            element.DTSTART=convert_date(element.DTSTART)
            element.DTEND=convert_date(element.DTEND)
            
          })
          
          if (mode==0){
            setitems_today(_array)
          }
          
          if (mode==-1){
            setitems_ystrd(_array)
          }
          
          if (mode==1){
            setitems_tmrw(_array)
          }
          
          },
        
        (txObj, error) => console.log('Error ', error)
      )
    })
  });
  
  
  
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
  //rechargement des BD
  useEffect(() => {
    console.log("MISE A JOUR DB")
    Update_DB(master_id,master_lvl);
    req_events(master_id,master_lvl,0);
    req_events(master_id,master_lvl,1);
    req_events(master_id,master_lvl,-1);
  }, [master_id,master_lvl]);

  /*
  //avance d'un jour
  useEffect(() => {
      setitems_ystrd(items_today)
      setitems_today(items_tmrw)
      req_events(master_id,master_lvl,1);
  }, [idx_avance]);
  
  
  useEffect(() => {
      setitems_tmrw(items_today)
      setitems_today(items_ystrd)
      req_events(master_id,master_lvl,-1);
  }, [idx_recul]);
  */
  
  
  
  
  

  
  return (
    <>
    <View style={CalendarMainCompStyle.header}>
    <Text style={CalendarMainCompStyle.mainTitle}>M1 ANDROIDE</Text>
    <Text style={CalendarMainCompStyle.TodayDateHeader}>14 juillet 2021</Text>
    </View>

    <View style={CalendarMainCompStyle.body}>


      <View style={CalendarMainCompStyle.DayRow}>
        <View style={CalendarMainCompStyle.DayCard}>
          <Text style={CalendarMainCompStyle.DayAbv}>Mon</Text>
          <Text style={CalendarMainCompStyle.DayNumber}>21</Text>
        </View>

        <View style={CalendarMainCompStyle.DayCard}>
          <Text style={CalendarMainCompStyle.DayAbv}>Tue</Text>
          <Text style={CalendarMainCompStyle.DayNumber}>22</Text>
        </View>

        <View style={CalendarMainCompStyle.SelectedDayCard}>
          <Text style={CalendarMainCompStyle.DayAbv}>Wed</Text>
          <Text style={CalendarMainCompStyle.DayNumber}>23</Text>
        </View>

        <View style={CalendarMainCompStyle.DayCard}>
          <Text style={CalendarMainCompStyle.DayAbv}>Thu</Text>
          <Text style={CalendarMainCompStyle.DayNumber}>24</Text>
        </View>

        <View style={CalendarMainCompStyle.DayCard}>
          <Text style={CalendarMainCompStyle.DayAbv}>Fri</Text>
          <Text style={CalendarMainCompStyle.DayNumber}>25</Text>
        </View>
      </View>

      <View style={CalendarMainCompStyle.Schedule}>
        <View style={CalendarMainCompStyle.Event}>
          <Text style={CalendarMainCompStyle.EventTitle}>MAPSI - GROUPE 1</Text>
          <Text style={CalendarMainCompStyle.Location}>210-215-24</Text>
          <Text style={CalendarMainCompStyle.Time}>8h-9h30</Text>
        </View>

        <View style={CalendarMainCompStyle.Event}>
          <Text style={CalendarMainCompStyle.EventTitle}>MOGPL - GROUPE 1</Text>
          <Text style={CalendarMainCompStyle.Location}>210-215-24</Text>
          <Text style={CalendarMainCompStyle.Time}>8h-9h30</Text>
        </View>

        <View style={CalendarMainCompStyle.Event}>
          <Text style={CalendarMainCompStyle.EventTitle}>BIMA - GROUPE 1</Text>
          <Text style={CalendarMainCompStyle.Location}>210-215-24</Text>
          <Text style={CalendarMainCompStyle.Time}>8h-9h30</Text>
        </View>

        <View style={CalendarMainCompStyle.Event}>
          <Text style={CalendarMainCompStyle.EventTitle}>DLP - GROUPE 1</Text>
          <Text style={CalendarMainCompStyle.Location}>210-215-24</Text>
          <Text style={CalendarMainCompStyle.Time}>8h-9h30</Text>
        </View>
      </View>

    </View>

    
    
    </>
    
   
  );
}
  