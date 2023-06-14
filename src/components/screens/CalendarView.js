import React from "react";
import { Calendar } from "react-native-calendars";
import { StyleSheet,View,Button } from "react-native";
import {useSelector,useDispatch,Provider} from "react-redux";
import {store} from "../redux/store/store";
import auth from '@react-native-firebase/auth';
function CalendarView({navigation}) {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  return (
    <View>
    <Calendar 
      style={styles.calendar} 
      theme={{
        todayBackgroundColor: 'blue',
        arrowColor: 'blue',
        dotColor: 'green',
        todayTextColor: 'white',
      }}
      onDayPress={(day) => {
        //day.dateString
        navigation.navigate("DailyList",{"date":day.dateString});
      }}
      />
      <Button title="현 위치 지도"
      onPress={()=>{
        navigation.navigate("LocationMap");
      }}
      />
      <Button title="로그아웃"
      onPress={()=>{
        auth().signOut()
        navigation.navigate("Login");
      }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }
});

export default CalendarView;