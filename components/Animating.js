import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Animating(
  { animating }: { animating:false },
) {
  return (
    <View style={{ marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator
        animating={animating}
        color="#C0C0C0"
        size="large"
      />
    </View>
  );
}
