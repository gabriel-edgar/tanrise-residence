import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const IOSLikeAlert = ({ visible= false, title ="", message="", onCancel=()=>{}, onConfirm=()=>{} }) => (
  <Modal transparent visible={visible} animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.alertBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onCancel} style={styles.button}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onConfirm} style={styles.button}>
            <Text style={styles.confirmText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

// setAlertOptions(prev => ({
//   ...prev,
//   title: 'Warning',
//   message: 'This will delete your data.',
// }));

// const [alertOptions, setAlertOptions] = useState({
//   visible: false,
//   title: '',
//   message: '',
// });


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: 270,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontWeight: '600',
    fontSize: 17,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  cancelText: {
    color: '#007aff',
    fontSize: 16,
  },
  confirmText: {
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
  },
});

//
// import IOSAlert from 'react-native-ios-alert';

// IOSAlert.show({
//   title: 'iOS Style Alert',
//   message: 'This is an iOS-like alert on Android!',
//   buttons: [
//     {
//       text: 'Cancel',
//       onPress: () => console.log('Cancel Pressed'),
//       style: 'cancel',
//     },
//     {
//       text: 'OK',
//       onPress: () => console.log('OK Pressed'),
//     },
//   ],
// });
