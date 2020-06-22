import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

export default function BtnChooseFile(props) {
  async function filePicker() {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      props.setFile(doc);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      activeOpacity={0.5}
      onPress={() => {
        filePicker();
      }}>
      <Text style={styles.buttonTextStyle}>Choose File</Text>
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
