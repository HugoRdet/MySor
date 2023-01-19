import AsyncStorage from '@react-native-async-storage/async-storage';

export function set_month(tmp_month,date_month){
    switch (tmp_month) {
      case 0:
        date_month.current="January";
        break;
  
      case 1:
        date_month.current="February";
        break;
  
      case 2:
        date_month.current="March";
        break;
  
      case 3:
        date_month.current="April";
        break;
  
      case 4:
        date_month.current="May";
        break;
  
      case 5:
        date_month.current="June";
        break;
  
      case 6:
        date_month.current="July";
        break;
  
      case 7:
        date_month.current="August";
        break;
  
      case 8:
        date_month.current="September";
        break;
  
      case 9:
        date_month.current="October";
        break;
  
      case 10:
        date_month.current="November";
        break;
      
      default:
        date_month.current="December";
    }
  }

  /* Stockage de données */
export const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }
  }
  
  
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      return value
    }else{
      return "no value"
    }
  } catch(e) {
    // error reading value
  }
  }

export function convert_date(dateStr) {
    var a=dateStr.split(" ");
    var d=a[0].split("-");
    var t=a[1].split(":");
    var formatedDate = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);
    return formatedDate
  }

export function getNumberOfDays(start, end) {
    const date1 = new Date(start.getTime());
    const date2 = new Date(end.getTime());
    date1.setHours(12)
    date2.setHours(12)
  
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);
  
    return diffInDays;
  }