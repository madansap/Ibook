import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Lightning } from 'phosphor-react-native';

interface TextSelectionMenuProps {
  position: { x: number, y: number };
  onExplain: () => void;
  onHighlight: () => void;
  onSave: () => void;
  onDismiss: () => void;
}

const { width } = Dimensions.get('window');

const TextSelectionMenu: React.FC<TextSelectionMenuProps> = ({
  position,
  onExplain,
  onHighlight,
  onSave,
  onDismiss
}) => {
  // Calculate position, ensuring the menu stays within screen bounds
  const menuWidth = 300;
  const menuX = Math.min(Math.max(position.x - menuWidth / 2, 10), width - menuWidth - 10);
  
  return (
    <TouchableOpacity 
      style={StyleSheet.absoluteFill} 
      activeOpacity={1} 
      onPress={onDismiss}
    >
      <View 
        style={[
          styles.menuContainer, 
          { 
            left: menuX,
            top: position.y - 60 // Position above the selected text
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={(e) => {
            e.stopPropagation();
            onExplain();
          }}
        >
          <Lightning size={20} color="#FF9500" weight="fill" />
          <Text style={styles.menuItemText}>Explain</Text>
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={(e) => {
            e.stopPropagation();
            onHighlight();
          }}
        >
          <Text style={styles.menuItemText}>Highlight</Text>
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={(e) => {
            e.stopPropagation();
            onSave();
          }}
        >
          <Text style={styles.menuItemText}>Save</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    paddingVertical: 8,
    paddingHorizontal: 4,
    width: 300,
    justifyContent: 'space-between',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    flex: 1,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    marginLeft: 4,
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E5EA',
    height: '80%',
    alignSelf: 'center',
  }
});

export default TextSelectionMenu; 