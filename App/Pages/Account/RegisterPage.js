'use strict';

import React, { Component } from 'react';
import { Alert, AsyncStorage, BackAndroid, ScrollView, TextInput, View } from 'react-native';

// Components
import Button from './../../Components/Button';
import H1 from '../../Components/H1';
import Header from './../../Components/Header';
import {OverlayLoader} from '../../Components/Loader';
// import PushConfig from './../../Config/PushConfig';

// Pages
import FeaturesPage from './FeaturesPage';

// Utils
import api from '../../Utils/api';
import helpers from './../../Utils/helpers';
import styles from '../../Styles/basic.form.style.js';

let _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  _navigator.pop();
  return true;
});

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      username: Math.random().toString(36).substr(2, 10),
      email: `${Math.random().toString(36).substr(2, 5)}@gmail.com`,
      password: Math.random().toString(36).substr(2, 10),
      token: '',
      device_key: ''
    };
    _navigator = this.props.navigator;
  }

  register = () => {
   var user = this.state;

   this.setState({isLoading: true});
   api.registerUser(user)
    .then((authData) => {
      this.setState({ isLoading: false, username: '', email: '', password: '', device_key: ''});
      AsyncStorage.setItem('user_data', JSON.stringify(authData));
      this.props.navigator.push({
        component: FeaturesPage,
        passProps: {token: authData.token}
      });
    })
    .catch((errorObj) => {
      this.setState({isLoading: false});
      let errorMessage = helpers.formatError(errorObj);

      setTimeout(() => {
        Alert.alert('Error', errorMessage);
      }, 100);
    });
  }

  focusNextField(nextField) {
    this.refs[nextField].focus();
  }
  
  render() {
     return(
       <View style={{flex:1, backgroundColor: '#673AB7'}}>
         {/*<PushConfig onChangeToken={deviceKey => this.setState({device_key: deviceKey || ""})}/>*/}
         <ScrollView contentContainerStyle={styles.container}>
            <OverlayLoader visible={this.state.isLoading} />
            <H1 color='#fff'>Paso 1</H1>
            <TextInput
              ref="1"
               style={styles.textField}
               onChangeText={(text) => this.setState({username: text})}
               value={this.state.username}
               placeholder={"Usuario"}
               clearButtonMode='always'
               autoCorrect={false}
               returnKeyType={'next'}
               enablesReturnKeyAutomatically={true}
               autoCapitalize="none"
               onSubmitEditing={() => this.focusNextField('2')}
             />
            <TextInput
              ref="2"
               style={styles.textField}
               onChangeText={(text) => this.setState({email: text})}
               value={this.state.email}
               keyboardType='email-address'
               placeholder={"Correo electrónico"}
               clearButtonMode='always'
               autoCorrect={false}
               returnKeyType={'next'}
               enablesReturnKeyAutomatically={true}
               autoCapitalize="none"
               onSubmitEditing={() => this.focusNextField('3')}
             />
            <TextInput
              ref="3"
               style={styles.textField}
               onChangeText={(text) => this.setState({password: text})}
               value={this.state.password}
               secureTextEntry={true}
               placeholder={"Contraseña"}
               clearButtonMode='always'
               autoCorrect={false}
               returnKeyType={'done'}
               enablesReturnKeyAutomatically={true}
               autoCapitalize="none"
               onSubmitEditing={this.register}
             />
         </ScrollView>
         <Header
             title="Crear cuenta"
             leftText = "Atrás"
             rightText = "Siguiente"
             onLeftPress={ () => this.props.navigator.pop(0) }
             onRightPress={ () => this.register() } />
       </View>
     );
   }
}
