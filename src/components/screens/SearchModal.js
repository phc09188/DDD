import React,{useEffect,useState} from "react";
import { StyleSheet, Modal, View, Pressable, Text, Linking } from "react-native";


export default function SearchModal({visible, onClose, info}) {
  const [str, setStr] = useState(false);
  const [infoObj,setInfoObj]=useState(false);
  const [pageLink, setPageLink]=useState(false);

  let Hyperlink = () => {
      if(pageLink!=false && pageLink!=""){
        onClose();
        Linking.openURL(pageLink);
    }
    }

  useEffect(()=>{
    if(info){
      console.log("info",typeof(info),info);
      
      setStr(info.replace(/\\/g, "").replace(/<[^>]*>/g, "").replace(/>/g, ""));
      if(infoObj===false || infoObj.title != JSON.parse(str).title){
      setInfoObj(JSON.parse(str));
    }
    if(infoObj){
    setPageLink(infoObj.link);
  } 
      console.log("replace",infoObj,typeof(infoObj));
      
  }
    
  },[info,str,infoObj]);

  return (
    <View style={styles.container}>
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}>
          <View style={styles.whiteBox}>
            {infoObj&&
            <Text onPress={Hyperlink}>
            {infoObj.title+"\n"}
            {infoObj.address+"\n"}
            {infoObj.roadAddress+"\n"}
            홈페이지 : {infoObj.link+"\n"}
            전화번호 : {infoObj.telephone+"\n"}
            설명 : {infoObj.description+"\n"}
            </Text>
            }
          </View>
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
  });