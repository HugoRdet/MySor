import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import base64 from 'react-native-base64';
import ical from 'cal-parser';
import * as SQLite from 'expo-sqlite';



async function Add_event_db(event,master_id,lvl){
  
  //on ne garde en mémoire que les evennements de moins de 6 mois
  let d_limit = new Date();
  d_limit = d_limit.setMonth(d_limit.getMonth() - 6)
  
  
  if (d_limit>event.dtstart.value){
    return;
  }
  
  let new_obj={
    dtend : new Date(event.dtend.value).toISOString().slice(0, 19).replace('T', ' '),
    dstart : new Date(event.dtstart.value).toISOString().slice(0, 19).replace('T', ' '),
  }
  /*
  if ((event.summary.value.includes("TD"))||(event.summary.value.includes("TME"))){
    var tmp=event.summary.value.split("-")
    new_obj.summary=tmp[1]+"-"+tmp[2]
  }else{
    new_obj.summary=event.summary.value
  }*/

  new_obj.summary=event.summary.value.replace(/^\s+/g, '')

  
  
  
  
  if (event.location!=undefined){
    

    
  
    
    if (event.location.value.includes('Salle')){
      
      new_obj.location = event.location.value.replace('Salle', '').replace('.', '-').replace(/^\s+/g, '')
    }else{
      new_obj.location = event.location.value.replace(/^\s+/g, '')
    }


    
    await global.dbCalDavEvents.transaction(async tx => {
      await tx.executeSql('INSERT INTO CalDavEvents (DTEND, DTSTART,LOCATION,SUIVI,SUMMARY,MASTER,LVL) values (?,?,?,?,?,?,?)', [new_obj.dtend,new_obj.dstart,new_obj.location,0,new_obj.summary,master_id,lvl],
        async (txObj, resultSet) =>{},
        async (txObj, error) => {

        

         await global.dbCalDavEvents.transaction(async tx => {
            await tx.executeSql(`
            UPDATE CalDavEvents
            SET LOCATION=(?)
            WHERE
            SUMMARY=(?) AND
            DTSTART=(?) AND
            DTEND=(?)
            
            `, [new_obj.location,new_obj.summary,new_obj.dstart,new_obj.dtend],
              async (txObj, resultSet) =>{},
              async (txObj, error) => {
                console.log(error)
                
                
              });
          })
          
        });
    })

    


    
    
    
    
    
  }else{
    new_obj.location = 'non renseignée'
    
    await global.dbCalDavEvents.transaction(async tx => {
      await tx.executeSql('INSERT OR IGNORE INTO CalDavEvents (DTEND, DTSTART,LOCATION,SUIVI,SUMMARY,MASTER,LVL) values (?,?,?,?,?,?,?) ', [new_obj.dtend,new_obj.dstart,new_obj.location,0,new_obj.summary,master_id,lvl],
        async (txObj, resultSet) =>{},
        async (txObj, error) => { console.log(error) });
    })

    
    

    

    
    
  }



  

  
  
  
  
  
  

  
}

export default async function Update_DB(master_id,lvl) {
  
  const username= "student.master";
  const password= "guest"
  const authHeader = 'Basic ' + base64.encode(`${username}:${password}`);
  
  const api = axios.create({
    baseURL : 'https://cal.ufr-info-p6.jussieu.fr:443/caldav.php/',
    timeout : 10000,
    headers : {'X-Custom-Header' : 'foobar',
      'Authorization': authHeader },
    
  });
  
  const getmessage_fun = async () => {
    
    
    
    switch (master_id) {
      case 'RES-EIT-Digital':
        var chemin=`RES/${lvl}_RES-EIT-Digital/`;
        break;
      
      case 'RES-ITESCIA':
        var chemin=`RES/${lvl}_RES-ITESCIA/`;
        break;
      
      case 'SFPN-AFTI':
        var chemin=`SFPN/${lvl}_SFPN-AFTI/`;
        break;
      
      case 'STL-INSTA':
        var chemin=`STL/M2_STL-INSTA/`;
        break;
      
      default:
        var chemin=`${master_id}/${lvl}_${master_id}/`;
    }

    
    await api.get(chemin)
    .then( async response => {
      
      await global.dbCalDavEvents.transaction(tx => {
        tx.executeSql('DELETE FROM CalDavEvents WHERE MASTER==(?) AND LVL==(?)', [master_id,lvl],
          (txObj, resultSet) =>{},
          (txObj, error) => {console.log('Error', error)});
      })
      
      const parsed=ical.parseString(response.data)
      
      
      
      for (nb_tmp=0;nb_tmp<parsed.events.length;nb_tmp++){
        
        if (parsed.events[nb_tmp].recurrenceRule!=undefined){
          
            tmp_date_until=new Date(parsed.events[nb_tmp].recurrenceRule.options.until)
            tmp_dtstart=new Date(parsed.events[nb_tmp].dtstart.value)
            tmp_dtend=new Date(parsed.events[nb_tmp].dtend.value)
            
            while (tmp_date_until>tmp_dtstart) {
              /*
              if ((tmp_dtstart.getFullYear()>=2022)&&(parsed.events[nb_tmp].summary.value.includes('TD1'))){
                console.log(parsed.events[nb_tmp].summary.value,"   ",tmp_dtstart)
              }*/
              await Add_event_db(parsed.events[nb_tmp],master_id,lvl)
              
              
              tmp_dtstart.setDate(tmp_dtstart.getDate()+7)
              tmp_dtend.setDate(tmp_dtend.getDate()+7)
              
              
              parsed.events[nb_tmp].dtstart.value=tmp_dtstart
              parsed.events[nb_tmp].dtend.value=tmp_dtend
              
              
              
            }
          
          
        }
        
        else{
          await Add_event_db(parsed.events[nb_tmp],master_id,lvl);
        }  
        
        
        
                
        
      }
    })
    .catch(err => {
      console.log(err)
      return false
    });

  }
  
  return await getmessage_fun();
  
}
  