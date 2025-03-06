import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Sun, Copy, Bookmark, DotsThree } from 'phosphor-react-native';

export interface MessageProps {
  id: string;
  text: string;
  isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ id, text, isUser }) => {
  return (
    <View style={[styles.messageBubbleContainer, isUser ? styles.userMessageContainer : styles.aiMessageContainer]}>
      {!isUser && (
        <View style={styles.aiIconContainer}>
          <Sun size={20} color="#FFF" weight="fill" />
        </View>
      )}
      <View style={[styles.messageBubble, isUser ? styles.userMessage : styles.aiMessage]}>
        <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.aiMessageText]}>
          {text}
        </Text>
        {!isUser && (
          <View style={styles.messageActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Copy size={18} color="#8E8E93" weight="bold" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Bookmark size={18} color="#8E8E93" weight="bold" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <DotsThree size={18} color="#8E8E93" weight="bold" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBubbleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '85%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  aiMessageContainer: {
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
  messageBubble: {
    borderRadius: 18,
    padding: 12,
    paddingVertical: 10,
  },
  userMessage: {
    backgroundColor: '#007AFF',
    borderTopRightRadius: 4,
  },
  aiMessage: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 4,
    borderWidth: 0.5,
    borderColor: '#E5E5EA',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#FFF',
  },
  aiMessageText: {
    color: '#000',
  },
  messageActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
});

export default Message; 