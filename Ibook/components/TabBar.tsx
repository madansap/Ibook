import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { House, Books, Note } from 'phosphor-react-native';
import { useRouter, usePathname } from 'expo-router';

const { width } = Dimensions.get('window');

export default function TabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (route === 'home' && (pathname === '/' || pathname === '/index')) {
      return true;
    }
    return pathname.includes(route);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => router.push('/')}
        activeOpacity={0.7}
      >
        <House
          size={24}
          color={isActive('home') ? '#000' : '#999'}
          weight={isActive('home') ? "fill" : "regular"}
        />
        <Text style={[styles.tabText, isActive('home') && styles.activeText]}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => router.push('/library')}
        activeOpacity={0.7}
      >
        <Books
          size={24}
          color={isActive('library') ? '#000' : '#999'}
          weight={isActive('library') ? "fill" : "regular"}
        />
        <Text style={[styles.tabText, isActive('library') && styles.activeText]}>Library</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => router.push('/notes')}
        activeOpacity={0.7}
      >
        <Note
          size={24}
          color={isActive('notes') ? '#000' : '#999'}
          weight={isActive('notes') ? "fill" : "regular"}
        />
        <Text style={[styles.tabText, isActive('notes') && styles.activeText]}>Notes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    width: width,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  activeText: {
    color: '#000',
  },
}); 