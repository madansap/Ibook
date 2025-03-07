import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Sun, Copy, BookmarkSimple, DotsThree } from 'phosphor-react-native';

export interface MessageProps {
  id: string;
  text: string;
  isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ id, text, isUser }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isActionMenuVisible, setIsActionMenuVisible] = useState(false);

  const handleCopy = () => {
    // Clipboard.setString(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const toggleActionMenu = () => {
    setIsActionMenuVisible(!isActionMenuVisible);
  };

  return (
    <View style={[
      styles.messageBubbleContainer, 
      isUser ? styles.userMessageContainer : styles.aiMessageContainer
    ]}>
      {!isUser && (
        <View style={styles.aiIconContainer}>
          <Sun size={20} color="#FFF" weight="fill" />
        </View>
      )}
      <View style={[
        styles.messageBubble, 
        isUser ? styles.userMessage : styles.aiMessage
      ]}>
        <Text style={[
          styles.messageText, 
          isUser ? styles.userMessageText : styles.aiMessageText
        ]}>
          {text}
        </Text>
        
        {!isUser && (
          <View style={styles.messageActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Copy size={16} color="#8E8E93" weight="bold" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <BookmarkSimple size={16} color="#8E8E93" weight="bold" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <DotsThree size={16} color="#8E8E93" weight="bold" />
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  messageBubble: {
    borderRadius: 18,
    padding: 12,
    paddingVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  userMessage: {
    backgroundColor: '#007AFF',
    borderTopRightRadius: 4,
  },
  aiMessage: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 4,
    borderWidth: 1,
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
    borderRadius: 12,
  },
});

export default Message; 