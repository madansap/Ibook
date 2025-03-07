import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Platform } from 'react-native';
import { Sun } from 'phosphor-react-native';

const ThinkingIndicator: React.FC = () => {
  const dot1Opacity = useRef(new Animated.Value(0.3)).current;
  const dot2Opacity = useRef(new Animated.Value(0.3)).current;
  const dot3Opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animateDots = () => {
      Animated.sequence([
        // Dot 1 animation
        Animated.timing(dot1Opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.ease
        }),
        // Dot 2 animation
        Animated.timing(dot2Opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.ease
        }),
        // Dot 3 animation
        Animated.timing(dot3Opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.ease
        }),
      ]).start(() => {
        // Reset opacities
        dot1Opacity.setValue(0.3);
        dot2Opacity.setValue(0.3);
        dot3Opacity.setValue(0.3);
        // Restart animation
        animateDots();
      });
    };

    animateDots();

    return () => {
      // Cleanup animations
      dot1Opacity.stopAnimation();
      dot2Opacity.stopAnimation();
      dot3Opacity.stopAnimation();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.aiIconContainer}>
        <Sun size={20} color="#FFF" weight="fill" />
      </View>
      <View style={styles.thinkingBubble}>
        <View style={styles.thinkingContent}>
          <Text style={styles.thinkingText}>Thinking</Text>
          <View style={styles.dotsContainer}>
            <Animated.View style={[styles.dot, { opacity: dot1Opacity }]} />
            <Animated.View style={[styles.dot, { opacity: dot2Opacity }]} />
            <Animated.View style={[styles.dot, { opacity: dot3Opacity }]} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '85%',
    alignSelf: 'flex-start',
  },
  aiIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  thinkingBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderTopLeftRadius: 4,
    padding: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  thinkingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thinkingText: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginLeft: 4,
    alignItems: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#8E8E93',
    marginHorizontal: 2,
  },
});

export default ThinkingIndicator; 