import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import OnboardingButton from './OnboardingButton';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onSubmit: (data: { email: string; password: string; name?: string }) => void;
  onToggleMode: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ 
  mode, 
  onSubmit, 
  onToggleMode 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    const data = mode === 'signup' 
      ? { email, password, name } 
      : { email, password };
    
    onSubmit(data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </Text>
        
        {mode === 'signup' && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Your name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>
        )}
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="your.email@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        
        <OnboardingButton
          label={mode === 'login' ? 'Log In' : 'Sign Up'}
          onPress={handleSubmit}
          variant="primary"
          style={styles.submitButton}
        />
        
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>
            {mode === 'login' 
              ? "Don't have an account?" 
              : "Already have an account?"}
          </Text>
          <TouchableOpacity onPress={onToggleMode}>
            <Text style={styles.toggleLink}>
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  formContainer: {
    width: '100%',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333333',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666666',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  submitButton: {
    marginTop: 24,
    width: '100%',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  toggleText: {
    color: '#666666',
    marginRight: 4,
  },
  toggleLink: {
    color: '#FFCC40',
    fontWeight: '600',
  },
});

export default AuthForm;

