import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ReactNode } from 'react';
import { Button } from './StyledButton';

interface WidgetProps {
  value: string | number;
  isCompleted: boolean;
  onPress: () => void;
  icon?: ReactNode; // Add an optional icon prop
}

const RowWidget: React.FC<WidgetProps> = ({ value, isCompleted, onPress, icon }) => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const handleDimensionsChange = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', handleDimensionsChange);
  }, []);

  return (
    <TouchableOpacity style={[styles.container, { width: screenWidth }]} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {icon ? (
            <>{icon}</>
          ) : (
            <></>
          )}
        </View>
        <Text style={styles.value}>{value}</Text>
        <Button
          title={isCompleted ? 'Completed' : 'Add'}
          onPress={onPress}
          style={[
            styles.button,
            isCompleted ? styles.completedButton : styles.addButton,
          ]}
          textStyle={styles.buttonText}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50, // Fixed height for the row widget
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // Use row layout for the whole widget
  },
  content: {
    flex: 1,
    flexDirection: 'row', // Horizontal layout for icon, value, button
    alignItems: 'center', // Vertically center the content
    paddingHorizontal: 12,
    justifyContent: 'space-between', // Space out the elements
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10, // Add some margin to the right of the icon
    height: '100%', // Make sure the container is the full height of the content.
  },
  defaultIcon: {
    size: 30, // Larger icon size for the row widget
    color: 'black',
  },
  value: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    textAlign: 'left', // Align value to the left
    flex: 1, // Allow value to take up available space
    marginRight: 10
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'center', // Align button vertically in container
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  addButton: {
    backgroundColor: 'blue',
  },
  completedButton: {
    backgroundColor: 'green',
  },
});

export default RowWidget;
