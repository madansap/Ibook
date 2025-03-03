import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Switch,
  Pressable
} from 'react-native';
import { useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';

const PreferencesScreen = () => {
  const router = useRouter();
  const [readingHours, setReadingHours] = useState(1.5);
  const [selectedDays, setSelectedDays] = useState(['S', 'M', 'T', 'W', 'T', 'F', 'S']);
  const [readingTimes, setReadingTimes] = useState(['8:00 AM']);
  const [sendReminder, setSendReminder] = useState(true);

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const addReadingTime = () => {
    // In a real app, this would open a time picker
    console.log('Add reading time');
  };

  const handleContinue = () => {
    // Save preferences and continue
    console.log('Preferences saved:', {
      readingHours,
      selectedDays,
      readingTimes,
      sendReminder
    });
    router.push('/(tabs)'); // Navigate to the main app
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.question}>
          How many hrs a day{'\n'}you will be reading ?
        </Text>
        
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0.5}
            maximumValue={5}
            step={0.5}
            value={readingHours}
            onValueChange={setReadingHours}
            minimumTrackTintColor="#FF9500"
            maximumTrackTintColor="#E5E5E5"
            thumbTintColor="#FF9500"
          />
          <Text style={styles.sliderValue}>{readingHours} hrs</Text>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>Repeat</Text>
          <Text style={styles.sectionValue}>Daily</Text>
        </View>
        
        <View style={styles.daysContainer}>
          {days.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDays.includes(day) && styles.selectedDayButton
              ]}
              onPress={() => toggleDay(day)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.dayText,
                selectedDays.includes(day) && styles.selectedDayText
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <Text style={styles.sectionLabel}>Reading time</Text>
        <View style={styles.timeContainer}>
          <View style={styles.timeSlot}>
            <Text style={styles.timeText}>8:00 AM</Text>
          </View>
          <TouchableOpacity 
            style={styles.addTimeButton}
            onPress={addReadingTime}
          >
            <Text style={styles.addTimeText}>+ Add</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.reminderContainer}>
          <Text style={styles.reminderText}>Send Reminder</Text>
          <Switch
            value={sendReminder}
            onValueChange={setSendReminder}
            trackColor={{ false: '#E5E5E5', true: '#4CD964' }}
            thumbColor="#FFFFFF"
          />
        </View>
        
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.9}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 30,
    lineHeight: 32,
  },
  sliderContainer: {
    marginBottom: 40,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValue: {
    alignSelf: 'flex-end',
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  sectionValue: {
    fontSize: 16,
    color: '#000000',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  dayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDayButton: {
    backgroundColor: '#FF9500',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  timeContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 40,
  },
  timeSlot: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  timeText: {
    fontSize: 16,
    color: '#000000',
  },
  addTimeButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTimeText: {
    fontSize: 16,
    color: '#666666',
  },
  reminderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  reminderText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  continueButton: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default PreferencesScreen;

