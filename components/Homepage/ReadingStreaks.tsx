import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

type StreakData = {
  [month: string]: {
    [day: string]: boolean[];
  };
};

const ReadingStreaks = () => {
  const streakDays = 14;
  const months = ['Jan 2025', 'Feb', 'Mar'];
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // Sample data for the streak calendar
  // In a real app, this would come from user reading data
  const generateStreakData = (): StreakData => {
    const data: StreakData = {
      'Jan 2025': {
        'S': [true, true, false, false, false],
        'M': [true, true, false, false, false],
        'T': [true, true, false, false, false],
        'W': [true, true, false, false, false],
        'T1': [true, true, false, false, false], // Using T1 for Thursday
        'F': [true, true, false, false, false],
        'S1': [true, true, false, false, false], // Using S1 for Saturday
      },
      'Feb': {
        'S': [false, false, false, false, false],
        'M': [false, false, false, false, false],
        'T': [false, false, false, false, false],
        'W': [false, false, false, false, false],
        'T1': [false, false, false, false, false], // Using T1 for Thursday
        'F': [false, false, false, false, false],
        'S1': [false, false, false, false, false], // Using S1 for Saturday
      },
      'Mar': {
        'S': [false, false, false, false, false],
        'M': [false, false, false, false, false],
        'T': [false, false, false, false, false],
        'W': [false, false, false, false, false],
        'T1': [false, false, false, false, false], // Using T1 for Thursday
        'F': [false, false, false, false, false],
        'S1': [false, false, false, false, false], // Using S1 for Saturday
      },
    };
    
    return data;
  };
  
  const streakData = generateStreakData();

  // Helper function to get the correct key for days with duplicate names
  const getDayKey = (day: string, index: number): string => {
    if (day === 'S' && index === 6) return 'S1'; // Saturday
    if (day === 'T' && index === 4) return 'T1'; // Thursday
    return day;
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Streaks</Text>
          <Text style={styles.streakCount}>{streakDays} Days</Text>
        </View>
        
        <View style={styles.calendarContainer}>
          {/* Fixed day labels column */}
          <View style={styles.daysColumn}>
            <View style={styles.emptyCell} />
            {days.map((day, index) => (
              <View key={`day-label-${index}`} style={styles.dayLabelContainer}>
                <Text style={styles.dayLabel}>{day}</Text>
              </View>
            ))}
          </View>
          
          {/* Scrollable months and streak boxes */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {months.map((month, monthIndex) => (
              <View key={`month-${monthIndex}`} style={styles.monthColumn}>
                <Text style={styles.monthLabel}>{month}</Text>
                
                <View style={styles.monthGrid}>
                  {days.map((day, dayIndex) => (
                    <View key={`${month}-${day}-row`} style={styles.streakRow}>
                      <View style={styles.cellsRow}>
                        {[0, 1, 2, 3, 4].map((weekIndex) => {
                          const dayKey = getDayKey(day, dayIndex);
                          const isActive = streakData[month][dayKey][weekIndex];
                          return (
                            <View 
                              key={`${month}-${day}-${weekIndex}`} 
                              style={[
                                styles.cell, 
                                isActive ? styles.activeCell : styles.inactiveCell
                              ]} 
                            />
                          );
                        })}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
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
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  streakCount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  calendarContainer: {
    flexDirection: 'row',
  },
  daysColumn: {
    marginRight: 6,
  },
  emptyCell: {
    height: 18, // Match the height of month labels
    marginBottom: 6,
  },
  dayLabelContainer: {
    height: 14,
    marginBottom: 4,
    justifyContent: 'center',
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#000',
    width: 12,
  },
  scrollContent: {
    flexDirection: 'row',
  },
  monthColumn: {
    marginRight: 20,
  },
  monthLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
    marginBottom: 6,
    height: 18,
    textAlign: 'center',
  },
  monthGrid: {
    flexDirection: 'column',
  },
  streakRow: {
    height: 14,
    marginBottom: 4,
    justifyContent: 'center',
  },
  cellsRow: {
    flexDirection: 'row',
  },
  cell: {
    width: 14,
    height: 14,
    borderRadius: 3,
    marginRight: 3,
  },
  activeCell: {
    backgroundColor: '#FFA500',
  },
  inactiveCell: {
    backgroundColor: '#EEEEEE',
  },
});

export default ReadingStreaks; 