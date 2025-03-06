import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChatTab from '../../components/Chat/ChatTab';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <ChatTab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 