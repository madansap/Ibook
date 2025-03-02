import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface ProgressDotsProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressDots: React.FC<ProgressDotsProps> = ({ 
  currentStep, 
  totalSteps 
}) => {
  const renderDots = () => {
    const dots = [];
    
    for (let i = 1; i <= totalSteps; i++) {
      dots.push(
        <View 
          key={i} 
          style={[
            styles.dot,
            i === currentStep ? styles.activeDot : styles.inactiveDot
          ]}
        />
      );
    }
    
    return dots;
  };

  return (
    <View style={styles.container}>
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#FFCC40',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  inactiveDot: {
    backgroundColor: '#E0E0E0',
  },
});

export default ProgressDots;

