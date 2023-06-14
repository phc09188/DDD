import React, {useState, useEffect,useRef} from 'react';
import {Button,TextInput,View,StyleSheet,Platform,PermissionsAndroid,Text}from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { windowHeight,windowWidth } from '../../util/WH';
import Config from 'react-native-config';
import InfoModal from './InfoModal';
import NaverMapView, {Marker} from "react-native-nmap";
import {useSelector} from "react-redux";
import axios from 'axios';
import SearchModal from './SearchModal';

export default function LocationMap({navigation}){
  const address = useSelector((state) => state.user.address);
  const token=useSelector(state => state.user.accessToken);
  const [location, setLocation] = useState(undefined);
  const [info,setInfo]=useState(undefined);
  const[markerList,setMarkerList]=useState([]);
  const[infoList,setInfoList]=useState([]);
  const[modalVisible,setModalVisible]=useState([]);
  const[searchTerm, setSearchTerm]=useState('');
  const[searchResults,setSearchResults]=useState(undefined);
  const[position,setPosition]=useState("");
  const[region,setRegion]=useState(undefined);
  const[searchModal,setSearchModal]=useState(false);

  const search= async()=>{
    try{
      const { data } = await axios.get('https://openapi.naver.com/v1/search/local', {
        params: { query: searchTerm+region },
        headers: {
          'X-Naver-Client-Id': Config.NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': Config.NAVER_CLIENT_SECRET
        },
      });
    getLatLngFromAddress(data.items[0].address)
    .then(({ lat, lng }) => {
      setPosition([lat,lng]);
      return [lat,lng];
  })
  .then(pos =>{
    //[["title", "<b>파리바게뜨</b> 용인서천마을점"], ["link", ""], ["category", "카페,디저트>베이커리"], ["description", ""], ["telephone", ""], ["address", " 
    // 경기도 용인시 기흥구 서천동 813"], ["roadAddress", "경기도 용인시 기흥구 서천로 121"], ["mapx", "317925"], ["mapy", "515459"]]
    if(true){
    setSearchResults(JSON.stringify(data.items[0]));
  }
  })    
    } catch (error) {
      console.error(error);
    }
    
  
  }

  async function getAreaFromLatLng(latitude, longitude) {
    const apiKey = Config.API_PLACES_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}&language=ko`
    );
    const data = await response.json();
    if (data.status === 'OK') {
      const addressArr = data.results[1].formatted_address.split(' ',);
      const area=' '+addressArr[2]+' '+addressArr[3];
      if (area) {
        return area;
      } else {
        throw new Error('Area not found');
      }
    } else {
      throw new Error('Reverse geocoding failed');
    }
  }

async function requestPermissions() {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  }
  useEffect(() => {
    requestPermissions().then(function(){
      if ("granted" === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            if (location==undefined){
            setLocation({
              latitude,
              longitude,
            });}
          },
          error => {
            console.log("오류");
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
        //이미 넣어둔 음식 정보를 위도, 경도 이용하여 가져오기
        if (location!=undefined){
        fetch(address+"/diary/search/near-loc?lat="+location.latitude+"&lnt="+location.longitude, {  
          method: "GET",
          headers : {
            Authorization: "Bearer "+token
            }
                }).then(response => response.json()).then(response => {
                  if(response){
                  console.log(response)//{"diaryId": 1, "fileUrl": "/Users/chandle/f-Dairy-Server/src/main/resources/static/diaryImage/testImage.jpg", "foods": [{"calories": "81.82", "dan": "1.73", "foodId": 1, "ji": "2.27", "na": "283.49", "name": "라면", "tan": "13.65", "weight": "550.0"}], "lat": null, "lnt": null, "mealTime": "Breakfast", "memberId": null, "writeDate": "2023-05-05"}
                  if(info==undefined){
                  setInfo(response)}
                  if(info){
                    let markers=new Array();
                    let infoModals=new Array();  
                    let tempVisible=new Array();
                    info.forEach(function(element){
                    if(element.lat){
                    markers.push([element.lat,element.lnt])
                    infoModals.push(element)
                    tempVisible.push(false);
                  }
                   })
                  setInfoList(infoModals)
                  setMarkerList(markers) 
                  setModalVisible(tempVisible);
                }
        }
      })
    }}
  }).then(function(){
    if(location!=undefined && region===undefined){
    getAreaFromLatLng(location.latitude, location.longitude)
    .then(area => {
    console.log('지역명:', area);
    setRegion(area);
    })
    .catch(error => {
    console.error('에러:', error);
    });
    }
  })
  }, [location,info,position,searchResults]);


  function findIndex(arr, target) {
    return arr.findIndex(subArray =>
      subArray.every((value, index) => value === target[index])
    );
  }

  const modalOpen = (lat,lnt) => {
    let idx=findIndex(markerList,[lat,lnt]);
    if(idx!=-1&&(markerList.length===modalVisible.length)){
    let newModal=[...modalVisible]//구조분해한 다음 해당하는 idx만 true로 바꿔준다.
    newModal[idx]=true;
    setModalVisible(newModal); // visible = true
  }}

  function getClickHandler(seq){
    return function(e){

    }

  }

  async function getLatLngFromAddress(address) {
    const apiKey = Config.API_PLACES_KEY;
  
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );
    const data = await response.json();
  
    if (data.status === 'OK') {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      throw new Error('Geocoding failed');
    }
  }

  return (
    <View
  style={{
    width: windowWidth,
    height: windowHeight,
    marginTop: 10,
  }}
>
  <TextInput value={searchTerm} onChangeText={setSearchTerm} style={{height:40,borderColor:'gray',borderWidth:1}}
  placeholder='지역 검색'/>
  <Button title='Search' onPress={search}/>
{location && (
  <NaverMapView
    style={{ width: "100%", height: "100%" }}
    zoomControl={false}
    center={{
      zoom: 15,
      tilt: 50,
      latitude: location.latitude,
      longitude: location.longitude,
    }}
  >
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      pinColor="blue"
    />
    {markerList.map((marker,index) => 
        <Marker
          key={marker}
          coordinate={{
            latitude: marker[0],
            longitude: marker[1],
          }}
          onClick={() => {
            console.log(marker);
            modalOpen(marker[0],marker[1]);
          }}
        />        
      )}

      {(modalVisible.length===markerList.length) && (markerList.map((marker, index) => (
         <InfoModal
          key={index}
          visible={modalVisible[index]} 
          onClose={() => {
            var newModal=[...modalVisible]
            if(index<newModal.length)
              newModal[index]=false;
            setModalVisible(newModal); 
          }}
          location={marker}
          info={JSON.stringify(infoList[index])}
          />
          )) )}

          {searchResults && (
          <Marker
            coordinate={{ latitude: position[0], longitude: position[1]}}
            caption={{ text: searchTerm }} //position을 주소로부터 가져오고, 검색어에 현재 지역을 붙인다.
            onClick={() => {
            setSearchModal(true);
          }}
          pinColor="red"
          />
       )}
       {
      <SearchModal
      animationType="slide"
      visible={searchModal} 
      onClose={() => setSearchModal(false)}
      info={searchResults}
       />
       }  

  </NaverMapView>)}
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9DD84B",
    alignItems: "center",
    justifyContent: "center",
  },
  infoWindow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: 100,
    backgroundColor: 'white',
    padding: 10,
  },
}
)