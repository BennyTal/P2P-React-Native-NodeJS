import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function TxtFilePreview(props) {
  return (
    <>
      {props.file != null ? (
        <Text style={styles.textStyle}>
          File Name: {props.file.name ? props.file.name : ''}
          {'\n'}
          Type: {props.file.type ? props.file.type : ''}
          {'\n'}
          File Size: {props.file.size ? props.file.size : ''}
          {'\n'}
          URI: {props.file.uri ? props.file.uri : ''}
          {'\n'}
        </Text>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    // backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'left',
  },
});
