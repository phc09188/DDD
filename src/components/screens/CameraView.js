import React from "react";
import { StyleSheet, Modal, View, Pressable, Text } from "react-native";

export default function CameraView({visible, onClose, onLaunchCamera, onLaunchImageLibrary}) {
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose} >
        <Pressable style={styles.background} onPress={onClose}>
          <View style={styles.whiteBox}>
            <Pressable
              style={styles.actionButton}
              android_ripple={{color: "#eee"}}
              onPress={() => {
                onLaunchCamera();
                onClose();
              }} >
              <Text style={styles.actionText}>카메라 촬영</Text>
            </Pressable>
            <Pressable
              style={styles.actionButton}
              android_ripple={{color: "#eee"}}
              onPress={() => {
                onLaunchImageLibrary();
                onClose();
              }} >
              <Text style={styles.actionText}>갤러리에서 선택</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    );
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
  });