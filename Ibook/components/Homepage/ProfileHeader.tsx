import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User, Plus } from 'phosphor-react-native';

const ProfileHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
          <User size={24} color="#888" weight="regular" />
        </View>
      </View>
      
      <TouchableOpacity style={styles.booksButton}>
        <Text style={styles.booksText}>Books</Text>
        <View style={styles.addIconContainer}>
          <Plus size={18} color="#fff" weight="bold" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E1E1E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  booksButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 20,
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 6,
  },
  booksText: {
    fontSize: 14,
    color: '#000',
    marginRight: 8,
    fontWeight: '500',
  },
  addIconContainer: {
    backgroundColor: '#FFA500',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileHeader; 