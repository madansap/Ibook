import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Envelope, GoogleLogo, AppleLogo } from 'phosphor-react-native';

const AuthScreen = () => {
  const router = useRouter();

  const handleEmailAuth = () => {
    router.push('./preferences');
  };

  const handleGoogleAuth = () => {
    console.log('Google auth');
    router.push('./preferences');
  };

  const handleAppleAuth = () => {
    console.log('Apple auth');
    router.push('./preferences');
  };

  const handleClose = () => {
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle} />
          <Text style={styles.logoText}>iBook</Text>
        </View>
      </View>
      
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>How would you like to continue?</Text>
          
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={styles.authButton} 
              onPress={handleEmailAuth}
              activeOpacity={0.8}
            >
              <Envelope size={20} color="#333333" weight="bold" />
              <Text style={styles.authButtonText}>Continue with Email</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.authButton} 
              onPress={handleGoogleAuth}
              activeOpacity={0.8}
            >
              <GoogleLogo size={20} color="#333333" weight="bold" />
              <Text style={styles.authButtonText}>Continue with Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.authButton} 
              onPress={handleAppleAuth}
              activeOpacity={0.8}
            >
              <AppleLogo size={20} color="#333333" weight="bold" />
              <Text style={styles.authButtonText}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFCC40',
    marginBottom: 16,
    opacity: 0.8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513', // Brown color for "iBook"
  },
  bottomSection: {
    backgroundColor: '#FF9500',
    padding: 24,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // Ensure it extends to the bottom of the screen
    marginBottom: -50,
    paddingBottom: 80,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  contentContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    gap: 10,
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
});

export default AuthScreen;

