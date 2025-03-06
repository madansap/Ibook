import React, { useState } from 'react';
import { Text, StyleSheet, TextStyle, NativeSyntheticEvent, TextLayoutEventData, Platform, View } from 'react-native';

interface HighlightedTextProps {
  text: string;
  highlightStart?: number;
  highlightEnd?: number;
  style?: TextStyle;
  selectable?: boolean;
  onLongPress?: () => void;
  onTextLayout?: (event: NativeSyntheticEvent<TextLayoutEventData>) => void;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  highlightStart,
  highlightEnd,
  style,
  selectable = true,
  onLongPress,
  onTextLayout
}) => {
  // If no highlight range is provided, just render the text normally
  if (!highlightStart || !highlightEnd || highlightStart >= highlightEnd) {
    return (
      <Text 
        style={[styles.text, style]} 
        selectable={selectable}
        onLongPress={onLongPress}
        onTextLayout={onTextLayout}
      >
        {text}
      </Text>
    );
  }

  // Ensure highlight bounds are within text length
  const start = Math.max(0, Math.min(highlightStart, text.length));
  const end = Math.max(start, Math.min(highlightEnd, text.length));

  // Split the text into three parts: before highlight, highlighted, and after highlight
  const beforeHighlight = text.substring(0, start);
  const highlighted = text.substring(start, end);
  const afterHighlight = text.substring(end);

  return (
    <Text 
      style={[styles.text, style]} 
      selectable={selectable}
      onLongPress={onLongPress}
      onTextLayout={onTextLayout}
    >
      {beforeHighlight}
      <Text style={styles.highlight}>{highlighted}</Text>
      {afterHighlight}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
  },
  highlight: {
    backgroundColor: 'rgba(255, 149, 0, 0.3)', // Orange highlight with transparency
    color: '#000',
  },
});

export default HighlightedText; 