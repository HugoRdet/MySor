import { Text, View,Dimensions,Animated,ScrollView,SafeAreaView,Pressable,ActivityIndicator } from 'react-native';
import React, { useEffect, useState , useRef,useMemo} from 'react';
import * as SQLite from 'expo-sqlite';
import { CalendarMainCompStyle } from "./stylesheets/CalendarMainCompStyle";
import Icon from 'react-native-vector-icons/Entypo';
import { FlatList } from 'react-native-bidirectional-infinite-scroll';
import DayRow from './DayRow.js';
import Update_DB from './update_DB.js'
import MenuDrawer from 'react-native-side-drawer'
import { set_month, getData,storeData, getNumberOfDays ,  convert_date } from './utilitaires';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;






export default function Get_Cal() {
  const [master_id, setmaster_id] = useState("DAC");          //master choisi
  const [master_lvl, setmaster_lvl] = useState("M1");         //niveau M1 / M2
  const [show, setShow] = useState(false);                    //page de chargement
  
  
  const [events, setevents] = useState([]); 
  const [date_v, setdate_v] = useState(0); 
  const [drawer, setdrawer] = useState(false); 
  const current_index=useRef(15)
  const precdate_v=useRef(0)
  const date_month=useRef("")
  const date_year=useRef(2022)
       

  
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 40,minimumViewTime:20 })
  const flatListRef = useRef(null)
  
  
  const onViewRef = React.useRef((viewableItems)=> {
    
    if (viewableItems.viewableItems.length==1){

      let tmp_date= new Date();
      tmp_date.setDate(tmp_date.getDate()+viewableItems.viewableItems[0].item.date)
      let tmp_month=tmp_date.getMonth()
      set_month(tmp_month,date_month)
      date_year.current=tmp_date.getFullYear()

      setdate_v(viewableItems.viewableItems[0].item.date)
      current_index.current=viewableItems.viewableItems[0].index;

    }

    

  })



  
  const req_events=( async (master,lvl,date_start,date_end)=>{
    
    let date_prec=new Date();
    let date_post=new Date();
    
    date_prec.setDate(date_prec.getDate()+date_start)
    date_post.setDate(date_post.getDate()+date_end)
    date_prec.setHours(0)
    date_post.setHours(23)
    
    date_prec=date_prec.toISOString().slice(0, 19).replace('T', ' ');
    date_post=date_post.toISOString().slice(0, 19).replace('T', ' ');
    

    
    await global.dbCalDavEvents.transaction(async tx => {
      
      await tx.executeSql('SELECT DTEND,DTSTART,LOCATION,SUMMARY FROM CalDavEvents  WHERE MASTER==(?) AND LVL==(?) AND DTSTART >= (?) AND DTEND <= (?) ORDER BY DTSTART ', [master,lvl,date_prec,date_post], // passing sql query and parameters:null
        
        (txObj, { rows: { _array } }) => { 
          let res_array=[]
          //initialisation des indices
          if (res_array.length==0){
            for (let i=date_start;i<=date_end;i++){
              res_array.push({date:i,events:[]})
            }
          }else{
            if (date_end<0){
              for (let i=date_end;i>=date_start;i--){
                res_array.unshift({date:i,events:[]})
              }
            }else{
              for (let i=date_start;i<=date_end;i++){
                res_array.push({date:i,events:[]})
              }
            }
          }

          const index_zero=-res_array[0].date
          const tmp_date_zero=new Date()
          

          
          
          _array.forEach(element => {
            
            element.DTSTART=convert_date(element.DTSTART)
            element.DTEND=convert_date(element.DTEND)
            

            let tmp_index_elem=getNumberOfDays(tmp_date_zero,element.DTSTART) 
            tmp_index_elem+=index_zero;
            let Event_title=element.SUMMARY.split('-')
            let placed= false;

            for (let j=0;j<res_array[tmp_index_elem].events.length;j++){
              if (Event_title.length==1){
                break;
              }

              if ((Event_title[0]===res_array[tmp_index_elem].events[j].title)||(Event_title[1]===res_array[tmp_index_elem].events[j].title)||(Event_title[2]===res_array[tmp_index_elem].events[j].SUMMARY)){
                res_array[tmp_index_elem].events[j].events.push({SUMMARY:Event_title[Event_title.length-1],LOCATION:element.LOCATION,DTSTART:element.DTSTART,DTEND:element.DTEND})
                placed=true;
                break;
              }
            }

            if (!placed){
              if (Event_title.length>2){
                res_array[tmp_index_elem].events.push({DTSTART:element.DTSTART,DTEND:element.DTEND,title:Event_title[1],events:[{SUMMARY:Event_title[Event_title.length-1],LOCATION:element.LOCATION,DTSTART:element.DTSTART,DTEND:element.DTEND}]})
              }else{
                res_array[tmp_index_elem].events.push({DTSTART:element.DTSTART,DTEND:element.DTEND,title:Event_title[0],events:[{SUMMARY:Event_title[Event_title.length-1],LOCATION:element.LOCATION,DTSTART:element.DTSTART,DTEND:element.DTEND}]})
              }
              
            }

            //res_array[+tmp_index_elem].events.push(element)
           
            
          })

          
          
          setevents(res_array)     
          return    
          },
        
        (txObj, error) => console.log('Error ', error)
      )
    })
  });

  const toggleOpen = () => {
    setdrawer(!drawer)
  };

  const drawerContent = () => {
    return (
      <View>
        
        <View style={CalendarMainCompStyle.Seleclvl} > 

        {
          master_lvl==="M1"?
          <>
          <Pressable
        onPress={()=>{setmaster_lvl("M1")}}
        style={CalendarMainCompStyle.Selectedlvl}
        >
          <Text style={CalendarMainCompStyle.SelectedLvlTitle}>M1</Text>
        </Pressable>
        <Pressable
        onPress={()=>{setmaster_lvl("M2")}}
        style={CalendarMainCompStyle.UnSelectedlvl}
        >
          <Text style={CalendarMainCompStyle.UnSelectedLvlTitle}>M2</Text>
        </Pressable>
          </>
          :
          <>
          <Pressable
        onPress={()=>{setmaster_lvl("M1")}}
        style={CalendarMainCompStyle.UnSelectedlvl}
        >
          <Text style={CalendarMainCompStyle.UnSelectedLvlTitle}>M1</Text>
        </Pressable>
        <Pressable
        onPress={()=>{setmaster_lvl("M2")}}
        style={CalendarMainCompStyle.Selectedlvl}
        >
          <Text style={CalendarMainCompStyle.SelectedLvlTitle}>M2</Text>
        </Pressable>
          </>
        }
        
        </View>

        <ScrollView>
        {
          master_id==="ANDROIDE"?
          <Pressable
        onPress={()=>{setmaster_id("ANDROIDE")}}
        style={CalendarMainCompStyle.Selecmaster}
        >
          <Text style={CalendarMainCompStyle.SMasterdrawer}>ANDROIDE</Text>
        </Pressable>
          :
          <Pressable
        onPress={()=>{setmaster_id("ANDROIDE")}}
        style={CalendarMainCompStyle.UnSelecmaster}
        >
          <Text style={CalendarMainCompStyle.Masterdrawer}>ANDROIDE</Text>
        </Pressable>
        }

        {
          master_id==="DAC"?
          <Pressable
        onPress={()=>{setmaster_id("DAC")}}
        style={CalendarMainCompStyle.Selecmaster}
        >
          <Text style={CalendarMainCompStyle.SMasterdrawer}>DAC</Text>
        </Pressable>
          :
          <Pressable
        onPress={()=>{setmaster_id("DAC")}}
        style={CalendarMainCompStyle.UnSelecmaster}
        >
          <Text style={CalendarMainCompStyle.Masterdrawer}>DAC</Text>
        </Pressable>
        }


        {
          master_id==="IMA"?
          <Pressable
        onPress={()=>{setmaster_id("IMA")}}
        style={CalendarMainCompStyle.Selecmaster}
        >
          <Text style={CalendarMainCompStyle.SMasterdrawer}>IMA</Text>
        </Pressable>
          :
          <Pressable
        onPress={()=>{setmaster_id("IMA")}}
        style={CalendarMainCompStyle.UnSelecmaster}
        >
          <Text style={CalendarMainCompStyle.Masterdrawer}>IMA</Text>
        </Pressable>
        } 

        {
          master_id==="BIM"?
          <Pressable
        onPress={()=>{setmaster_id("BIM")}}
        style={CalendarMainCompStyle.Selecmaster}
        >
          <Text style={CalendarMainCompStyle.SMasterdrawer}>BIM</Text>
        </Pressable>
          :
          <Pressable
        onPress={()=>{setmaster_id("BIM")}}
        style={CalendarMainCompStyle.UnSelecmaster}
        >
          <Text style={CalendarMainCompStyle.Masterdrawer}>BIM</Text>
        </Pressable>
        } 

        {
          master_id==="IQ"?
          <Pressable
        onPress={()=>{setmaster_id("IQ")}}
        style={CalendarMainCompStyle.Selecmaster}
        >
          <Text style={CalendarMainCompStyle.SMasterdrawer}>IQ</Text>
        </Pressable>
          :
          <Pressable
        onPress={()=>{setmaster_id("IQ")}}
        style={CalendarMainCompStyle.UnSelecmaster}
        >
          <Text style={CalendarMainCompStyle.Masterdrawer}>IQ</Text>
        </Pressable>
        } 


        {
          master_id==="RES"?
          <Pressable
        onPress={()=>{setmaster_id("RES")}}
        style={CalendarMainCompStyle.Selecmaster}
        >
          <Text style={CalendarMainCompStyle.SMasterdrawer}>RES</Text>
        </Pressable>
          :
          <Pressable
        onPress={()=>{setmaster_id("RES")}}
        style={CalendarMainCompStyle.UnSelecmaster}
        >
          <Text style={CalendarMainCompStyle.Masterdrawer}>RES</Text>
        </Pressable>
        } 

{
          master_id==="SAR"?
          <Pressable
        onPress={()=>{setmaster_id("SAR")}}
        style={CalendarMainCompStyle.Selecmaster}
        >
          <Text style={CalendarMainCompStyle.SMasterdrawer}>SAR</Text>
        </Pressable>
          :
          <Pressable
        onPress={()=>{setmaster_id("SAR")}}
        style={CalendarMainCompStyle.UnSelecmaster}
        >
          <Text style={CalendarMainCompStyle.Masterdrawer}>SAR</Text>
        </Pressable>
        } 

        {
          master_id==="SESI"?
          <Pressable
        onPress={()=>{setmaster_id("SESI")}}
        style={CalendarMainCompStyle.Selecmaster}
        >
          <Text style={CalendarMainCompStyle.SMasterdrawer}>SESI</Text>
        </Pressable>
          :
          <Pressable
        onPress={()=>{setmaster_id("SESI")}}
        style={CalendarMainCompStyle.UnSelecmaster}
        >
          <Text style={CalendarMainCompStyle.Masterdrawer}>SESI</Text>
        </Pressable>
        } 

{
          master_id==="SFPN"?
          <Pressable
        onPress={()=>{setmaster_id("SFPN")}}
        style={CalendarMainCompStyle.Selecmaster}
        >
          <Text style={CalendarMainCompStyle.SMasterdrawer}>SFPN</Text>
        </Pressable>
          :
          <Pressable
        onPress={()=>{setmaster_id("SFPN")}}
        style={CalendarMainCompStyle.UnSelecmaster}
        >
          <Text style={CalendarMainCompStyle.Masterdrawer}>SFPN</Text>
        </Pressable>
        } 

{
          master_id==="STL"?
          <Pressable
        onPress={()=>{setmaster_id("STL")}}
        style={CalendarMainCompStyle.Selecmaster}
        >
          <Text style={CalendarMainCompStyle.SMasterdrawer}>STL</Text>
        </Pressable>
          :
          <Pressable
        onPress={()=>{setmaster_id("STL")}}
        style={CalendarMainCompStyle.UnSelecmaster}
        >
          <Text style={CalendarMainCompStyle.Masterdrawer}>STL</Text>
        </Pressable>
        } 

{
          master_id==="STL-INSTA"?
          <Pressable
        onPress={()=>{setmaster_id("STL-INSTA")}}
        style={CalendarMainCompStyle.Selecmaster}
        >
          <Text style={CalendarMainCompStyle.SMasterdrawer}>STL-INSTA</Text>
        </Pressable>
          :
          <Pressable
        onPress={()=>{setmaster_id("STL-INSTA")}}
        style={CalendarMainCompStyle.UnSelecmaster}
        >
          <Text style={CalendarMainCompStyle.Masterdrawer}>STL-INSTA</Text>
        </Pressable>
        } 

{
          master_id==="SFPN-AFTI"?
          <Pressable
        onPress={()=>{setmaster_id("SFPN-AFTI")}}
        style={CalendarMainCompStyle.Selecmaster}
        >
          <Text style={CalendarMainCompStyle.SMasterdrawer}>SFPN-AFTI</Text>
        </Pressable>
          :
          <Pressable
        onPress={()=>{setmaster_id("SFPN-AFTI")}}
        style={CalendarMainCompStyle.UnSelecmaster}
        >
          <Text style={CalendarMainCompStyle.Masterdrawer}>SFPN-AFTI</Text>
        </Pressable>
        } 

{
          master_id==="RES-ITESCIA"?
          <Pressable
        onPress={()=>{setmaster_id("RES-ITESCIA")}}
        style={CalendarMainCompStyle.Selecmaster}
        >
          <Text style={CalendarMainCompStyle.SMasterdrawer}>RES-ITESCIA</Text>
        </Pressable>
          :
          <Pressable
        onPress={()=>{setmaster_id("RES-ITESCIA")}}
        style={CalendarMainCompStyle.UnSelecmaster}
        >
          <Text style={CalendarMainCompStyle.Masterdrawer}>RES-ITESCIA</Text>
        </Pressable>
        } 

        {
          master_id==="RES-EIT-Digital"?
          <Pressable
        onPress={()=>{setmaster_id("RES-EIT-Digital")}}
        style={CalendarMainCompStyle.Selecmaster}
        >
          <Text style={CalendarMainCompStyle.SMasterdrawer}>RES-EIT-Digital</Text>
        </Pressable>
          :
          <Pressable
        onPress={()=>{setmaster_id("RES-EIT-Digital")}}
        style={CalendarMainCompStyle.UnSelecmaster}
        >
          <Text style={CalendarMainCompStyle.Masterdrawer}>RES-EIT-Digital</Text>
        </Pressable>
        } 

        
        </ScrollView>

        
      </View>
    );
  };


    
 
  useEffect(() => {

    //mise à jour de la date
    let tmp_date= new Date();
    tmp_date.setDate(tmp_date.getDate()+date_v)
    let tmp_month=tmp_date.getMonth()
    set_month(tmp_month,date_month)
    date_year.current=tmp_date.getFullYear()
    
    //mise à jour des données si t>15min
    getData("@date_de_chargement_"+master_id+"_"+master_lvl).then((value)=>{
    let maintenant = new Date()
    
    if (value!="no value"){
      let prec_date=new Date(value)  
      let dif=maintenant.getTime()-prec_date.getTime()
      
      if (Math.floor((dif/1000)/60)>=30){
        storeData("@date_de_chargement_"+master_id+"_"+master_lvl,String(maintenant.toISOString()))
        setShow(false)
        console.log("rechargement de la BD "+master_id+" "+master_lvl)
        
      }else{
        console.log("non rechargement de la BD "+master_id+" "+master_lvl)
        req_events(master_id,master_lvl,0,7)
      }

    }else{
      
      let maintenant = new Date()
      console.log("rechargement de la BD "+master_id+" "+master_lvl)
      storeData("@date_de_chargement_"+master_id+"_"+master_lvl,String( maintenant.toISOString()))
      setShow(false)
    }
      
    })
  
  }, [master_id,master_lvl]);

  //rechargement des BD
  useEffect(() => {
    precdate_v.current=date_v;
  }, [date_v]);
  

  useEffect(() => {
    
    if (!show){

      const procedure= async ()=>{
        await Update_DB(master_id,master_lvl).then(async ()=>{
          
          await req_events(master_id,master_lvl,0,7).then(()=>{
            
            setShow(true)
          })
        });
      }

      procedure()
      
    }
  
  }, [show]);

  
  const ItemRender = (( item )=>{
    
    const day_events = item.item.events


    if (day_events.length==0){
      return(
        <View  style={CalendarMainCompStyle.Schedule} key={item.item.date+" child"}>
          
          <View style={[CalendarMainCompStyle.NoEvent,{width:windowWidth-10}]}>
            
            <Text style={CalendarMainCompStyle.NoEventText}>There is nothing for the moment</Text>
            
          </View>
       </View>
      );

    }else{
      return(
        <View style={CalendarMainCompStyle.Schedule} key={item.item.date+" child"} >
        <ScrollView>
        {day_events.map( (element) => {
          
        return (
          <View  style={[CalendarMainCompStyle.Event,{width:windowWidth-10}]} key={item.item.date+"   "+element.title+"  "+element.DTSTART.getHours} >
            <Text style={CalendarMainCompStyle.EventTitle}>{element.title}</Text>
            {element.events.map((tmp_elem)=>{

              return(
              <View style={{ flexDirection : "row",marginTop:10}} key={item.item.date+" "+element.title+"   "+tmp_elem.SUMMARY+"  "+tmp_elem.LOCATION+"  "+tmp_elem.DTSTART.getHours()}>
                
                <View style={{ flexDirection : "column",marginTop:2,marginRight:30}}>
                  <Text style={CalendarMainCompStyle.Time}> {tmp_elem.DTSTART.getHours()}h{tmp_elem.DTSTART.getMinutes()}{tmp_elem.DTSTART.getMinutes()==0?"0":<></>}</Text>
                  <Text style={CalendarMainCompStyle.Time}> {tmp_elem.DTEND.getHours()}h{tmp_elem.DTEND.getMinutes()}{tmp_elem.DTEND.getMinutes()==0?"0":<></>}</Text>
                </View>
                <View style={{ flexDirection : "column",marginTop:2}}>
                <Text style={CalendarMainCompStyle.Summary}>{tmp_elem.SUMMARY}</Text>
                  <Text style={CalendarMainCompStyle.Location}><Icon name='location'  color="black" backgroundColor="white"/>{tmp_elem.LOCATION}</Text>
                </View>
              
              
              </View>
              )
            })}
          
          </View>
        )
      } ) }
      </ScrollView>
      </View>
      );

    }
    
    
    
  });

  const memoizedValue = useMemo(() => ItemRender, [events]);



  
  
  

  
  return (
    <>
    <View style={CalendarMainCompStyle.header}>
      <View style={CalendarMainCompStyle.headerleft_side}>
        <Text style={CalendarMainCompStyle.mainTitle}>{master_lvl} {master_id}</Text>
        <Text style={CalendarMainCompStyle.TodayDateHeader}>{date_month.current}  {date_year.current}</Text>
      </View>

      <View style={CalendarMainCompStyle.headerright_side}>
      
          
        
        <Icon.Button
        name='dots-three-vertical'
        size={30}
        color="white"
        backgroundColor="black"
        onPress={toggleOpen}
        />
        
      </View>
    
    </View>

    
    <MenuDrawer
          open={drawer}
          position={'right'}
          drawerContent={drawerContent()}
          drawerPercentage={55}
          animationTime={250}
          overlay={false}
          opacity={0.4}
        >
    <View style={CalendarMainCompStyle.body}>

     
    

      
    
      <View style={CalendarMainCompStyle.DayRowG}>
      <DayRow date_v={date_v} precdate_v={precdate_v} flatListRef={flatListRef} current_index={current_index} />
      </View>
      <View style={CalendarMainCompStyle.ScheduleG}>
      {show===true?
      <FlatList
      ref={flatListRef}
      initialScrollIndex={date_v}
      removeClippedSubviews={true}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={events}
      extraData={events}
      initialNumToRender={7}
      viewabilityConfig={viewConfigRef.current}
      onViewableItemsChanged={onViewRef.current}
      renderItem={ memoizedValue }
      
      keyExtractor={(item, index) => {
        return item.date
      }}
      snapToAlignment={"start"}
      decelerationRate={"fast"}
      snapToInterval={windowWidth}
      getItemLayout={(data, index) => (
        {length: windowWidth, offset: windowWidth * index, index}
      )}
      />
      :
      <View style={{ marginTop:"50%",marginBottom:"auto"}}>
      <ActivityIndicator size="large" color="#AE142A" />
      </View>
      }
      </View>
      
      
      

     
      

    </View>
    </MenuDrawer>

    
    
    </>
    
   
  );
}

