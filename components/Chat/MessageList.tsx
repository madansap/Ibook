import React, { useRef, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Platform } from 'react-native';
import Message, { MessageProps } from './Message';
import ThinkingIndicator from './ThinkingIndicator';

interface MessageListProps {
  messages: MessageProps[];
  isThinking: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isThinking }) => {
  const scrollViewRef = useRef<ScrollView>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isThinking]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {messages.length === 0 && !isThinking && (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>
              Ask a question about the book to get started.
            </Text>
          </View>
        )}
        
        {messages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            text={message.text}
            isUser={message.isUser}
          />
        ))}
        
        {isThinking && <ThinkingIndicator />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  emptyStateContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 149, 0, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 149, 0, 0.2)',
    marginVertical: 20,
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
  emptyStateText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default MessageList; 