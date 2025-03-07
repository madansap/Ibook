import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Animated, 
  PanResponder,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
  Text,
  ScrollView
} from 'react-native';
import { MessageProps } from './Message';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import DragHandle from './DragHandle';
import { X } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';

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
      text: 'The Beginning of Infinity by David Deutsch explores the nature of knowledge, its creation, and its limitless potential. Deutsch argues that human progress stems from our ability to create explanations and solve problems, which makes knowledge effectively infinite. He delves into topics like science, art, morality, and politics, showing how they contribute to this process of knowledge creation. The book emphasizes the power of error correction, open-ended inquiry, and creativity in driving progress, suggesting that humanity\'s future is boundless if we embrace the pursuit of knowledge.',
      isUser: false,
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(true);
  
  // Animation for the sheet
  const translateY = useRef(new Animated.Value(SHEET_MAX_HEIGHT)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
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
          // Fade overlay as sheet is dragged down
          overlayOpacity.setValue(1 - (dy / SHEET_MAX_HEIGHT) * 2);
          lastGestureDy.current = dy;
        }
      },
      onPanResponderRelease: () => {
        if (lastGestureDy.current > DRAG_THRESHOLD) {
          // If dragged down past threshold, close the sheet
          Animated.parallel([
            Animated.timing(translateY, {
              toValue: SHEET_MAX_HEIGHT,
              duration: 250,
              useNativeDriver: true,
            }),
            Animated.timing(overlayOpacity, {
              toValue: 0,
              duration: 250,
              useNativeDriver: true,
            })
          ]).start(onClose);
        } else {
          // Otherwise, snap back to original position
          Animated.parallel([
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
              bounciness: 4,
            }),
            Animated.spring(overlayOpacity, {
              toValue: 1,
              useNativeDriver: true,
              bounciness: 0,
            })
          ]).start();
        }
      },
    })
  ).current;

  // Animation when sheet appears
  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 4,
        speed: 12,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleSend = (text: string) => {
    // Hide action buttons when user sends a message
    setShowActionButtons(false);
    
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
        text: "I'm sorry, I don't have enough information to answer that question specifically. The concept you're asking about might be covered in other chapters of the book. Would you like me to explain a related concept or summarize what we know about this topic based on the current chapter?",
        isUser: false,
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);
  };

  const handleInputChange = (text: string) => {
    setInputText(text);
    // Hide action buttons when user is typing
    if (text.trim().length > 0) {
      setShowActionButtons(false);
    }
  };

  const actionButtons = [
    { id: '1', text: 'Summarize the book' },
    { id: '2', text: 'Roleplay as a author' },
    { id: '3', text: 'Explain key concepts' },
    { id: '4', text: 'Compare with other books' },
  ];

  return (
    <Animated.View 
      style={[
        styles.overlay,
        { opacity: overlayOpacity }
      ]}
    >
      <StatusBar barStyle="light-content" />
      <Animated.View 
        style={[
          styles.sheetContainer, 
          { transform: [{ translateY }] }
        ]}
      >
        <SafeAreaView style={styles.safeArea}>
          <DragHandle panHandlers={panResponder.panHandlers} />
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Quiz:Beginning of Infinity</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#000" weight="bold" />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <MessageList messages={messages} isThinking={isThinking} />
          </View>
          
          <View style={styles.bottomContainer}>
            {showActionButtons && messages.length <= 1 && !isThinking && (
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.actionButtonsContainer}
              >
                {actionButtons.map((button) => (
                  <TouchableOpacity 
                    key={button.id} 
                    style={styles.actionButton}
                    onPress={() => handleSend(button.text)}
                  >
                    <Text style={styles.actionButtonText}>{button.text}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            
            <ChatInput 
              onSend={handleSend} 
              onChangeText={handleInputChange}
            />
          </View>
        </SafeAreaView>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#F2F2F7',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: SHEET_MAX_HEIGHT,
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  safeArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  bottomContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    backgroundColor: '#F2F2F7',
  },
  actionButtonsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  actionButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    minWidth: 160,
    height: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  actionButtonText: {
    fontSize: 15,
    color: '#8E8E93',
    fontWeight: '500',
  },
});

export default ChatSheet; 