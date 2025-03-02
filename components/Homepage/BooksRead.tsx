import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BooksRead = () => {
  const totalBooks = 4;
  const maxBooks = 10;
  
  // Generate book indicators
  const renderBookIndicators = () => {
    const indicators = [];
    
    for (let i = 0; i < maxBooks; i++) {
      indicators.push(
        <View 
          key={`book-${i}`} 
          style={[
            styles.bookIndicator,
            i < totalBooks ? styles.activeBookIndicator : {}
          ]} 
        />
      );
    }
    
    return indicators;
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Books Read</Text>
          <Text style={styles.bookCount}>{totalBooks} Books</Text>
        </View>
        
        <View style={styles.indicatorsContainer}>
          {renderBookIndicators()}
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
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  bookCount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  indicatorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  bookIndicator: {
    width: 30,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#E0E0E0',
    marginRight: 8,
    marginBottom: 8,
  },
  activeBookIndicator: {
    backgroundColor: '#FFA500',
  },
});

export default BooksRead; 