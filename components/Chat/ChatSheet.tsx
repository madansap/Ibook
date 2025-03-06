import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Animated, 
  PanResponder,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { MessageProps } from './Message';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import DragHandle from './DragHandle';

const { height } = Dimensions.get('window');
const SHEET_MAX_HEIGHT = height * 0.9;
const DRAG_THRESHOLD = 50;

interface ChatSheetProps {
  onClose: () => void;
  bookTitle?: string;
}

const ChatSheet: React.FC<ChatSheetProps> = ({ onClose, bookTitle = 'Beginning of Infinity' }) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      id: '1',
      text: 'The Scientific Revolution began in the 16th and 17th centuries, marking a major shift in human thought. It was characterized by the use of observation, experimentation, and the scientific method to understand the natural world, replacing reliance on tradition and religious explanations. Key figures like Copernicus, Galileo, and Newton revolutionized fields such as astronomy, physics, and biology. This period laid the foundation for modern science, technology, and rational inquiry.\n\nThe revolution is still ongoing as scientific advancements continue to transform our understanding of the universe and drive innovation, shaping society in profound ways.',
      isUser: false,
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  
  // Animation for the sheet
  const translateY = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  
  // Pan responder for drag gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        lastGestureDy.current = 0;
      },
      onPanResponderMove: (_, gestureState) => {
        const { dy } = gestureState;
        if (dy > 0) { // Only allow dragging down
          translateY.setValue(dy);
          lastGestureDy.current = dy;
        }
      },
      onPanResponderRelease: () => {
        if (lastGestureDy.current > DRAG_THRESHOLD) {
          // If dragged down past threshold, close the sheet
          Animated.timing(translateY, {
            toValue: SHEET_MAX_HEIGHT,
            duration: 250,
            useNativeDriver: true,
          }).start(onClose);
        } else {
          // Otherwise, snap back to original position
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 4,
          }).start();
        }
      },
    })
  ).current;

  // Animation when sheet appears
  useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  }, []);

  const handleSend = (text: string) => {
    // Add user message
    const newMessage: MessageProps = {
      id: Date.now().toString(),
      text,
      isUser: true,
    };
    
    setMessages([...messages, newMessage]);
    
    // Simulate AI thinking
    setIsThinking(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      setIsThinking(false);
      const aiResponse: MessageProps = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I don't have enough information to answer that question specifically.",
        isUser: false,
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);
  };

  return (
    <View style={styles.overlay}>
      <Animated.View 
        style={[
          styles.sheetContainer, 
          { transform: [{ translateY }] }
        ]}
      >
        <SafeAreaView style={styles.safeArea}>
          <DragHandle panHandlers={panResponder.panHandlers} />
          <ChatHeader title={`Chat:${bookTitle}`} onClose={onClose} />
          <MessageList messages={messages} isThinking={isThinking} />
          <ChatInput onSend={handleSend} />
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 100,
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#F2F2F7',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: SHEET_MAX_HEIGHT,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  safeArea: {
    flex: 1,
  },
});

export default ChatSheet; 