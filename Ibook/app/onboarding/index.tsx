import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingLayout from '../../components/Onboarding/OnboardingLayout';
import OnboardingButton from '../../components/Onboarding/OnboardingButton';
import ProgressDots from '../../components/Onboarding/ProgressDots';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';

const OnboardingIndex = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to auth screen when all steps are completed
      router.push('/onboarding/auth');
    }
  };

  const handleSkip = () => {
    // Skip directly to auth
    router.push('/onboarding/auth');
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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

  return (
    <OnboardingLayout>
      <View style={styles.container}>
        {renderStep()}
        
        <View style={styles.footer}>
          <ProgressDots 
            currentStep={currentStep} 
            totalSteps={totalSteps} 
          />
          
          <View style={styles.buttonContainer}>
            {currentStep > 1 && (
              <OnboardingButton 
                label="Back" 
                onPress={handleBack} 
                variant="secondary"
              />
            )}
            
            <OnboardingButton 
              label={currentStep === totalSteps ? "Get Started" : "Next"} 
              onPress={handleNext} 
              variant="primary"
            />
          </View>
          
          {currentStep < totalSteps && (
            <OnboardingButton 
              label="Skip" 
              onPress={handleSkip} 
              variant="text"
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

