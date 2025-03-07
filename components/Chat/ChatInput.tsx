import React, { useState, useRef } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Text
} from 'react-native';
import { ArrowUp } from 'phosphor-react-native';

interface ChatInputProps {
  onSend: (text: string) => void;
  onChangeText?: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, onChangeText }) => {
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleSend = () => {
    if (inputText.trim()) {
      onSend(inputText.trim());
      setInputText('');
      Keyboard.dismiss();
    }
  };

  const handleTextChange = (text: string) => {
    setInputText(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      style={styles.keyboardAvoidingView}
    >
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Message"
          placeholderTextColor="#8E8E93"
          value={inputText}
          onChangeText={handleTextChange}
          multiline={false}
          blurOnSubmit={false}
          maxLength={4000}
          autoCapitalize="none"
          autoCorrect={true}
        />
        
        <TouchableOpacity 
          style={[
            styles.sendButton,
            !inputText.trim() && styles.disabledSendButton
          ]} 
          onPress={handleSend}
          activeOpacity={0.7}
          disabled={!inputText.trim()}
        >
          <ArrowUp size={20} color={inputText.trim() ? "#FFFFFF" : "#CCCCCC"} weight="bold" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F2F2F7',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    paddingVertical: 8,
    paddingRight: 8,
    minHeight: 24,
    maxHeight: 24,
    lineHeight: 24,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledSendButton: {
    backgroundColor: '#E5E5EA',
  },
});

export default ChatInput; 