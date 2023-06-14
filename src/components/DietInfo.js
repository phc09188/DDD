import React,{useEffect,useState} from "react";
import { StyleSheet,View,Text,Image,ScrollView,Button } from "react-native";
import { useSelector } from "react-redux";
import RNFetchBlob from 'rn-fetch-blob';
import { useNavigation } from '@react-navigation/native';

function DietInfo({diet}) {
//{"diaries": [{"diaryId": 1, "diaryImage": [Object], "foods": [Array], "lat": 37.2429406, "lnt": 127.0677065, "mealTime": "Breakfast", "member": [Object], "writeDate": "2023-05-05"}], "diaryExist": [true, false, false, false]}
//음식 여러개일 때 확인해야 1개일 때 아닐 때 조건부로      
const address = useSelector((state) => state.user.address);
const token=useSelector(state => state.user.accessToken);
const [foodImage, setFoodImage] = useState(false);
const [id,setId]=useState(false);
const [foods,setFoods]=useState(false);
const navigation=useNavigation();
useEffect(()=>{
  //diet parse stringify 제거한 뒤에 테스트
  let dietObj=JSON.parse(diet);
  setId(dietObj.diaryId);
  setFoods(dietObj.foods);
  console.log(dietObj,"id확인");
        if(dietObj.fileUrl){
        console.log(dietObj.fileUrl);
        RNFetchBlob
        .config({
          fileCache: false,
        })
        .fetch('GET', address+"/diary/image/read?fileUrl="+dietObj.fileUrl, { 
          Authorization: "Bearer " + token,
          "content-type":"image/jpeg"
        })
        .then((res) => {
          let base64Str = res.base64();
          setFoodImage(`data:image/jpeg;base64,${base64Str}`);
        })
        .catch((error) => console.error(error));
      }
  },[id]);
  
  return (
     
  <View>
  <ScrollView>
  <View style={styles.card}>
    <View style={styles.infoContainer}>
    {foodImage && <Image style={{ width: 200, height: 200, justifyContent: "center",}} source={{ uri: foodImage }} />}
       {foods && foods.map((food, idx) => (
            <View key={idx}>
              <Text style={styles.title}>
                {"\n"} 음식 이름 : {food.name+"\n"}
                1회제공량 : {food.weight+"(g/ml)\n"}
                100(g/ml)당 열량 : {food.calories+"kcal\n"}
                100(g/ml)당 탄수화물 : {food.tan+"g\n"}
                100(g/ml)당 단백질 : {food.dan+"g\n"}
                100(g/ml)당 지방 : {food.ji+"g\n"}
                100(g/ml)당 나트륨 : {food.na+"mg"}
              </Text>
            </View>
          ))} 
      </View>        
    </View>
         
  {/* [5]url [6]음식 객체들 배열 [7]이미지*/}
  <Button title="정보 지우기"
      onPress={()=>{
        fetch(address+"/diary/delete?diaryId="+id, {  
          method: "POST",
          headers : {
            Authorization: "Bearer "+token
            }
                }).then(function(){
            navigation.navigate("CalendarView");
                })
        
      }}
      />
</ScrollView>
</View>
  );
}
export default DietInfo;

const styles = StyleSheet.create({
    background: {
      backgroundColor: "rgba(0,0,0,0,6)",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    whiteBox: {
      width: 300,
      backgroundColor: "white",
      borderRadius: 4,
      elevation: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    actionButton: {
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      marginRight: 8,
    },
    text: {
      fontSize: 26,
    },
    dietList: {
      backgroundColor: "brown",
      marginBottom: 10,
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderRadius: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    card: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 10,
      elevation: 2,
      
    },
    image: {
      width: '100%',
      height: 200,
    },
    infoContainer: {
      padding: 20,
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    info: {
      fontSize: 16,
      marginBottom: 5,
    },
  });

  //aaa
// const FoodCard = ({ base64Image, name, calories, carbs }) => (
// );