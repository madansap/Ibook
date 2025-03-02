import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, ScrollViewProps, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Layout from '@/components/Layout';

// Daily Lesson Card Component
const DailyLessonCard = () => {
  return (
    <View style={styles.dailyLessonContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Daily Lesson</Text>
      </View>
      
      <TouchableOpacity style={styles.lessonCard}>
        <Text style={styles.lessonTag}>Meditations</Text>
        
        <Text style={styles.lessonContent}>
          No one can keep you from living as your nature requires. Nothing can happen to you that is not required by Nature.
        </Text>
        
        <View style={styles.readMoreContainer}>
          <Text style={styles.readMoreText}>Tap to read more</Text>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

// Tab Toggle Component
const TabToggle = ({ activeTab, setActiveTab }: { activeTab: 'notes' | 'highlights', setActiveTab: (tab: 'notes' | 'highlights') => void }) => {
  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'notes' && styles.activeTab]}
        onPress={() => setActiveTab('notes')}
      >
        <Text style={activeTab === 'notes' ? styles.activeTabText : styles.tabText}>Notes</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'highlights' && styles.activeTab]}
        onPress={() => setActiveTab('highlights')}
      >
        <Text style={activeTab === 'highlights' ? styles.activeTabText : styles.tabText}>Highlights</Text>
      </TouchableOpacity>
    </View>
  );
};

// Book Notes Section Component
const BookNotesSection = ({ title, notes }: { title: string, notes: Array<{id: string, content: string}> }) => {
  return (
    <View style={styles.bookNotesContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.bookTitle}>{title}</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View all</Text>
          <Ionicons name="chevron-forward" size={16} color="#666" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.notesScrollContainer}
      >
        {notes.map((note) => (
          <TouchableOpacity key={note.id} style={styles.noteCard}>
            <Text style={styles.noteContent} numberOfLines={5}>
              {note.content}
            </Text>
            <View style={styles.readMoreContainer}>
              <Text style={styles.readMoreText}>Tap to read more</Text>
              <Ionicons name="chevron-forward" size={16} color="#333" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default function NotesScreen() {
  const [activeTab, setActiveTab] = useState<'notes' | 'highlights'>('notes');
  
  // Sample data for book notes
  const beginningOfInfinityNotes = [
    {
      id: '1',
      content: 'Error Correction Drives Progress: The scientific method, criticism, and openness to error are fundamental to improving ideas and solving problems.',
    },
    {
      id: '2',
      content: 'The Power of Good Explanations: Progress depends on explanatory knowledge without breaking down when distinguishing reality from fantasy.',
    },
  ];
  
  const siddharthaNotes = [
    {
      id: '1',
      content: 'No one can keep you from living as your nature requires. Nothing can happen to you that is not required by Nature.',
    },
    {
      id: '2',
      content: 'No one can keep you from living as your nature requires. Nothing can happen to you that is not required by Nature.',
    },
  ];

  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <DailyLessonCard />
          
          <TabToggle activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {activeTab === 'notes' ? (
            <>
              <BookNotesSection 
                title="The Beginning of Infinity" 
                notes={beginningOfInfinityNotes} 
              />
              
              <BookNotesSection 
                title="Siddhartha" 
                notes={siddharthaNotes} 
              />
            </>
          ) : (
            <View style={styles.highlightsContainer}>
              {/* Highlights content would go here */}
              <Text style={styles.placeholderText}>Highlights will be displayed here</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  dailyLessonContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#666',
    marginRight: 2,
  },
  lessonCard: {
    backgroundColor: '#FFC069',
    borderRadius: 16,
    padding: 16,
    paddingVertical: 20,
    marginBottom: 0,
  },
  lessonTag: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
    color: '#333',
  },
  lessonContent: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
    marginBottom: 16,
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 14,
    color: '#333',
    marginRight: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    marginHorizontal: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  bookNotesContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notesScrollContainer: {
    paddingBottom: 8,
    paddingRight: 16,
  },
  noteCard: {
    width: 250,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
  },
  noteContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 8,
  },
  highlightsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
});