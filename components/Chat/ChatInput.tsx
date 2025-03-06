import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { Microphone, ArrowUp } from 'phosphor-react-native';

interface ChatInputProps {
  onSend: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      onSend(inputText.trim());
      setInputText('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask a follow up question"
          placeholderTextColor="#8E8E93"
          value={inputText}
          onChangeText={setInputText}
          multiline={false}
        />
        <TouchableOpacity style={styles.micButton}>
          <Microphone size={20} color="#8E8E93" weight="bold" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.sendButton, inputText.length > 0 ? styles.sendButtonActive : {}]} 
          onPress={handleSend}
          disabled={inputText.length === 0}
        >
          <ArrowUp size={20} color={inputText.length > 0 ? "#FFF" : "#8E8E93"} weight="bold" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#C7C7CC',
    backgroundColor: '#FFF',
    paddingBottom: Platform.OS === 'ios' ? 30 : 12,
  },
  input: {
    flex: 1,
    height: 36,
    backgroundColor: '#F2F2F7',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
    borderWidth: 0.5,
    borderColor: '#E5E5EA',
  },
  micButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#FF9500',
  },
});

export default ChatInput; 