import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type ReadingProgressProps = {
  currentTime: number; // in minutes
  goalTime: number; // in hours and minutes (e.g., 1.5 = 1 hour 30 minutes)
};

const { width } = Dimensions.get('window');
const cardWidth = width - 32; // 16px padding on each side

const ReadingProgress = ({ currentTime = 45, goalTime = 1.5 }: ReadingProgressProps) => {
  // Calculate percentage for the progress arc
  const goalTimeInMinutes = goalTime * 60;
  const percentage = Math.min(currentTime / goalTimeInMinutes, 1);
  
  // SVG parameters
  const size = cardWidth - 32; // 16px padding on each side of the card
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  
  // Arc parameters for half circle
  const startAngle = -180;
  const endAngle = 0;
  const angleRange = endAngle - startAngle;
  const progressAngle = startAngle + (angleRange * percentage);
  
  // Create SVG arc path
  const createArc = (start: number, end: number, radius: number) => {
    const startRad = (start * Math.PI) / 180;
    const endRad = (end * Math.PI) / 180;
    
    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);
    
    const largeArcFlag = end - start <= 180 ? 0 : 1;
    
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.contentContainer}>
          {/* SVG Container with arc */}
          <Svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
            {/* Background Arc (black) */}
            <Path
              d={createArc(startAngle, endAngle, radius)}
              stroke="#222"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeLinecap="round"
            />
            
            {/* Progress Arc (orange) */}
            <Path
              d={createArc(startAngle, progressAngle, radius)}
              stroke="#FF9500"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeLinecap="round"
            />
          </Svg>
          
          {/* Text Container - positioned in the center */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Today's Reading</Text>
            <Text style={styles.timeText}>{currentTime}:00</Text>
            <Text style={styles.goalText}>of your {goalTime} hrs goal</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    height: 160, // Fixed height for the container
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 20, // Push text down from the top
  },
  title: {
    fontSize: 14,
    color: '#000',
    marginBottom: 6,
  },
  timeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
    lineHeight: 44,
  },
  goalText: {
    fontSize: 14,
    color: '#666',
  },
});

export default ReadingProgress; 