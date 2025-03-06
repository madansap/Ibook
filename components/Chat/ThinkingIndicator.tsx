import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sun } from 'phosphor-react-native';

const ThinkingIndicator: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.aiIconContainer}>
        <Sun size={20} color="#FFF" weight="fill" />
      </View>
      <View style={styles.thinkingBubble}>
        <Text style={styles.thinkingText}>Thinking...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '85%',
    alignSelf: 'flex-start',
  },
  aiIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 4,
  },
  thinkingBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderTopLeftRadius: 4,
    padding: 12,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#E5E5EA',
  },
  thinkingText: {
    fontSize: 15,
    color: '#8E8E93',
    fontStyle: 'italic',
  },
});

export default ThinkingIndicator; 