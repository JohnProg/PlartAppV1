'use strict';

import React from 'react';
import { StatusBar, View } from 'react-native';

// 3rd Party Libraries
import AppIntro from 'react-native-app-intro';
import IntroPage from '../Account/IntroPage';

import Step from './step.js';

export default ({navigator}) =>
<View>
  <StatusBar
      translucent={true}
      backgroundColor={'#rgba(0, 0, 0, 0.2)'}
      barStyle="default"
      showHideTransition='slide'
      hidden={ false }
  />
  <AppIntro
    doneBtnLabel='Listo'
    skipBtnLabel='Saltar'
    onDoneBtnClick={ ()=> navigator.push({component: IntroPage}) }
    onSkipBtnClick={ ()=> navigator.push({component: IntroPage}) }>

    <Step image={require('./../../Images/slide10.jpeg')} text="Demuestra el talento que tienes dando a conocer tu trabajo"/>
    <Step image={require('./../../Images/slide4.jpeg')} text="Entérate de de todos los eventos y novedades de tu localidad según tu preferencia"/>
    <Step image={require('./../../Images/slide14.jpeg')} text="Consigue la oportunidad que tanto estabas esperando"/>
  </AppIntro>
</View>
