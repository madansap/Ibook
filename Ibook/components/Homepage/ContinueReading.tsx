import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Book } from 'phosphor-react-native';

type BookCardProps = {
  title: string;
  author: string;
  progress: number;
  isActive?: boolean;
};

const { width } = Dimensions.get('window');
const cardWidth = width * 0.75; // 75% of screen width for all cards

const BookCard = ({ title, author, progress, isActive = false }: BookCardProps) => {
  return (
    <TouchableOpacity 
      style={[
        styles.bookCard, 
        isActive ? styles.activeBookCard : styles.inactiveBookCard
      ]}
    >
      <View style={styles.bookCover}>
        <Book size={isActive ? 24 : 20} color={isActive ? "#333" : "#888"} weight="regular" />
      </View>
      
      <View style={styles.bookInfo}>
        <Text 
          style={[
            styles.bookTitle, 
            isActive ? styles.activeTitle : styles.inactiveTitle
          ]} 
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text 
          style={[
            styles.bookAuthor, 
            isActive ? styles.activeText : styles.inactiveText
          ]} 
          numberOfLines={1}
        >
          {author}
        </Text>
        <Text 
          style={[
            styles.bookProgress, 
            isActive ? styles.activeText : styles.inactiveText
          ]}
        >
          {progress}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ContinueReading = () => {
  // Sample data - in a real app, this would come from a data source
  const books = [
    {
      id: '1',
      title: 'Beginning of Infinity',
      author: 'David Deutsch',
      progress: 75,
      isActive: true,
    },
    {
      id: '2',
      title: 'Siddhartha',
      author: 'Hermann Hesse',
      progress: 5,
    },
    {
      id: '3',
      title: 'Atomic Habits',
      author: 'James Clear',
      progress: 30,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Continue Reading</Text>
      
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        snapToInterval={cardWidth + 16} // Card width + spacing
        decelerationRate="fast"
      >
        {books.map((book, index) => (
          <View 
            key={book.id} 
            style={[
              styles.cardWrapper,
              index === 0 && { marginLeft: 16 },
              index === books.length - 1 && { marginRight: 16 }
            ]}
          >
            <BookCard
              title={book.title}
              author={book.author}
              progress={book.progress}
              isActive={index === 0}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingHorizontal: 16,
    color: '#000',
  },
  scrollContainer: {
    paddingVertical: 5,
  },
  cardWrapper: {
    marginRight: 12,
  },
  bookCard: {
    height: 70,
    width: cardWidth,
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  activeBookCard: {
    backgroundColor: '#FF9500',
  },
  inactiveBookCard: {
    backgroundColor: '#F9F9F9',
  },
  bookCover: {
    width: 45,
    height: 50,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: '#E1E1E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  activeTitle: {
    color: '#fff',
    fontSize: 14,
  },
  inactiveTitle: {
    color: '#333',
    fontSize: 11,
  },
  bookAuthor: {
    marginBottom: 2,
  },
  bookProgress: {
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
    fontSize: 11,
  },
  inactiveText: {
    color: '#666',
    fontSize: 9,
  },
});

export default ContinueReading; 