import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle 
} from 'react-native';

interface OnboardingButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const OnboardingButton: React.FC<OnboardingButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  style,
  textStyle,
}) => {
  const buttonStyles = [
    styles.button,
    variant === 'primary' && styles.primaryButton,
    variant === 'secondary' && styles.secondaryButton,
    variant === 'text' && styles.textButton,
    style,
  ];

  const textStyles = [
    styles.text,
    variant === 'primary' && styles.primaryText,
    variant === 'secondary' && styles.secondaryText,
    variant === 'text' && styles.textOnlyText,
    textStyle,
  ];

  return (
    <TouchableOpacity 
      style={buttonStyles} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={textStyles}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  primaryButton: {
    backgroundColor: '#FFCC40',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFCC40',
  },
  textButton: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    minWidth: 80,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFCC40',
  },
  textOnlyText: {
    color: '#666666',
  },
});

export default OnboardingButton;

