import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';

interface PreferenceSelectorProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onToggleOption: (option: string) => void;
  multiSelect?: boolean;
}

const PreferenceSelector: React.FC<PreferenceSelectorProps> = ({
  title,
  options,
  selectedOptions,
  onToggleOption,
  multiSelect = true,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <ScrollView 
        horizontal={false} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.optionsContainer}
      >
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option);
          
          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionItem,
                isSelected && styles.selectedOption,
              ]}
              onPress={() => onToggleOption(option)}
              activeOpacity={0.7}
            >
              <Text 
                style={[
                  styles.optionText,
                  isSelected && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

interface ReadingGoalSelectorProps {
  selectedGoal: number;
  onSelectGoal: (goal: number) => void;
}

export const ReadingGoalSelector: React.FC<ReadingGoalSelectorProps> = ({
  selectedGoal,
  onSelectGoal,
}) => {
  const goals = [5, 10, 15, 20, 25, 30];
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Books per year goal</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.goalsContainer}
      >
        {goals.map((goal) => {
          const isSelected = selectedGoal === goal;
          
          return (
            <TouchableOpacity
              key={goal}
              style={[
                styles.goalItem,
                isSelected && styles.selectedGoal,
              ]}
              onPress={() => onSelectGoal(goal)}
              activeOpacity={0.7}
            >
              <Text 
                style={[
                  styles.goalText,
                  isSelected && styles.selectedGoalText,
                ]}
              >
                {goal}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333333',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#FFCC40',
  },
  optionText: {
    fontSize: 14,
    color: '#666666',
  },
  selectedOptionText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  goalsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 8,
  },
  goalItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGoal: {
    backgroundColor: '#FFCC40',
  },
  goalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
  },
  selectedGoalText: {
    color: '#FFFFFF',
  },
});

export default PreferenceSelector;

