import React from 'react';

import { Image, TouchableOpacity } from 'react-native';
import { Text, View } from 'app/components/Themed';

import style from 'app/style_sheet/Style';

import Camera from 'app/functions/Camera';
import CloudTranslation from 'app/functions/CloudTranslation';
import CloudVision from 'app/functions/CloudVision';
import Library from 'app/functions/Library';
import Manipulator from 'app/functions/Manipulator';

export default function TabOne() {
  const [image, setImage] = React.useState(null);
  const [text, setText] = React.useState(null);

  const translate = async (result) => {
    const img = await Manipulator(result);
    setImage(img.uri);
    CloudVision(img)
      .then((response) => {
        CloudTranslation(response)
          .then((translated) => {
            setText(translated);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // カメラ
  const onCameraPress = async () => {
    const result = await Camera();
    if (!result.cancelled) {
      translate(result);
    }
  };

  // アルバム
  const onLibraryPress = async () => {
    const result = await Library();
    if (!result.cancelled) {
      translate(result);
    }
  };

  // クリア
  function onClearPress() {
    setImage(null);
    setText(null);
  }

  return (
    <View>
      <View style={style.getStartedContainer}>
        <View style={style.image}>
          {image ? (
            <Image
              resizeMode="contain"
              style={{ width: '100%', height: '100%', alignSelf: 'center' }}
              source={{ uri: image }}
            />
          ) : (
            <Image
              source={require('app/assets/images/icon.png')}
            />
          )}
        </View>
        <View style={style.btnarea}>
          <TouchableOpacity
            onPress={() => onCameraPress()}
            style={style.btn_ghost}
          >
            <Text style={style.btn_gtxt}>写真を撮る</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onLibraryPress()}
            style={style.btn_green}
          >
            <Text style={style.btn_txt}>アルバムから選ぶ</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={style.getStartedContainer}>
        <View style={style.image}>
          {text ? (
            <Text>{text}</Text>
          ) : (
            <Text>翻訳されたテキストが表示されます。</Text>
          )}
        </View>
        <View style={style.btnarea}>
          <TouchableOpacity
            onPress={() => onClearPress()}
            style={style.btn_ghost}
          >
            <Text style={style.btn_gtxt}>やり直す</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.btn_green}
          >
            <Text style={style.btn_txt}>保存する</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}
