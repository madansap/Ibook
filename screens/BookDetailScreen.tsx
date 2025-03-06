import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Title</Text>
      <Text style={styles.content}>This is a dummy content for the selected book. More details will be added later.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BookDetailScreen; 