import React, { ReactNode } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  StatusBar,
  Dimensions
} from 'react-native';
import { X } from 'phosphor-react-native';
import { useRouter } from 'expo-router';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showCloseButton?: boolean;
}

const { width, height } = Dimensions.get('window');

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title, 
  subtitle,
  showCloseButton = true
}) => {
  const router = useRouter();

  const handleClose = () => {
    router.replace('/onboarding/splash');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle} />
            <Text style={styles.logoText}>iBook</Text>
          </View>
        </View>

        {/* Content Card */}
        <View style={styles.card}>
          {showCloseButton && (
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <X size={20} color="#FFF" weight="bold" />
            </TouchableOpacity>
          )}
          
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          
          <View style={styles.content}>
            {children}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0', // Light cream background
  },
  keyboardAvoid: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.1,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFCC33', // Yellow circle
    marginBottom: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9500', // Orange text
  },
  card: {
    backgroundColor: '#FF9500', // Orange background
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
    opacity: 0.9,
  },
  content: {
    marginTop: 20,
  },
});

export default AuthLayout; 