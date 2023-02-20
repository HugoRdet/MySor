import { StyleSheet } from 'react-native';

const stylesDM = StyleSheet.create({

SafeAreaMode0: { 
  flex:0, 
  backgroundColor: '#181818' 
},

button:{
  backgroundColor: '#181818',
},

SafeAreaMode1: { 
  flex:1, 
  backgroundColor: '#181818' 
},

MainComponent : {
  backgroundColor: "black",
  flex:1,
},



ModeButton:{
  position:"absolute",
  top:"0%",
  right:"0%",

},

Row : {
  height:70,
  position:"absolute",
  bottom:"0%",
  width : "100%",
  backgroundColor: "#181818",
  borderTopColor : "grey",
  borderTopWidth: 1,
  flexDirection:"row"
},

RowIcon:{
  marginLeft:"auto",
  marginRight:"auto",
  alignItems:"center",
  textAlign:"center",
},

maincompLinks:{
  flex :1,
  paddingBottom : 30,
  justifyContent :'flex-end',
  marginBottom : 40,
},
imageB:{
  zIndex: -1,
  flex:1,
  justifyContent: "center",
},
Title:{
  fontSize:25,
  letterSpacing:1,
  marginBottom:20,
  textAlign: 'center',
  color: "#FFFFFF",
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
  borderWidth : 1,
  height : 50,
  paddingBottom: 13,
  paddingLeft: 13,
  paddingTop: 13,
  width: "100%",
  borderColor : "#3D3D3D",
  borderRadius : 15,
  backgroundColor : "#212121",
  flexDirection : "row",
},

linktext:{
  fontSize: 15,
  color : "#BFBFBF",
  textAlign: 'left',
  marginRight: "auto",
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

export { stylesDM }