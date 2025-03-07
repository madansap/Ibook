import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

interface DragHandleProps {
  panHandlers: any;
}

const DragHandle: React.FC<DragHandleProps> = ({ panHandlers }) => {
  return (
    <View {...panHandlers} style={styles.dragHandleContainer}>
      <View style={styles.dragHandle} />
    </View>
  );
};

const styles = StyleSheet.create({
  dragHandleContainer: {
    width: '100%',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#C7C7CC',
  },
});

export default DragHandle; 