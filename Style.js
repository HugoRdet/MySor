import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({



MainComponent : {
  backgroundColor: "black",
  flex:1,
},

Row : {
  height:50,
  position:"absolute",
  bottom:"3%",
  width : "100%",
  backgroundColor: "white",
  borderTopColor : "grey",
  borderTopWidth: 2,
  flexDirection:"row"
},

RowIcon:{
  marginLeft:"auto",
  marginRight:"auto",
},

maincompLinks:{
  flex :1,
  paddingBottom : 30,
  justifyContent :'flex-end',
  marginBottom : 40,
},

Title:{
  fontSize:25,
  letterSpacing:1,
  marginBottom:3,
  marginBottom:20,
  textAlign: 'center',
  flex : 0,
},

maincompHome:{
  paddingTop:10,
  paddingLeft:10,
  paddingRight:10,
  flex: 1,
},

link:{
  marginLeft : 0,
  marginRight : 0,
  marginTop : 5,
  marginBottom : 5,
  borderWidth : 2,
  height : 50,
  padding: 10,
  borderColor : "black",
  bottom : 0,
  
},

linktext:{

  textAlign: 'center'
},

citationBlock:{
  marginTop : 30,
  marginBottom : 30,
},

citationQuote:{
  fontSize:50,

  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "auto",
  marginTop: "auto",
  

}
   
});

export { styles }