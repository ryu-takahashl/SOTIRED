import React from 'react';
import {
  Alert, Image, ScrollView,
} from 'react-native';
import Animating from 'app/components/Animating';
import Camera from 'app/functions/Camera';
import CloudTranslation from 'app/functions/CloudTranslation';
import CloudVision from 'app/functions/CloudVision';
import Firebase from 'app/functions/Firebase';
import Library from 'app/functions/Library';
import { LinearGradient } from 'expo-linear-gradient';
import Manipulator from 'app/functions/Manipulator';
import style from 'app/style_sheet/Style';
import { Text, TouchableOpacity, View } from 'app/components/Themed';

export default function TabOne() {
  const [animating, setAnimating] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [saved, setSaved] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [text, setText] = React.useState(null);

  const gradientColorOne = ['#e96443', '#904e95'];
  const gradientColorTwo = ['#a770ef', '#cf8bf3', '#fdb99b'];
  const gradientStart = { x: 0.0, y: 1.0 };
  const gradientEnd = { x: 1.0, y: 1.0 };

  // テキスト検出＆翻訳
  const translate = async (result) => {
    const img = await Manipulator(result);
    setImage(img.uri);
    if (text) {
      setText(null);
    }
    setAnimating(true);
    setSaved(false);
    CloudVision(img)
      .then((response) => {
        if (response) {
          CloudTranslation(response, setAnimating)
            .then((translated) => {
              setText(translated);
              setAnimating(false);
            })
            .catch(() => {
              Alert.alert('翻訳に失敗しました。');
              setAnimating(false);
            });
        }
      })
      .catch(() => {
        Alert.alert('画像内のテキストを検出できませんでした。');
        setAnimating(false);
      });
  };

  // カメラ
  const onCameraPress = async () => {
    const result = await Camera();
    if (!result.cancelled && !result.denied) {
      translate(result);
    } else if (result.denied) {
      Alert.alert('iOSの設定でカメラへのアクセスを許可してください。');
    }
  };

  // アルバム
  const onLibraryPress = async () => {
    const result = await Library();
    if (!result.cancelled && !result.denied) {
      translate(result);
    } else if (result.denied) {
      Alert.alert('iOSの設定で写真へのアクセスを許可してください。');
    }
  };

  // クリア
  function onClearPress() {
    setImage(null);
    setText(null);
    setAnimating(false);
    setSaved(false);
  }

  // 保存
  const onSavePress = async () => {
    setSaving(true);
    // 画像のパス
    const remoteUri = await Firebase.uploadFile(image);
    const result = await Firebase.addItem(remoteUri, text);
    if (result.error) {
      Alert.alert(result.error);
    } else {
      setSaving(false);
      setSaved(true);
    }
  };

  return (
    <View>
      { /** 写真 * */ }
      <View style={style.getStartedContainer}>
        <View style={style.image}>
          {image ? (
            <Image
              resizeMode="cover"
              source={{ uri: image }}
              style={{ width: '100%', height: '100%', alignSelf: 'center' }}
            />
          ) : (
            <Image
              resizeMode="cover"
              source={require('app/assets/images/camera.png')}
              style={{ width: '50%', height: '50%', alignSelf: 'center' }}
            />
          )}
        </View>
        <View style={style.btnarea}>
          <LinearGradient
            colors={gradientColorOne}
            start={gradientStart}
            end={gradientEnd}
            style={style.grediant}
          >
            <TouchableOpacity
              lightColor="white"
              darkColor="black"
              onPress={() => onCameraPress()}
              style={style.btn}
            >
              <Text
                lightColor="black"
                darkColor="white"
                style={style.text}
              >
                写真を撮る
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            style={style.grediant_right}
            colors={gradientColorOne}
            start={gradientStart}
            end={gradientEnd}
          >
            <TouchableOpacity
              onPress={() => onLibraryPress()}
              style={style.btn}
            >
              <Text
                lightColor="black"
                darkColor="white"
                style={style.text}
              >
                アルバムから選ぶ
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
      { /** セパレート * */ }
      <View>
        <View style={style.separator} lightColor="black" darkColor="white" />
      </View>
      { /** テキスト * */ }
      <View style={style.getStartedContainer}>
        { /** デフォルトテキスト or ローディング or 翻訳後のテキスト * */ }
        {text ? (
          <ScrollView>
            <Text style={style.getStartedText}>{text}</Text>
          </ScrollView>
        )
          : animating ? (
            <View>
              <Animating animating={animating} />
              <Text
                lightColor="rgba(0,0,0,0.8)"
                darkColor="white"
                style={style.translating}
              >
                翻訳中
              </Text>
            </View>
          ) : (
            <Image
              resizeMode="cover"
              source={require('app/assets/images/text.png')}
              style={{ width: '50%', height: '50%', alignSelf: 'center' }}
            />
          )}
        { /** 翻訳できたら表示 * */ }
        {(text && !saving) ? (
          <View style={style.btnarea}>
            <LinearGradient
              colors={gradientColorTwo}
              start={gradientStart}
              end={gradientEnd}
              style={style.grediant}
            >
              <TouchableOpacity
                onPress={() => onClearPress()}
                style={style.btn}
              >
                <Text
                  lightColor="black"
                  darkColor="white"
                  style={style.text}
                >
                  クリア
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            { /** 保存前 or 保存後 * */ }
            {!saved ? (
              <LinearGradient
                style={style.grediant_right}
                colors={gradientColorTwo}
                start={gradientStart}
                end={gradientEnd}
              >
                <TouchableOpacity
                  onPress={() => onSavePress()}
                  style={style.btn}
                >
                  <Text
                    lightColor="black"
                    darkColor="white"
                    style={style.text}
                  >
                    保存する
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            ) : (
              <LinearGradient
                style={style.grediant_right}
                colors={gradientColorTwo}
                start={gradientStart}
                end={gradientEnd}
              >
                <View
                  style={style.btn}
                >
                  <Text
                    lightColor="black"
                    darkColor="white"
                    style={style.text}
                  >
                    Saved!
                  </Text>
                </View>
              </LinearGradient>
            )}
          </View>
        ) : (
          <View style={style.btnarea}>
            <Animating animating={saving} />
          </View>
        )}
      </View>
    </View>
  );
}
