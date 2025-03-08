import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingLayout from '../../components/Onboarding/OnboardingLayout';
import OnboardingButton from '../../components/Onboarding/OnboardingButton';
import ProgressDots from '../../components/Onboarding/ProgressDots';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import { useOnboardingState } from '@/hooks/useOnboardingState';

const OnboardingIndex = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const { completeOnboarding } = useOnboardingState();
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to auth screen when all steps are completed
      router.push('/(auth)/sign-up');
    }
  };

  const handleSkip = async () => {
    // Mark onboarding as completed
    await completeOnboarding();
    
    // Skip directly to sign-in
    router.replace('/(auth)/sign-in');
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Get background color based on current step
  const getBackgroundColor = () => {
    switch (currentStep) {
      case 1:
        return '#FF9500'; // Orange for Step 1
      case 2:
        return '#FFFFFF'; // Default for other steps
      case 3:
        return '#FFFFFF'; // Default for other steps
      default:
        return '#FFFFFF';
    }
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return <Step1 />;
    }
  };

  // Get text color for buttons based on current step
  const getButtonTextColor = () => {
    return currentStep === 1 ? '#FFFFFF' : '#333333';
  };

  return (
    <OnboardingLayout backgroundColor={getBackgroundColor()}>
      <View style={styles.container}>
        {renderStep()}
        
        <View style={styles.footer}>
          <ProgressDots 
            currentStep={currentStep} 
            totalSteps={totalSteps} 
            activeColor={currentStep === 1 ? '#FFFFFF' : '#FF9500'}
            inactiveColor={currentStep === 1 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)'}
          />
          
          <View style={styles.buttonContainer}>
            {currentStep > 1 && (
              <OnboardingButton 
                label="Back" 
                onPress={handleBack} 
                variant="secondary"
                textColor={getButtonTextColor()}
              />
            )}
            
            <OnboardingButton 
              label={currentStep === totalSteps ? "Get Started" : "Next"} 
              onPress={handleNext} 
              variant="primary"
              textColor={currentStep === 1 ? '#FF9500' : '#FFFFFF'}
              backgroundColor={currentStep === 1 ? '#FFFFFF' : '#FF9500'}
            />
          </View>
          
          {currentStep < totalSteps && (
            <OnboardingButton 
              label="Skip to Homepage" 
              onPress={handleSkip} 
              variant="text"
              textColor={getButtonTextColor()}
            />
          )}
        </View>
      </View>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    gap: 12,
  },
});

export default OnboardingIndex;

