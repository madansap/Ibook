import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DailyLesson = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Daily Lesson</Text>
      
      <TouchableOpacity style={styles.lessonCard}>
        <View style={styles.lessonHeader}>
          <Text style={styles.lessonTag}>Beginning of Infinity</Text>
        </View>
        
        <Text style={styles.lessonContent}>
          Knowledge is Infinite, Human progress comes from the creation of explanatory knowledge, which has no inherent limits, enabling endless advancements in science, culture, and technology.
        </Text>
        
        <Text style={styles.readMoreText}>Tap to read more</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  lessonCard: {
    backgroundColor: '#FFCC80',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  lessonHeader: {
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  lessonTag: {
    fontSize: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    color: '#000',
    fontWeight: '500',
  },
  lessonContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
    color: '#000',
    fontWeight: '400',
  },
  readMoreText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    alignSelf: 'flex-start',
  },
});

export default DailyLesson; 