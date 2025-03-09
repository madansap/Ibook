import React, { ReactNode } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle
} from 'react-native';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  onPress,
  icon,
  variant = 'primary',
  isLoading = false,
  style,
  textStyle,
  disabled = false
}) => {
  const buttonStyle = variant === 'primary' 
    ? styles.primaryButton 
    : styles.secondaryButton;
  
  const textStyleByVariant = variant === 'primary' 
    ? styles.primaryText 
    : styles.secondaryText;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyle,
        disabled && styles.disabledButton,
        style
      ]}
      onPress={onPress}
      disabled={isLoading || disabled}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? '#FFFFFF' : '#FF9500'} 
          size="small" 
        />
      ) : (
        <>
          {icon && icon}
          <Text style={[styles.text, textStyleByVariant, textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  disabledButton: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  primaryText: {
    color: '#FF9500',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
});

export default AuthButton; 