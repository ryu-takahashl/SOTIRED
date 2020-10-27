import * as React from 'react';
import { StyleSheet } from 'react-native';

import TabOne from 'app/components/TabOne';
import { View } from 'app/components/Themed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <TabOne />
    </View>
  );
}
