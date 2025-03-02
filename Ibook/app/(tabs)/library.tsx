import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native';
import { DotsThree, MagnifyingGlass, Plus, Book } from 'phosphor-react-native';
import Layout from '@/components/Layout';

// Book type definition
type Book = {
  id: string;
  title: string;
  author: string;
  coverImage?: any; // Optional image source
  progress: number;
};

// Sample data
const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'The Beginning of Infinity',
    author: 'David Deutsch',
    progress: 75,
  },
  {
    id: '2',
    title: 'Siddhartha',
    author: 'Hermann Hesse',
    progress: 5,
  },
  {
    id: '3',
    title: 'Antifragile',
    author: 'Nassim Nicholas Taleb',
    progress: 75,
  },
  {
    id: '4',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    progress: 5,
  },
];

const { width } = Dimensions.get('window');
const numColumns = 2;
const bookWidth = (width - 48) / numColumns; // 48 = padding (16) * 2 + gap between items (16)

export default function LibraryScreen() {
  // Book item component
  const renderBookItem = ({ item }: { item: Book }) => (
    <View style={styles.bookContainer}>
      <View style={styles.bookCover}>
        {/* Fallback UI when image is not available */}
        <View style={styles.coverImageContainer}>
          {item.coverImage ? (
            <Image 
              source={item.coverImage} 
              style={styles.coverImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.coverPlaceholder}>
              <Text style={styles.coverTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.coverAuthor} numberOfLines={1}>{item.author}</Text>
            </View>
          )}
        </View>
        
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{item.progress}%</Text>
        </View>
        
        {/* Three dots menu */}
        <TouchableOpacity style={styles.menuButton}>
          <DotsThree size={18} color="#333" weight="bold" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        
        <View style={styles.header}>
          <Text style={styles.title}>Books</Text>
        </View>
        
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <MagnifyingGlass size={18} color="#999" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search for books"
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color="#FF9500" weight="bold" />
          </TouchableOpacity>
        </View>
        
        {/* Books grid */}
        <FlatList
          data={sampleBooks}
          renderItem={renderBookItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.booksList}
          columnWrapperStyle={styles.row}
        />
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    marginLeft: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF9500',
  },
  booksList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  bookContainer: {
    width: bookWidth,
    marginBottom: 24,
  },
  bookCover: {
    width: '100%',
    aspectRatio: 0.7, // Standard book cover ratio
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coverImageContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverPlaceholder: {
    width: '100%',
    height: '100%',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  coverTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  coverAuthor: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  menuButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 