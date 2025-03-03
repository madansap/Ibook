import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { CaretRight } from 'phosphor-react-native';
import Animated, { 
  useAnimatedStyle, 
  interpolate, 
  Extrapolate
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface BottomNavigationProps {
  title: string;
  description: string;
  currentStep: number;
  totalSteps?: number;
  onNext: () => void;
  onSkip: () => void;
  nextButtonText?: string;
  progress?: Animated.SharedValue<number>; // Optional animated value for transitions
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  title,
  description,
  currentStep,
  totalSteps = 3,
  onNext,
  onSkip,
  nextButtonText = 'Next',
  progress
}) => {
  // Create dots based on totalSteps
  const renderDots = () => {
    return Array.from({ length: totalSteps }).map((_, index) => (
      <View 
        key={index} 
        style={[
          styles.dot, 
          currentStep === index + 1 && styles.activeDot
        ]} 
      />
    ));
  };

  // Simplified animated styles for content
  const animatedContentStyle = useAnimatedStyle(() => {
    if (!progress) return {};
    
    // Very subtle fade effect only
    return {
      opacity: interpolate(
        progress.value,
        [-1, -0.5, 0, 0.5, 1],
        [0.9, 0.95, 1, 0.95, 0.9],
        Extrapolate.CLAMP
      )
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.contentContainer, progress && animatedContentStyle]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
          {description}
        </Text>
      </Animated.View>
      
      <View style={styles.navigationContainer}>
        <TouchableOpacity 
          onPress={onSkip} 
          style={styles.skipButtonContainer}
          activeOpacity={0.7}
        >
          <Text style={styles.skipButton}>Skip</Text>
        </TouchableOpacity>
        
        <View style={styles.dotsContainer}>
          {renderDots()}
        </View>
        
        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={onNext}
          activeOpacity={0.7}
        >
          <Text style={styles.nextButtonText}>{nextButtonText}</Text>
          <CaretRight size={20} color="#FFFFFF" weight="bold" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF9500',
    padding: 24,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // Shadow for iOS
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      // Shadow for Android
      android: {
        elevation: 6,
      },
    }),
    // Ensure it extends to the bottom of the screen
    marginBottom: -50,
    paddingBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  contentContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    maxWidth: '85%',
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  skipButtonContainer: {
    width: 80,
    alignItems: 'flex-start',
    padding: 8,
  },
  skipButton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 6,
  },
});

export default BottomNavigation; 