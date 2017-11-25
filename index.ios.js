'use strict';
import React from  'react';
import { AppRegistry, NativeModules, View, Text } from 'react-native';
var OutputVolume = NativeModules.OutputVolume;  
OutputVolume.get();
import App from './App/Pages';

// const demo = () => (
//     <View>
//         <Text style={{color:'white'}}>Hola</Text>
//     </View>
// )
AppRegistry.registerComponent('pun', () => App);
