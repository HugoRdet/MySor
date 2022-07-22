import { StyleSheet } from 'react-native';

const CalendarMainCompStyle = StyleSheet.create({



header : {
  backgroundColor: "black",
  top:"0%",
  paddingTop:10,
  paddingLeft:10,
  height:80,
},

mainTitle:{
    color:"white",
    fontSize:25,
    letterSpacing:1,
    marginBottom:3,
},

TodayDateHeader:{
    fontSize:15,
    color: "grey",
    letterSpacing:3,
},

body:{
  backgroundColor: "white",
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
  borderWidth: 0,
  borderColor: '#fff',
  flex:1,
},

DayRow:{
  flexDirection: "row",
  top:"0%",
  height:90,
  marginLeft:10,
  marginRight:10,
  marginTop:15,
  marginBottom:10,
},

DayCard:{
  paddingTop:7,
  paddingBottom:7,
  paddingRight:7,
  paddingLeft:7,
  marginRight:"auto",
  marginLeft:"auto",

},

SelectedDayCard:{
  backgroundColor: "#F0F0F0",
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
},

Event:{
  paddingTop:10,
  paddingBottom:10,
  paddingLeft:15,
  borderColor: "#B99664",
  backgroundColor: "#f9f7f4",
  borderLeftWidth: 5,
  borderRadius: 0,
  borderWidth: 0,
  marginTop:0,
  marginLeft:5,
  marginRight:5,
  marginBottom:5,
},

Location:{
  marginBottom:25,
},

Time:{
  
  
},

EventTitle:{
  letterSpacing:3,
}

   
});

export { CalendarMainCompStyle }