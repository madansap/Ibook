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

const Step1 = () => {
  const router = useRouter();

  const handleNext = () => {
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
      // Limit drag to left direction only with slight resistance
      if (e.translationX <= 0) {
        translateX.value = e.translationX * 0.9;
        swipeProgress.value = Math.max(e.translationX / (width * 0.3), -1);
      }
    })
    .onEnd((e) => {
      if (e.translationX < -width * 0.15) {
        // Quick timing animation instead of spring
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
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle} />
              <Text style={styles.logoText}>iBook</Text>
            </View>
          </View>
          
          <BottomNavigation
            title="Remember Better"
            description="Track your reading journey and discover new books tailored to your interests."
            currentStep={1}
            onNext={handleNext}
            onSkip={handleSkip}
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
});

export default Step1;

