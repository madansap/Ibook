import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Content from '@/components/Reading/content';

export default function ReadingContent() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Content />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
}); 