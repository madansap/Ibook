import React from 'react';
import { View, StyleSheet } from 'react-native';

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
  },
  dragHandle: {
    width: 36,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#C7C7CC',
    marginTop: 8,
  },
});

export default DragHandle; 