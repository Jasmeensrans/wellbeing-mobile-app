import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ReactNode } from 'react';
import { Button } from './StyledButton';

interface WidgetProps {
  title: string;
  value: string | number;
  isCompleted: boolean;
  onPress: () => void;
  icon?: ReactNode; // Add an optional icon prop
}

const Widget: React.FC<WidgetProps> = ({ title, value, isCompleted, onPress, icon }) => {
  const buttonStyle = isCompleted
    ? [styles.button, styles.completedButton]
    : [styles.button, styles.addButton];

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
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
          style={buttonStyle} 
          textStyle={styles.buttonText}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    padding: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 5,
  },
  titleIcon: {
    // No additional styles needed
  },
  value: {
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 0,
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

export default Widget;
