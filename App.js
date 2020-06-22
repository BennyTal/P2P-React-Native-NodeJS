/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, View, Text, ToastAndroid} from 'react-native';

import BtnUploadFile from './BtnUploadFile.js';
import BtnChooseFile from './BtnChooseFile.js';
import TxtFilePreview from './TxtFilePreview.js';

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

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, textAlign: 'center'}}>Hello Benny</Text>
      <BtnUploadFile file={file} />
      <BtnChooseFile setFile={setFile} />
      <TxtFilePreview file={file} />
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
});
