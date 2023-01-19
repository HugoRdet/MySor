import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

/*
global.dbCalDavEvents.transaction(tx => {
tx.executeSql('DROP TABLE CalDavEvents', null,
(txObj, resultSet) =>{},
(txObj, error) => {console.log('Error', error)});
})
*/

export default function InitDB() {
  
  
  
  global.dbCalDavEvents = SQLite.openDatabase('CalDavEvents.db');
  
  
  
  
  global.dbCalDavEvents.transaction(tx => {
    const query = `CREATE TABLE IF NOT EXISTS CalDavEvents(
          DTEND DATE NOT NULL,
          DTSTART DATE   NOT NULL,
          LOCATION TEXT  ,
          SUIVI BOOLEAN DEFAULT FALSE,
          SUMMARY TEXT  NOT NULL,
          MASTER TEXT NOT NULL,
          LVL TEXT NOT NULL,
          UNIQUE (DTSTART,SUMMARY,MASTER,LVL)
  
    );`;
    
    tx.executeSql(query);
  });
  
  
  
  global.dbCalDavEvents.transaction(tx => {
      const query = `CREATE TABLE IF NOT EXISTS matieres(
          NAME TEXT PRIMARY KEY NOT NULL,
          SUIVI BOOLEAN DEFAULT FALSE
    );`;
    
      tx.executeSql(query);
    });

}