
import { Text, View,Dimensions,Animated } from 'react-native';
import React, { useEffect, useState , useRef,useMemo} from 'react';
import { FlatList } from 'react-native-bidirectional-infinite-scroll';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const dayrow=[{id:0},{id:1}]


export default function DayRow(props) {

    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 70,minimumViewTime:200 })  
    const [weeks, setweeks] = useState(dayrow);    
    const [week_v, setweek_v] = useState(0); 
    const prevweek_v=useRef(0)
    const flatListRef = useRef(null)
    const currentweek=useRef(0)
    const UsedStyle = useRef(props.UsedStyle);

    const onViewRef = React.useRef((viewableItems)=> {
        if (viewableItems.viewableItems.length==1){              
          prevweek_v.current=currentweek.current
          currentweek.current=viewableItems.viewableItems[0].index
          if (props.flatListRef.current!=null){

          if (prevweek_v.current<currentweek.current){
            //on avance d'une semaine
            if (props.current_index.current<=7-7){
              props.flatListRef.current.scrollToIndex({index: props.current_index.current+7,animated:false})
            }else{
              
              props.flatListRef.current.scrollToIndex({index: 7,animated:false})

            }
            
          }

          if (prevweek_v.current>currentweek.current){
            
            //on recule d'une semaine
            //props.setdate_v(props.date_v-7)
            if (props.current_index.current >=7){
              props.flatListRef.current.scrollToIndex({index: props.current_index.current-7,animated:false})
            }else{
              props.flatListRef.current.scrollToIndex({index: 0,animated:false})
            }
            
          }
        }
              
        }
    })

    useEffect(() => {
      let curr = new Date();
      let selected_day = (curr.getDay() + props.date_v )%7;
      if ((props.precdate_v.current-props.date_v<7)&&(props.precdate_v.current-props.date_v>-7)){
      if (props.precdate_v.current<props.date_v){
        
        if (selected_day==1){
          if (currentweek.current<dayrow.length-1){
            currentweek.current+=1;
            flatListRef.current.scrollToIndex({index: currentweek.current})
          }
          
        }
      }

      

      if (props.precdate_v.current>props.date_v){
        if (selected_day==0){
          
          
          if (currentweek.current>0){
            currentweek.current+=-1;
            flatListRef.current.scrollToIndex({index: currentweek.current})
          }
        }
      }
    }
    },[props.date_v]);


    
    
    



    const ItemRender = (( item )=>{
        
        let decalage=item.item.id;

        let curr = new Date();
        let selected_day = (curr.getDay() + props.date_v )%7;
        if (selected_day<0){
          selected_day+=7
        }
        let tmp_date = new Date(curr.setDate(curr.getDate() - curr.getDay() + decalage*7 ));
        tmp_date.setDate(tmp_date.getDate() + 1)
        let mon_date_n=tmp_date.getDate();
        tmp_date.setDate(tmp_date.getDate() + 1)
        let tue_date_n=tmp_date.getDate();
        tmp_date.setDate(tmp_date.getDate() + 1)
        let wed_date_n=tmp_date.getDate();
        tmp_date.setDate(tmp_date.getDate() + 1)
        let thu_date_n=tmp_date.getDate();
        tmp_date.setDate(tmp_date.getDate() + 1)
        let fri_date_n=tmp_date.getDate();
        tmp_date.setDate(tmp_date.getDate() + 1)
        let sat_date_n=tmp_date.getDate();
        tmp_date.setDate(tmp_date.getDate() + 1)
        let sun_date_n=tmp_date.getDate();
    
        return(
            <View style={[UsedStyle.current.DayRow,{width:windowWidth}]}>
      
              {(selected_day===1)? 
              <View style={UsedStyle.current.SelectedDayCard}>
                <Text style={UsedStyle.current.DayAbv}>Mon</Text>
                <Text style={UsedStyle.current.DayNumber}>{mon_date_n}</Text>
              </View>
                :
              <View style={UsedStyle.current.DayCard}>
                <Text style={UsedStyle.current.DayAbv}>Mon</Text>
                <Text style={UsedStyle.current.DayNumber}>{mon_date_n}</Text>
              </View>
              }
      
              {(selected_day===2)? 
              <View style={UsedStyle.current.SelectedDayCard}>
                <Text style={UsedStyle.current.DayAbv}>Tue</Text>
                <Text style={UsedStyle.current.DayNumber}>{tue_date_n}</Text>
              </View>
                :
              <View style={UsedStyle.current.DayCard}>
                <Text style={UsedStyle.current.DayAbv}>Tue</Text>
                <Text style={UsedStyle.current.DayNumber}>{tue_date_n}</Text>
              </View>
              }
      
              {(selected_day===3)? 
              <View style={UsedStyle.current.SelectedDayCard}>
                <Text style={UsedStyle.current.DayAbv}>Wed</Text>
                <Text style={UsedStyle.current.DayNumber}>{wed_date_n}</Text>
              </View>
                :
              <View style={UsedStyle.current.DayCard}>
                <Text style={UsedStyle.current.DayAbv}>Wed</Text>
                <Text style={UsedStyle.current.DayNumber}>{wed_date_n}</Text>
              </View>
              }
      
            {(selected_day===4)? 
              <View style={UsedStyle.current.SelectedDayCard}>
                <Text style={UsedStyle.current.DayAbv}>Thu</Text>
                <Text style={UsedStyle.current.DayNumber}>{thu_date_n}</Text>
              </View>
                :
              <View style={UsedStyle.current.DayCard}>
                <Text style={UsedStyle.current.DayAbv}>Thu</Text>
                <Text style={UsedStyle.current.DayNumber}>{thu_date_n}</Text>
              </View>
              }
      
            {(selected_day===5)? 
              <View style={UsedStyle.current.SelectedDayCard}>
                <Text style={UsedStyle.current.DayAbv}>Fri</Text>
                <Text style={UsedStyle.current.DayNumber}>{fri_date_n}</Text>
              </View>
                :
              <View style={UsedStyle.current.DayCard}>
                <Text style={UsedStyle.current.DayAbv}>Fri</Text>
                <Text style={UsedStyle.current.DayNumber}>{fri_date_n}</Text>
              </View>
              }
      
              {(selected_day===6)? 
                <View style={UsedStyle.current.SelectedDayCard}>
                  <Text style={UsedStyle.current.DayAbv}>Sat</Text>
                  <Text style={UsedStyle.current.DayNumber}>{sat_date_n}</Text>
                </View>
                :
                <View style={UsedStyle.current.DayCard}>
                  <Text style={UsedStyle.current.DayAbv}>Sat</Text>
                  <Text style={UsedStyle.current.DayNumber}>{sat_date_n}</Text>
                </View>
              }
      
              {(selected_day===0)? 
                <View style={UsedStyle.current.SelectedDayCard}>
                  <Text style={UsedStyle.current.DayAbv}>Sun</Text>
                  <Text style={UsedStyle.current.DayNumber}>{sun_date_n}</Text>
                </View>
                :
                <View style={UsedStyle.current.DayCard}>
                  <Text style={UsedStyle.current.DayAbv}>Sun</Text>
                  <Text style={UsedStyle.current.DayNumber}>{sun_date_n}</Text>
                </View>
              }
      
            </View>
          );
        
      });

      const memoizedValue = useMemo(() => ItemRender, [weeks]);

      
  





    return (
        
        <FlatList
        ref={flatListRef}
        key={weeks.length}
        getItemLayout={(data, index) => (
          {length: windowWidth, offset: windowWidth * index, index}
        )}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={weeks}
        extraData={weeks}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        renderItem={ItemRender}
        initialNumToRender={3}
        keyExtractor={item => item.id}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={windowWidth}
        initialScrollIndex={0}
      />
        
    );
  



  

}

