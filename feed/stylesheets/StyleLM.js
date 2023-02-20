import { StyleSheet } from 'react-native';

const stylesLM = StyleSheet.create({

  SafeAreaMode0: { 
    flex:0, 
    backgroundColor: "#DCDCDC"
  },
  
  SafeAreaMode1: { 
    flex:1, 
    backgroundColor: "#DCDCDC"
  },

  button:{
    backgroundColor: "#DCDCDC",
  },

MainComponent : {
  backgroundColor: "black",
  flex:1,
},

SafeAreaMode: { flex:0, 
  backgroundColor: '#181818' 
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
  backgroundColor: "#DCDCDC",
  borderTopColor : "#808080",
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
  color: "black",
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
  borderColor : "#808080",
  borderRadius : 15,
  backgroundColor : "#DCDCDC",
  flexDirection : "row",
},

linktext:{
  fontSize: 15,
  color : "black",
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

export { stylesLM }