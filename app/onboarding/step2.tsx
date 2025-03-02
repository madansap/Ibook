import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Book, ChartLineUp, Clock } from 'phosphor-react-native';

const Step2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Your Reading Journey</Text>
      
      <View style={styles.featuresContainer}>
        <FeatureItem 
          icon={<Book size={32} color="#FFCC40" weight="duotone" />}
          title="Organize Your Library"
          description="Keep all your books in one place, organized just the way you like."
        />
        
        <FeatureItem 
          icon={<ChartLineUp size={32} color="#FFCC40" weight="duotone" />}
          title="Track Progress"
          description="Set goals and track your reading progress over time."
        />
        
        <FeatureItem 
          icon={<Clock size={32} color="#FFCC40" weight="duotone" />}
          title="Daily Reading"
          description="Build a reading habit with daily reminders and lessons."
        />
      </View>
    </View>
  );
};

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => {
  return (
    <View style={styles.featureItem}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <View style={styles.featureTextContainer}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333333',
  },
  featuresContainer: {
    width: '100%',
    gap: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333333',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default Step2;

