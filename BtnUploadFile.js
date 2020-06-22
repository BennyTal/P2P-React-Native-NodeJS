import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ToastAndroid} from 'react-native';
export default function BtnUploadFile(props) {
  function uploadImage() {
    //Check if any file is selected or not
    if (props.file != null) {
      //If file selected then create FormData
      const fileToUpload = props.file;
      const data = new FormData();
      data.append('name', 'Image Upload');
      data.append('file_attachment', fileToUpload);
      //Please change file upload URL

      fetch('http://l90m2.mocklab.io/json', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data;',
        },
      })
        .then((response) => {
          response.json().then((json) => {
            if (json.status === 1) {
              ToastAndroid.show('Upload Successful', ToastAndroid.SHORT);
            } else {
              ToastAndroid.show('Bad Request, try again', ToastAndroid.SHORT);
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
      // let res = fetch('http://l90m2.mocklab.io/json', {
      //   method: 'POST',
      //   body: data,
      //   headers: {
      //     'Content-Type': 'multipart/form-data;',
      //   },
      // });
      // let responseJson = res.json();
      // if (responseJson.status === 1) {
      //   ToastAndroid.show('Upload Successful', ToastAndroid.SHORT);
      // }
    } else {
      //if no file selected the show alert
      ToastAndroid.show('Please Select File first', ToastAndroid.SHORT);
    }
  }
  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      activeOpacity={0.5}
      onPress={() => {
        uploadImage();
      }}>
      <Text style={styles.buttonTextStyle}>Upload File</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
});
