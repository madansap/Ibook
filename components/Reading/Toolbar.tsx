import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft, BookOpen, TextAlignLeft, Share } from 'phosphor-react-native';

interface ToolbarProps {
  onBackPress: () => void;
}

const Toolbar = ({ onBackPress }: ToolbarProps) => {
  return (
    <View style={styles.toolbar}>
      <View style={styles.toolbarContent}>
        <TouchableOpacity onPress={onBackPress} style={styles.toolbarButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.toolbarActions}>
          <TouchableOpacity style={styles.toolbarButton}>
            <BookOpen size={22} color="#333" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.toolbarButton}>
            <TextAlignLeft size={22} color="#333" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.toolbarButton}>
            <Share size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    position: 'relative',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 5, // Add shadow for Android
    borderTopWidth: 1,
    borderTopColor: '#eee',
    zIndex: 10,
  },
  toolbarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbarActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolbarButton: {
    marginHorizontal: 12,
    padding: 4,
  },
  toolbarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Toolbar; 