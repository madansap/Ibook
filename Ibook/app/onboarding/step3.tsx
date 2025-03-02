import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Step3 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>🎯</Text>
        </View>
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.title}>Personalized For You</Text>
        <Text style={styles.description}>
          Tell us about your reading preferences, and we'll recommend books tailored just for you. Set goals that match your lifestyle.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  imageContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 80,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    lineHeight: 24,
  },
});

export default Step3;

