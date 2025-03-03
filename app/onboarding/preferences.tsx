import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingLayout from '../../components/Onboarding/OnboardingLayout';
import OnboardingButton from '../../components/Onboarding/OnboardingButton';
import PreferenceSelector, { ReadingGoalSelector } from '../../components/Onboarding/PreferenceSelector';
import { useOnboardingState } from '@/hooks/useOnboardingState';

const PreferencesScreen = () => {
  const router = useRouter();
  const { completeOnboarding } = useOnboardingState();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<number>(10);

  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction', 
    'Fantasy', 'Romance', 'Thriller', 'Biography', 
    'History', 'Self-Help', 'Business', 'Science',
    'Poetry', 'Classics', 'Young Adult', 'Horror'
  ];

  const handleToggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleFinish = async () => {
    // In a real app, you would save the user preferences here
    console.log('Selected genres:', selectedGenres);
    console.log('Reading goal:', selectedGoal);
    
    // Mark onboarding as completed
    await completeOnboarding();
    
    // Navigate to the main app
    router.replace('/(tabs)');
  };

  return (
    <OnboardingLayout>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Personalize Your Experience</Text>
          <Text style={styles.subtitle}>
            Tell us about your reading preferences so we can tailor recommendations just for you.
          </Text>
          
          <PreferenceSelector
            title="Select your favorite genres"
            options={genres}
            selectedOptions={selectedGenres}
            onToggleOption={handleToggleGenre}
            multiSelect={true}
          />
          
          <ReadingGoalSelector
            selectedGoal={selectedGoal}
            onSelectGoal={setSelectedGoal}
          />
          
          <View style={styles.buttonContainer}>
            <OnboardingButton
              label="Get Started"
              onPress={handleFinish}
              variant="primary"
              style={styles.button}
            />
          </View>
        </View>
      </ScrollView>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 32,
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  button: {
    width: '100%',
  },
});

export default PreferencesScreen;

