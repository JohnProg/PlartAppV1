'use strict';

import React from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  titleText: {
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 50
  }
});

export default ({children, color, style}) =>
  <Text style={[{color: color}, styles.titleText, style]}>{children}</Text>
