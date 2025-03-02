import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, StatusBar, View } from 'react-native';

// Import our custom components
import ProfileHeader from '@/components/Homepage/ProfileHeader';
import DailyLesson from '@/components/Homepage/DailyLesson';
import ContinueReading from '@/components/Homepage/ContinueReading';
import ReadingProgress from '@/components/Homepage/ReadingProgress';
import ReadingStreaks from '@/components/Homepage/ReadingStreaks';
import BooksRead from '@/components/Homepage/BooksRead';
import Layout from '@/components/Layout';

export default function HomeScreen() {
  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <ProfileHeader />
          <DailyLesson />
          <ContinueReading />
          <ReadingProgress currentTime={45} goalTime={1.5} />
          <ReadingStreaks />
          <BooksRead />
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
});
