import React, { useState, useEffect } from "react"; //--save --legacy-peer-deps
import {//npm run start-react
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image
} from "react-native";

import { windowWidth, windowHeight } from "../../util/WH";
import { setUser } from "../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
//import * as Google from "expo-auth-session/providers/google";
//import * as WebBrowser from "expo-web-browser";
import { GoogleSignin,GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';


//WebBrowser.maybeCompleteAuthSession();

export default function Login({navigation}) {
  const [google, setGoogle] = useState(false);
  const [token, setToken] = useState("");
  const [isEnter, setIsEnter] = useState(false);
  const [login, setLogin] = useState(false);

  const checkLoggedIn = () => {
    auth().onAuthStateChanged((user) => {
        if (user) {
            setLogin(true)
            let { uid, email, displayName, accessToken } = user;
            setUserState(uid, email, displayName, token, "google");
            setUserInfo(uid, displayName);
            if(isEnter){
            navigation.navigate("CalendarView");
          }   
        } else {
            setLogin(false)
        }
    }
    )
  }

  const dispatch = useDispatch();
  const address = useSelector((state) => state.user.address);
  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      webClientId:
        '1008555191749-0c8jv0pjcd0ss1bloh41afacc4ed86b8.apps.googleusercontent.com',
    })
  }
  const onGoogleButtonPress = async () => {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    //return auth().signInWithCredential(googleCredential);

       fetch(address+"/oauth2/google?id_token="+idToken, {
      method: "GET" 
          })
          .then(function (response) {
            if (response.ok) {
                //setToken("");
                const res_cookie=response.headers.map["set-cookie"];
                const end= res_cookie.indexOf(";")
                const refresh_token = res_cookie.slice(14,end);
                setToken(refresh_token);
                return auth().signInWithCredential(googleCredential);
            } else {
                console.log('오류');
            }
        })

}
  
  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   clientId: '12711112780-emgc8pm1tpl4gkrpt041akva9t1f4d2p.apps.googleusercontent.com',
  // });

  const openGoogleLogin = () => {
    //promptAsync();
  };
    

  useEffect(()=>{
    if(!google){
    googleSigninConfigure();
      setGoogle(true);
  }else{
    checkLoggedIn();
  }
  })
  // const auth = getAuth();
  // const user = auth.currentUser; //현재 접속한 사용자의 프로필 정보 가져올 수 있다.

  const setUserInfo = (uid, displayName) => {
    const updates = {};
    updates["/users/" + uid] = { displayName, uid};
  };

  const setUserState = (uid, email, displayName, accessToken, loginType) => {
    dispatch(
      setUser({
        uid,
        email,
        name: displayName,
        accessToken,
        isLogin: true,
        loginType,
      })
    );
  };

  //onAuthStateChanged

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
            <View style={styles.titleBox}>
              <Text style={styles.title}>Diet App</Text>
              <Image source = {require("../../../assets/logo.png")}/>
            </View>
            <View style={styles.inputBox}>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.googleLoginButton]}
                onPress={() => {
                  // openGoogleLogin();
                  setIsEnter(true);
                  onGoogleButtonPress();
                }}
              >
                <Text style={[styles.buttonText, styles.googleButtonText]}>
                  Google 계정으로 로그인
                </Text>
              </TouchableOpacity>
            </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9DD84B",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleBox: {
    width: windowWidth - 60,
    height: windowHeight / 3,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    marginBottom:200
  },
  title: {
    fontSize: 50,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  inputBox: {
    flex: 2,
    alignItems: "center",
  },
  loginInput: {
    width: windowWidth - 60,
    height: 50,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    color: "#9e9e9e",
  },
  loginText: {
    color: "#FFFFFF",
    width: windowWidth - 60,
    fontSize: 16,
    fontWeight: "bold",
  },
  warningContainer: {
    height: 20,
    marginBottom: 15,
    alightItems: "center",
    justifyContent: "center",
  },
  warningMsg: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: "#FFFFFF",
    width: windowWidth - 60,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  googleLoginButton: {
    backgroundColor: null,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  googleButtonText: {
    fontSize: 30,
    color: "#FFFFFF",
  },

  backgroundBlack: {
    backgroundColor: "#000000",
  },
});

//구글 관련
//프로젝트 ID: crack-producer-383708입니다.
// .../auth/userinfo.email	기본 Google 계정의 이메일 주소 확인
// .../auth/userinfo.profile	개인정보(공개로 설정한 개인정보 포함) 보기
// openid	Google에서 내 개인 정보를 나와 연결