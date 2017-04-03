'use strict';

import React, { Component } from 'react';
import { Alert, AsyncStorage, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Components
import Button from '../../Components/Button';
import {SimpleLoader, OverlayLoader} from '../../Components/Loader';

// Pages
import PersonalInfoPage from './PersonalInfoPage';

// Utils
import api from '../../Utils/api';
import helpers from '../../Utils/helpers';

import styles from '../../Styles/features.style.js';

export default class Features extends Component {
  constructor(props){
    super(props);
    this.state = {
      features: [],
      isLoading: false,
      isLoadingFeatures: false,
      token: props.token
    }
  }

  componentDidMount() {
    if (!this.state.token) {
      AsyncStorage.getItem('user_data').then((user_data_json) => {
        this.setState({token: JSON.parse(user_data_json)['token']});
      });
    }
    this.setState({isLoadingFeatures: true});
    api.getProfessions()
      .then((featuresData) => {
        this.setState({features: featuresData, isLoadingFeatures: false});
      });
  }

  updateChoice = (id) => {
    let features  = this.state.features;

    for (var i in features) {
        if (id == features[i].id) {
          features[i].is_selected = !features[i].is_selected;
        }
    }
    this.setState(features);
  }

  handleSubmit = () => {
    let token = this.state.token,
        listOfIds = [];

    this.setState({isLoading: true});
    listOfIds = helpers.getListOfPropertyByProperty(this.state.features, 'id', 'is_selected');

    api.postSaveFeatures({token: token, profiles: listOfIds})
      .then((authData) => {
        this.setState({isLoading: false});
        this.props.navigator.push({
          component: PersonalInfoPage,
          passProps: {
            token: token
          }
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

  _renderFeatures = () => {
    let { isLoadingFeatures } = this.state;

    if (isLoadingFeatures) {
      return <SimpleLoader />;
    } else {
      return this.state.features.map((feature, i) =>
        <TouchableOpacity
          onPress={ () => this.updateChoice(feature.id) }
          key={i}
          style={styles.feature}>
          <Image
            style={styles.featureImage}
            resizeMode={'contain'}
            source={require('./../../Images/job.png')}>
            <View style={[styles.featureOverlay, feature.is_selected ? {backgroundColor: 'rgba(80,94,104,0)'} : {}]}>
              <Text style={styles.featureText}>{feature.name}</Text>
            </View>
          </Image>
        </TouchableOpacity>);
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <OverlayLoader visible={this.state.isLoading} />
        <Text style={styles.title}>Ayúdanos a definir a que tipo de perfil perteneces.</Text>
        <View style={styles.featureContainer}>
          {this._renderFeatures()}
        </View>
        <Button type="2" onPress={ () => this.handleSubmit() }>Siguiente</Button>
      </ScrollView>
    );
   }
}
