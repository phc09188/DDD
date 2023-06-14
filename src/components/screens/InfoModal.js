import React,{useEffect,useState} from "react";
import { StyleSheet, Modal, View, Pressable, Text,Image, ScrollView } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import { useSelector } from "react-redux";

export default function InfoModal({visible, onClose, location, info}) {
  const address = useSelector((state) => state.user.address);
  const token=useSelector(state => state.user.accessToken);
  const [dietInfo,setDietInfo]=useState(false);
  const [foodImage, setFoodImage] = useState(false);
  const [foods,setFoods]=useState(false);
  
  useEffect(()=>{
    //diet parse stringify 제거한 뒤에 테스트
    let infoObj=JSON.parse(info);
    console.log(infoObj);
    setDietInfo(infoObj);
    setFoods(infoObj.foods);
          if(infoObj.fileUrl){
          RNFetchBlob
          .config({
            fileCache: false,
          })
          .fetch('GET', address+"/diary/image/read?fileUrl="+infoObj.fileUrl, { 
            Authorization: "Bearer " + token,
            "content-type":"image/jpeg"
          })
          .then((res) => {
            let base64Str = res.base64();
            setFoodImage(`data:image/jpeg;base64,${base64Str}`);
          })
          .catch((error) => console.error(error));
        }
    },[]);

  return (
    <View style={styles.container}>
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}>
          <ScrollView>
          <View style={styles.whiteBox}>
          
          {foodImage && <Image style={{ width: 200, height: 200, justifyContent: "center",}} source={{ uri: foodImage }} />}
          {foods && foods.map((food, idx) => (
            <View key={-idx}>
              <Text style={styles.actionButton}>
                음식 이름 : {food.name+"\n"}
                1회제공량 : {food.weight+"(g/ml)\n"}
                100(g/ml)당 열량 : {food.calories+"kcal\n"}
                100(g/ml)당 탄수화물 : {food.tan+"g\n"}
                100(g/ml)당 단백질 : {food.dan+"g\n"}
                100(g/ml)당 지방 : {food.ji+"g\n"}
                100(g/ml)당 나트륨 : {food.na+"mg"}
              </Text>
            </View>
          ))} 
        
          </View></ScrollView>
      </Modal></View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "transparent",
      height:'20%',
      width:'20%',
      justifyContent: "center",
      alignItems: "center",
    },
    whiteBox: {
      width: '100%',
      backgroundColor: "white",
      borderRadius: 4,
      elevation: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    actionButton: {
      padding: 5,
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      marginRight: 8,
    },
    text: {
      fontSize: 26,
    },
  });