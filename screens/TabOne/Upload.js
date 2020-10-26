import React from 'react';
import {
  Alert, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { ENV } from 'app/config/Env';
import axios from 'axios';
import Constant from 'app/config/Constant';

const { cloudTranslationApiKey, cloudVisonApiKey } = ENV;

const styles = StyleSheet.create({
  area_modal: {
    maxHeight: 330,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    position: 'relative',
  },
  wrap_modal: {
    marginTop: 20,
    marginBottom: 30,
  },
  modal_close: {
    position: 'absolute',
    top: -70,
    left: 15,
  },
  text: {
    alignItems: 'center',
    marginTop: 20,
    borderColor: '#F4F6FA',
  },
  ttl: {
    fontSize: 20,
    fontWeight: '800',
  },
  description: {
    marginTop: 20,
    lineHeight: 25,
    fontSize: 15,
    fontWeight: '300',
  },
  modalBackIcon: {
  },
  btnarea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  btn_ghost: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '49.5%',
    height: 45,
    borderColor: '#199991',
    borderWidth: 1,
  },
  btn_green: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#199991',
    borderRadius: 5,
    width: '49.5%',
    height: 45,
    borderColor: '#199991',
    borderWidth: 1,
    marginLeft: 5,
  },
  btn_gtxt: {
    color: '#199991',
  },
  btn_txt: {
    color: '#fff',
  },
  btn_txtsub: {
    marginTop: 30,
    lineHeight: 25,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    color: '#129991',
  },
});

export default function Upload(
  { setModal }: { setModal:boolean },
) {
  const sendCloudTranslation = async (description: string) => {
    axios.post(`${Constant.CLOUD_TRANSLATION_URL + cloudTranslationApiKey}&q=${encodeURI(description)}&target=ja`)
      .then((res) => res.data)
      .then((response) => {
        const { translatedText } = response.data.translations[0];
        Alert.alert(translatedText);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const sendCloudVision = async (image: string) => {
    const body = JSON.stringify({
      requests: [
        {
          features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
          image: {
            content: image.base64,
          },
        },
      ],
    });
    axios.post(Constant.CLOUD_VISION_URL + cloudVisonApiKey,
      body, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(async (response) => {
        const { data } = await response;
        const { description } = await data.responses[0].textAnnotations[0];
        sendCloudTranslation(description);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onCameraPress = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!result.cancelled) {
        const actions = [];
        actions.push({ resize: { height: 1024, width: 768 } });
        const manipulatorResult = await ImageManipulator.manipulateAsync(
          result.uri,
          actions,
          {
            compress: 0.4,
            base64: true,
          },
        );
        sendCloudVision(manipulatorResult);
      }
    }
  };

  return (
    <View style={styles.area_modal}>
      <View style={styles.wrap_modal}>
        <View style={styles.text}>
          <Text style={styles.ttl}>画像を選択</Text>
        </View>
        <View style={styles.btnarea}>
          <TouchableOpacity
            block
            style={styles.btn_ghost}
            onPress={() => onCameraPress()}
          >
            <Text style={styles.btn_gtxt}>写真を撮る</Text>
          </TouchableOpacity>
          <TouchableOpacity
            block
            style={styles.btn_green}

          >
            <Text style={styles.btn_txt}>アルバムから選ぶ</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          Style={styles.btnarea}
          onPress={() => setModal(false)}
        >
          <Text style={styles.btn_txtsub}>閉じる</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
