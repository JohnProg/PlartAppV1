import React from 'react';
import { Image, Text } from 'react-native';

// Components
import H1 from '../../Components/H1.js';

import styles from '../../Styles/step.style.js';

export default ({ image, text }) =>
  <Image style={[styles.slideContainer, styles.slide]} source={image}>
    <H1 style={[styles.logo]}>PUN</H1>
    <Text style={styles.captionBoxBodyText}>{text}</Text>
  </Image>
