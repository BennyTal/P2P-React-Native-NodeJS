/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

export default function App() {
  const [file, setFile] = useState(null);

  function sendRequest() {
    fetch('http://l90m2.mocklab.io/json/1', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        ToastAndroid.show(json.value, ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.error(error);
      });
    ToastAndroid.show('request sent', ToastAndroid.SHORT);
  }

  function uploadImage() {
    //Check if any file is selected or not
    if (file != null) {
      //If file selected then create FormData
      const fileToUpload = file;
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

  async function filePicker() {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setFile(doc);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, textAlign: 'center'}}>Hello Benny</Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={() => {
          uploadImage();
        }}>
        <Text style={styles.buttonTextStyle}>Upload File</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={() => {
          filePicker();
        }}>
        <Text style={styles.buttonTextStyle}>Choose File</Text>
      </TouchableOpacity>
      {file != null ? (
        <Text style={styles.textStyle}>
          File Name: {file.name ? file.name : ''}
          {'\n'}
          Type: {file.type ? file.type : ''}
          {'\n'}
          File Size: {file.size ? file.size : ''}
          {'\n'}
          URI: {file.uri ? file.uri : ''}
          {'\n'}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  textStyle: {
    // backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'left',
  },
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
