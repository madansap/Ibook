import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, Animated, Clipboard } from 'react-native';
import { Lightning, Highlighter, BookmarkSimple } from 'phosphor-react-native';

interface TextSelectionMenuProps {
  position: { x: number, y: number };
  onExplain: () => void;
  onHighlight: () => void;
  onSave: () => void;
  onDismiss: () => void;
  selectedText?: string; // Add selected text prop for copy functionality
}

const { width, height } = Dimensions.get('window');

const TextSelectionMenu: React.FC<TextSelectionMenuProps> = ({
  position,
  onExplain,
  onHighlight,
  onSave,
  onDismiss,
  selectedText
}) => {
  // Animation value for fade-in effect
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  
  // Calculate position, ensuring the menu stays within screen bounds
  const menuWidth = 280; // Further increased width to prevent text wrapping
  const menuHeight = 50; // Approximate height of the menu
  
  // Calculate horizontal position (centered on touch point but within screen)
  const menuX = Math.min(Math.max(position.x - menuWidth / 2, 10), width - menuWidth - 10);
  
  // Calculate vertical position (above the text, but not off-screen)
  // If the menu would go off the top of the screen, position it below the text
  const positionAbove = position.y - menuHeight - 15;
  const positionBelow = position.y + 15;
  const menuY = positionAbove < 60 ? positionBelow : positionAbove;
  
  // Determine if we need to show a pointer (like a speech bubble)
  const showPointerBelow = menuY === positionAbove;
  const showPointerAbove = menuY === positionBelow;
  
  // Calculate pointer position (centered on touch point)
  const pointerX = Math.min(Math.max(position.x - menuX - 10, 20), menuWidth - 20);
  
  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);
  
  // Handle long press to copy text
  const handleLongPress = () => {
    if (selectedText) {
      Clipboard.setString(selectedText);
      setShowCopyTooltip(true);
      
      // Hide the tooltip after 2 seconds
      setTimeout(() => {
        setShowCopyTooltip(false);
      }, 2000);
    }
  };
  
  return (
    <TouchableOpacity 
      style={[
        StyleSheet.absoluteFill, 
        { zIndex: 999 } // High z-index to ensure it's above text
      ]} 
      activeOpacity={1} 
      onPress={onDismiss}
    >
      <Animated.View 
        style={[
          styles.menuContainer, 
          { 
            left: menuX,
            top: menuY,
            opacity: fadeAnim,
            transform: [{ scale: fadeAnim }],
          }
        ]}
      >
        {/* Pointer for speech bubble effect (if menu is above text) */}
        {showPointerBelow && (
          <View style={[styles.pointer, styles.pointerBelow, { left: pointerX }]} />
        )}
        
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={(e) => {
            e.stopPropagation();
            onExplain();
          }}
          onLongPress={handleLongPress}
        >
          <Lightning size={16} color="#FF9500" weight="fill" />
          <Text style={styles.menuItemText}>Explain</Text>
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={(e) => {
            e.stopPropagation();
            onHighlight();
          }}
          onLongPress={handleLongPress}
        >
          <Highlighter size={16} color="#FF9500" weight="fill" />
          <Text style={styles.menuItemText}>Highlight</Text>
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={(e) => {
            e.stopPropagation();
            onSave();
          }}
          onLongPress={handleLongPress}
        >
          <BookmarkSimple size={16} color="#FF9500" weight="fill" />
          <Text style={styles.menuItemText}>Save</Text>
        </TouchableOpacity>
        
        {/* Pointer for speech bubble effect (if menu is below text) */}
        {showPointerAbove && (
          <View style={[styles.pointer, styles.pointerAbove, { left: pointerX }]} />
        )}
        
        {/* Copy tooltip */}
        {showCopyTooltip && (
          <View style={styles.copyTooltip}>
            <Text style={styles.copyTooltipText}>Copied to clipboard</Text>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', // Fully opaque white
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4, // Increased shadow opacity
    shadowRadius: 8,
    elevation: 12, // Increased elevation
    paddingVertical: 8,
    paddingHorizontal: 4,
    width: 280, // Further increased width to prevent text wrapping
    justifyContent: 'space-between',
    zIndex: 1000, // Ensure it appears in front of everything
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4, // Increased shadow opacity
        shadowRadius: 8,
      },
      android: {
        elevation: 12, // Increased elevation
      },
    }),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10, // Increased padding for better spacing
    flex: 1,
    minWidth: 80, // Ensure minimum width for each item
  },
  menuItemText: {
    fontSize: 13, // Slightly reduced font size to prevent wrapping
    fontWeight: '500',
    color: '#333',
    marginLeft: 4,
    flexShrink: 0, // Prevent text from shrinking
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E5EA',
    height: '70%',
    alignSelf: 'center',
  },
  pointer: {
    position: 'absolute',
    width: 14,
    height: 14,
    backgroundColor: '#FFFFFF', // Fully opaque white
    transform: [{ rotate: '45deg' }],
    zIndex: 1000, // Ensure it appears in front
  },
  pointerBelow: {
    bottom: -7,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pointerAbove: {
    top: -7,
    shadowColor: '#000',
    shadowOffset: { width: -1, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  copyTooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    top: -40,
    alignSelf: 'center',
  },
  copyTooltipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  }
});

export default TextSelectionMenu; 