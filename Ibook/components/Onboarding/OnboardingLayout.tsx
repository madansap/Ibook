import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ 
  children, 
  backgroundColor = '#FFFFFF' 
}) => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});

export default OnboardingLayout;

