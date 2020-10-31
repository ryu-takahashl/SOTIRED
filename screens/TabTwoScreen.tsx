import * as React from 'react';
import { StyleSheet } from 'react-native';

import TabTwo from 'app/components/TabTwo';
import { View } from 'app/components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <TabTwo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  }
});
