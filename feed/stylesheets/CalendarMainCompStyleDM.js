import reactDom from 'react-dom';
import { StyleSheet } from 'react-native';

const CalendarMainCompStyleDM = StyleSheet.create({



header : {
  backgroundColor: "black",
  top:"0%",
  paddingTop:10,
  paddingLeft:10,
  height:80,
  flexDirection:"row"
},

headerleft_side:{
  flexDirection:"column",
  width:"auto"
},

Seleclvl:{
  marginTop:20,
  marginBottom : 20,
  flexDirection : "row",
},


Selectedlvl:{
  marginLeft:"auto",
  marginRight:"auto",
  borderColor: "white",
  backgroundColor : "white",
  padding: 3,
  borderWidth:1,
  borderRadius:10,
},

UnSelectedlvl:{
  marginLeft:"auto",
  marginRight:"auto",
  borderColor: "white",
  padding: 3,
  borderWidth:1,
  borderRadius:10,
},

Selecmaster:{
  
  paddingLeft: 30,
  borderWidth:1,
  
},

UnSelecmaster:{

  paddingLeft: 30,
  borderWidth:1,
  borderRadius:10,
  
},

headerright_side:{
  marginRight:30,
  marginLeft:"auto",
  marginTop:"auto",
  marginBottom:"auto"
},

mainTitle:{
    color:"white",
    fontSize:25,
    letterSpacing:1,
    marginBottom:3,
},

SelectedLvlTitle:{
  color:"black",
  fontSize:25,
  letterSpacing:1,
  marginBottom:3,
},

UnSelectedLvlTitle:{
  color:"white",
  fontSize:25,
  letterSpacing:1,
  marginBottom:3,
},

Masterdrawer:{
  color:"white",
  fontSize:18,
  letterSpacing:1,
  marginBottom:3,
},

SMasterdrawer:{
  color:"black",
  fontSize:18,
  letterSpacing:1,
  marginBottom:3,
  borderRadius:10,
  backgroundColor : "white",
  paddingLeft: 10
},

TodayDateHeader:{
    fontSize:15,
    color: "grey",
    letterSpacing:3,
},



body:{
  backgroundColor: "#212121",
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
  borderWidth: 0,
  borderColor: '#fff',
  flex:1,
},

Schedule:{

},

ScheduleG:{
  height: "60%"
},

DayRowG:{
  flexDirection: "row",
  top:0,
  height:90,
  marginTop:15,
  marginBottom:10,
},

DayRow:{
  flexDirection: "row",
  top:0,
  height:90,
},

NoEventText:{
  fontStyle:"italic",
  marginRight:"auto",
  marginLeft:"auto",
  color:"#BFBFBF"
},

DayCard:{
  paddingTop:7,
  paddingBottom:7,
  paddingRight:3,
  paddingLeft:3,
  marginRight:"auto",
  marginLeft:"auto",

},

SelectedDayCard:{
  backgroundColor: "#181818",
  borderColor: "white",
  borderRadius: 40,
  borderWidth: 0,
  paddingTop:7,
  paddingBottom:7,
  paddingRight:7,
  paddingLeft:7,
  marginRight:"auto",
  marginLeft:"auto",
},


Animation:{
  flex:1,
  backgroundColor : "red",
  height : 100,
  width:100,

},

DayAbv:{
  color: "grey",
  marginTop: 7,
  marginBottom: "auto",
  textAlign:"center",
},

DayNumber:{
  textAlign:"center",
  fontSize:20,
  fontWeight:"bold",
  marginBottom:7,
  color:"#BFBFBF",
},

NoEvent:{
  paddingTop:10,
  paddingBottom:10,
  marginTop:0,
  marginLeft:5,
  marginRight:5,
  marginBottom:5,
},

Event:{
  paddingBottom:10,
  paddingLeft:15,
  borderLeftWidth: 5,
  borderRadius: 0,
  borderWidth: 0,
  marginTop:0,
  marginLeft:5,
  marginRight:5,
  marginBottom:5,
  borderColor: "#BFBFBF"
},

Location:{
  fontSize:13,
  marginRight:30,
  flexShrink: 1,
  flexWrap: 'wrap',
  marginRight : "auto",
  maxWidth: 200,
  color: "#BFBFBF"

},

Summary:{
  flexShrink: 1,
  fontSize:13,
  marginRight : "auto",
  color: "#BFBFBF"
},

Time:{
  fontSize:13,
  color: "#BFBFBF"
  
},

scrollbar:{
  width:150
},

EventTitle:{
  letterSpacing:3,
  fontSize:17,
  color: "white",
},

elevatedElement: {
  zIndex: 3, // works on ios
  elevation: 3, // works on android
  backgroundColor: "red"
}

   
});

export { CalendarMainCompStyleDM }