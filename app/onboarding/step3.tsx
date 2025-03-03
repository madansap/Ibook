import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  runOnJS,
  Easing
} from 'react-native-reanimated';
import BottomNavigation from '../../components/Onboarding/BottomNavigation';

const { width } = Dimensions.get('window');

const Step3 = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push('/onboarding/auth');
  };

  const handleBack = () => {
    router.push('/onboarding/step2');
  };

  const handleSkip = () => {
    router.push('/onboarding/auth');
  };

  // Setup swipe gesture with simplified animation
  const translateX = useSharedValue(0);
  const swipeProgress = useSharedValue(0);
  
  const swipeGesture = Gesture.Pan()
    .onUpdate((e) => {
      // Simple resistance factor
      const resistance = 0.9;
      translateX.value = e.translationX * resistance;
      
      // Calculate progress for animations (normalized between -1 and 1)
      swipeProgress.value = Math.min(Math.max(translateX.value / (width * 0.3), -1), 1);
    })
    .onEnd((e) => {
      if (e.translationX > width * 0.15) {
        // Quick timing animation for back navigation
        translateX.value = withTiming(width * 0.3, { 
          duration: 150,
          easing: Easing.out(Easing.quad)
        }, () => {
          runOnJS(handleBack)();
        });
      } else if (e.translationX < -width * 0.15) {
        // Quick timing animation for forward navigation
        translateX.value = withTiming(-width * 0.3, { 
          duration: 150,
          easing: Easing.out(Easing.quad)
        }, () => {
          runOnJS(handleNext)();
        });
      } else {
        // Reset position with quick animation
        translateX.value = withTiming(0, { 
          duration: 150,
          easing: Easing.out(Easing.quad)
        });
        swipeProgress.value = withTiming(0, { 
          duration: 150,
          easing: Easing.out(Easing.quad)
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        // Very subtle scale only
        { scale: 1 - Math.abs(translateX.value / width) * 0.03 }
      ]
    };
  });

  return (
    <GestureDetector gesture={swipeGesture}>
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        <SafeAreaView style={styles.container}>
          <View style={styles.topSection}>
            <View style={styles.imageContainer}>
              <Text style={styles.imageEmoji}>📚</Text>
            </View>
            <Text style={styles.title}>Personalized For You</Text>
            <Text style={styles.description}>
              Tell us about your reading preferences and we'll recommend books tailored just for you.
            </Text>
          </View>
          
          <BottomNavigation
            title="Get Started"
            description="Your reading journey begins now!"
            currentStep={3}
            onNext={handleNext}
            onSkip={handleSkip}
            nextButtonText="Start"
            progress={swipeProgress}
          />
        </SafeAreaView>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  imageEmoji: {
    fontSize: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    lineHeight: 24,
    maxWidth: '80%',
  },
});

export default Step3;

