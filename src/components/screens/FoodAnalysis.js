import React,{useEffect,useState} from "react";
import { View, Pressable,Text, TextInput, Platform,StyleSheet,PermissionsAndroid } from "react-native";
import CameraView from "./CameraView";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import {decode} from "base-64";
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import RNFetchBlob from "rn-fetch-blob";
import Config from "react-native-config";
import DietInfo from "../DietInfo";
import {useSelector,useDispatch} from "react-redux";

const imagePickerOption = {
	mediaType: "photo",
	maxWidth: 800,
	maxHeight: 800,
	includeBase64: Platform.OS === "android",
};

export default function FoodAnalysis({navigation, route}) {
  const address = useSelector((state) => state.user.address);
  const token=useSelector(state => state.user.accessToken);
  const [info, setInfo] = useState(undefined);
  const [location, setLocation] = useState(undefined);

  useEffect(()=>{
    requestPermissions();
    setInfo(route.params.diet);
    console.log(info,"info");
    },[location,info]);

  //사진 찍는 버튼, 갤러리에서 가져오는 버튼, 이미지 전송 버튼 적용
  const onPickImage = (res) => { 
    if (res.didCancel || !res) {
      return;
    }
     //res에 있는 이미지정보를 post해서 음식 정보를 받아온다.
  
     const imgBase64 = res.assets[0].base64
     const decodImg = decode(imgBase64);
    
                              //정보 넣은 다음 리렌더링
        RNFetchBlob.fetch('POST', Config.DIET_API_ADDRESS, {
        'x-api-key':Config.DIET_API_KEY,  
        'Content-Type': 'multipart/form-data',}, [
       { name: 'image', filename: "image.jpg", data: RNFetchBlob.base64.encode(decodImg) },
          ]).then((res) => {
                   //name, calories, weight, tan, dan, ji, na
                //음식 이름과 1회 제공량에 대한 그램 수, 100g당 열량, 탄수화물, 단백질, 지방, 나트륨 정보
      //  const test0={"array": "aaa", "base64":"aaa", "blob": "aaa", "data": "{\"version\":\"1.0.6\",\"request_id\":\"dfdc17eb-2408-4270-ba84-e25e03011a74\",\"created\":\"2023-05-18T22:17:31.313419+09:00\",\"proc_secs\":0.2077,\"result\":[{\"x\":57,\"y\":53,\"w\":678,\"h\":672,\"class_info\":[{\"rank\":1,\"food_name\":\"라면\",\"prob\":0.8716,\"food_nutrients\":{\"1회제공량당_영양성분\":{\"1회제공량(g/ml)\":\"550.0\",\"단위(g/ml)\":\"g\",\"열량(kcal)\":\"450.0\",\"탄수화물\":{\"총량(g)\":\"75.1\",\"당류(g)\":\"0\",\"식이섬유(g)\":\"5.5\"},\"단백질(g)\":\"9.5\",\"지방\":{\"총량(g)\":\"12.5\",\"트랜스지방(g)\":\"0\",\"포화지방(g)\":\"4.5\"},\"콜레스테롤(mg)\":\"0\",\"나트륨(mg)\":\"1559.21\"},\"100g당_영양성분\":{\"열량(kcal)\":\"81.82\",\"탄수화물\":{\"총량(g)\":\"13.65\",\"당류(g)\":\"0.0\",\"식이섬유(g)\":\"1.0\"},\"단백질(g)\":\"1.73\",\"지방\":{\"총량(g)\":\"2.27\",\"트랜스지방(g)\":\"0.0\",\"포화지방(g)\":\"0.82\"},\"콜레스테롤(mg)\":\"0.0\",\"나트륨(mg)\":\"283.49\"}}},{\"rank\":2,\"food_name\":\"컵라면\",\"prob\":0.1224,\"food_nutrients\":{\"1회제공량당_영양성분\":{\"1회제공량(g/ml)\":\"80.0\",\"단위(g/ml)\":\"g\",\"열량(kcal)\":\"306.0\",\"탄수화물\":{\"총량(g)\":\"44.54\",\"당류(g)\":\"1.75\",\"식이섬유(g)\":\"-\"},\"단백질(g)\":\"4.35\",\"지방\":{\"총량(g)\":\"12.22\",\"트랜스지방(g)\":\"0\",\"포화지방(g)\":\"0\"},\"콜레스테롤(mg)\":\"0\",\"나트륨(mg)\":\"803.84\"},\"100g당_영양성분\":{\"열량(kcal)\":\"382.5\",\"탄수화물\":{\"총량(g)\":\"55.68\",\"당류(g)\":\"2.19\",\"식이섬유(g)\":\"-\"},\"단백질(g)\":\"5.44\",\"지방\":{\"총량(g)\":\"15.28\",\"트랜스지방(g)\":\"0.0\",\"포화지방(g)\":\"0.0\"},\"콜레스테롤(mg)\":\"0.0\",\"나트륨(mg)\":\"1004.8\"}}},{\"rank\":3,\"food_name\":\"볶음라면\",\"prob\":0.0029,\"food_nutrients\":{\"1회제공량당_영양성분\":{\"1회제공량(g/ml)\":\"100.0\",\"단위(g/ml)\":\"g\",\"열량(kcal)\":\"202.0\",\"탄수화물\":{\"총량(g)\":\"33.9\",\"당류(g)\":\"3.28\",\"식이섬유(g)\":\"-\"},\"단백질(g)\":\"4.52\",\"지방\":{\"총량(g)\":\"5.39\",\"트랜스지방(g)\":\"0.03\",\"포화지방(g)\":\"2.26\"},\"콜레스테롤(mg)\":\"0\",\"나트륨(mg)\":\"435\"},\"100g당_영양성분\":{\"열량(kcal)\":\"202.0\",\"탄수화물\":{\"총량(g)\":\"33.9\",\"당류(g)\":\"3.28\",\"식이섬유(g)\":\"-\"},\"단백질(g)\":\"4.52\",\"지방\":{\"총량(g)\":\"5.39\",\"트랜스지방(g)\":\"0.03\",\"포화지방(g)\":\"2.26\"},\"콜레스테롤(mg)\":\"0.0\",\"나트륨(mg)\":\"435.0\"}}},{\"rank\":4,\"food_name\":\"비빔국수\",\"prob\":0.0004,\"food_nutrients\":{\"1회제공량당_영양성분\":{\"1회제공량(g/ml)\":\"500.0\",\"단위(g/ml)\":\"g\",\"열량(kcal)\":\"512.0\",\"탄수화물\":{\"총량(g)\":\"102.4\",\"당류(g)\":\"20.5\",\"식이섬유(g)\":\"0\"},\"단백질(g)\":\"15.1\",\"지방\":{\"총량(g)\":\"4.8\",\"트랜스지방(g)\":\"0\",\"포화지방(g)\":\"1\"},\"콜레스테롤(mg)\":\"5.03\",\" 나트륨(mg)\":\"1193.79\"},\"100g당_영양성분\":{\"열량(kcal)\":\"102.4\",\"탄수화물\":{\"총량(g)\":\"20.48\",\"당류(g)\":\"4.1\",\"식이섬유(g)\":\"0.0\"},\"단백질(g)\":\"3.02\",\"지방\":{\"총량(g)\":\"0.96\",\"트랜스지방(g)\":\"0.0\",\"포화지방(g)\":\"0.2\"},\"콜레스테롤(mg)\":\"1.01\",\"나트륨(mg)\":\"238.76\"}}},{\"rank\":5,\"food_name\":\"미역국라면\",\"prob\":0.0004,\"food_nutrients\":{\"1회제공량당_영양성분\":{\"1회제공량(g/ml)\":\"115.0\",\"단위(g/ml)\":\"g\",\"열량(kcal)\":\"445.0\",\"탄수화물\":{\"총량(g)\":\"65\",\"당류(g)\":\"2\",\"식이섬유(g)\":\"0\"},\"단백질(g)\":\"12.0\",\"지방\":{\"총량(g)\":\"15.0\",\"트랜스지방(g)\":\"0\",\"포화지방(g)\":\"8\"},\"콜레스테롤(mg)\":\"5\",\"나트륨(mg)\":\"1800\"},\"100g당_영양성분\":{\"열량(kcal)\":\"386.96\",\"탄수화물\":{\"총량(g)\":\"56.52\",\"당류(g)\":\"1.74\",\"식이섬유(g)\":\"0.0\"},\"단백질(g)\":\"10.43\",\"지방\":{\"총량(g)\":\"13.04\",\"트랜스지방(g)\":\"0.0\",\"포화지방(g)\":\"6.96\"},\"콜레스테롤(mg)\":\"4.35\",\"나트륨(mg)\":\"1565.22\"}}}]}]}", "flush": "aaa", "info": "aaa", "json": "aaa", "path": "aaa", "readFile": "aaa", "readStream": "aaa", "respInfo": {"headers": {"content-type": "application/json", "date": "Thu, 18 May 2023 13:17:31 GMT", "strict-transport-security": "max-age=31536000; includeSubDomains", "vary": "Accept-Encoding", "x-content-type-options": "nosniff", "x-envoy-upstream-service-time": "238", "x-frame-options": "sameorigin", "x-metering-count": "1", "x-usageplan-remaining": "59", "x-usageplan-reset": "1h42m28.991159042s", "x-usageplan-type": "custom", "x-xss-protection": "1; mode=block"}, "redirects": ["https://a0c1627b-e6fc-4c58-b90b-e140405b5f04.api.kr-central-1.kakaoi.io/ai/vision/d5baf3de15c64488ad2421fbf7ab14f6"], "respType": "json", "rnfbEncode": "utf8", "state": "2", "status": 200, "taskId": "r68x1b4vl4lcqumjdn650a", "timeout": false}, "session": "aaa", "taskId": "r68x1b4vl4lcqumjdn650a", "text": "aaa", "type": "utf8"};
                  data0=JSON.parse(res.data);
                  const diets=[];
                  data0.result.forEach( result => {
                    console.log(result,"result 테스트");
                    if( '100g당_영양성분' in result.class_info[0].food_nutrients ){
                      var nut = '100g당_영양성분';
                    }
                    else{
                      var nut = '100ml당_영양성분';
                    }

                    if(!diets.some(diet => diet.name === result.class_info[0].food_name))
                    {diets.push({"name" : result.class_info[0].food_name,
                     "calories" : result.class_info[0].food_nutrients[nut]["열량(kcal)"],
                    "weight" : result.class_info[0].food_nutrients["1회제공량당_영양성분"]["1회제공량(g/ml)"],
                     "tan" : result.class_info[0].food_nutrients[nut]["탄수화물"]["총량(g)"],
                     "dan" : result.class_info[0].food_nutrients[nut]["단백질(g)"],
                     "ji": result.class_info[0].food_nutrients[nut]["지방"]["총량(g)"],
                      "na" : result.class_info[0].food_nutrients[nut]["나트륨(mg)"]
                   })}

                  });
                  //result의 length만큼 음식의 개수, result를 순회하며 음식 분석 result[i]
                  
                  let file_name="image.jpg"
 
                  fetch(address+"/diary/write", {  
                    method: "POST",
                    headers : {
                      'Content-Type': 'application/json',
                      Authorization: "Bearer "+token
                      },
                      body: JSON.stringify({
                        'writeDate': route.params.date,
                        'lat': location.latitude,
                        'lnt': location.longitude,
                        'mealTime': route.params.mealTime,
                        'foods': diets,
                      }),
                          }).then(response => response.json()).then(response => {
                            if(response){
                              RNFetchBlob.fetch('POST', address+"/diary/image/upload?diaryId="+response, {//서버측으로 정보를 보낸다.  
                                'Content-Type': 'multipart/form-data',
                                 Authorization: "Bearer "+token
                              }, [
                                {name: 'diaryImage', filename: file_name, data: RNFetchBlob.base64.encode(decodImg) },
                                  ]).then((res) => {})
                             }
                          }).then(function(){
                          setModalVisible(false);
                          let present=route.params.date;
                          console.log(present,"확인용");
                          navigation.navigate("CalendarView"); //
                          })
                    })
          .catch((err) => {
              console.log(err, "에러");
          })
  } 

  // 카메라 촬영
  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };
  
  // 갤러리에서 사진 선택
  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  // 안드로이드를 위한 모달 visible 상태값
  const [modalVisible, setModalVisible] = useState(false);
  
  // 선택 모달 오픈
  const modalOpen = () => {
      setModalVisible(true); // visible = true
    }

    async function requestPermissions() {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if ("granted" === PermissionsAndroid.RESULTS.GRANTED && !location) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;

            if(location==undefined){setLocation({
              latitude,
              longitude,
            });}
          },
          error => {
            console.log("오류");
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    }
  //내용이 비어있다면 버튼 가져오고, 들어있다면 그 내용을 보여준다.

  if(info){
    return (//식단 정보를 보여준다.
      <View>
        <DietInfo diet = {route.params.diet}></DietInfo>
      </View>
    );
  }
  else if(info !=undefined){
    return (
      <View  style={styles.background}>
        <View>
          <View style={styles.whiteBox}>
            <Pressable
              style={styles.actionButton}
              android_ripple={{color: "#eee"}}
              onPress={() => {
                modalOpen();
              }} >
              <Text style={styles.actionText}>이미지 가져오기</Text>
            </Pressable>
            <Pressable
              style={styles.actionButton}
              android_ripple={{color: "#eee"}}
              onPress={() => {
               navigation.navigate("CalendarView");
              }} >
              <Text style={styles.actionText}>돌아가기</Text>
            </Pressable>
          </View>
        </View>
        <CameraView
          visible={modalVisible} 
          onClose={() => setModalVisible(false)}
          onLaunchCamera={onLaunchCamera}
          onLaunchImageLibrary={onLaunchImageLibrary} />
          <TextInput type></TextInput>
      </View>
    );
  }
}

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
});