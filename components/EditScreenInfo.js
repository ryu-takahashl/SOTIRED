import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import * as Permissions from 'expo-permissions';
import Select from 'app/screens/TabOne/Select';
import { Text, View } from 'app/components/Themed';
import { MonoText } from 'app/components/StyledText';
import Colors from 'app/constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});

export default function EditScreenInfo({ path }: { path: string }) {
  const [modal, setModal] = React.useState(false);
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Open up the code for this screen:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)"
        >
          <MonoText>{path}</MonoText>
        </View>
      </View>

      <View style={styles.helpContainer}>
        <TouchableOpacity
          onPress={() => setModal(true)}
          style={styles.helpLink}
        >
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            画像認識
          </Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={modal} swipeToClose>
        { /** 確認モーダル * */ }
        <Select setModal={setModal} />
      </Modal>
    </View>
  );
}
