import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import TabBar from './TabBar';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {children}
      </View>
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
}); 