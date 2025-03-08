import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { User, Plus, SignOut } from 'phosphor-react-native';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

const ProfileHeader = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { signOut } = useAuth();
  const router = useRouter();

  const handleProfilePress = () => {
    setShowProfileMenu(true);
  };

  const handleCloseMenu = () => {
    setShowProfileMenu(false);
  };

  const handleSignOut = async () => {
    setShowProfileMenu(false);
    
    // Show confirmation dialog
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Sign Out", 
          onPress: async () => {
            try {
              await signOut();
              router.replace('/(auth)/sign-in');
            } catch (error) {
              console.error('Error signing out:', error);
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.profileContainer}
        onPress={handleProfilePress}
        activeOpacity={0.7}
      >
        <View style={styles.avatar}>
          <User size={24} color="#888" weight="regular" />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.booksButton}>
        <Text style={styles.booksText}>Books</Text>
        <View style={styles.addIconContainer}>
          <Plus size={18} color="#fff" weight="bold" />
        </View>
      </TouchableOpacity>

      {/* Profile Menu Modal */}
      <Modal
        visible={showProfileMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseMenu}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleCloseMenu}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleSignOut}
            >
              <SignOut size={20} color="#FF3B30" weight="regular" />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 60,
    marginLeft: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  signOutText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '500',
  },
});

export default ProfileHeader; 