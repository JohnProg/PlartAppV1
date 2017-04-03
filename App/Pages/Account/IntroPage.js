'use strict';

import React from 'react';
import { ScrollView, StatusBar, View } from 'react-native';

// 3rd Party Libraries
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import Button from '../../Components/Button';
import H1 from '../../Components/H1';

// Pages
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';

import styles from '../../Styles/basic.form.style.js';

export default ({navigator}) =>
<View style={{flex:1, backgroundColor: '#673AB7'}}>
  <StatusBar
      translucent={true}
      backgroundColor={'#rgba(0, 0, 0, 0.2)'}
      barStyle="default"
      showHideTransition='slide'
      hidden={ false }
  />
  <ScrollView contentContainerStyle={[styles.container, {alignItems: 'center'}]}>
    <H1 color='#fff'>PUN</H1>
    <Icon name='group' size={100} color="#fff" style={{margin: 20}}/>
    <Button onPress={() => navigator.push({component: RegisterPage}) }>Registrarse</Button>
    <Button onPress={() => navigator.push({component: LoginPage}) }>Iniciar sesión</Button>
  </ScrollView>
</View>
