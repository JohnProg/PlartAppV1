'use strict';

import React, { Component } from 'react';
import { Navigator, AsyncStorage } from 'react-native';

import Dashboard from './Dashboard';
import Steps from './Tutorial';
import Features from './Account/FeaturesPage';
import PersonalInfoPage from './Account/PersonalInfoPage';
import { ContainerLoader } from './../Components/Loader';
import api from './../Utils/api';

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      component: null,
      isLoading: true,
      user: {}
    };
    this.navigatorRenderScene = this.navigatorRenderScene.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      let component = {component: Steps, isLoading: false};

      if (user_data && user_data['token'] !== undefined) {
        api.authWithToken(user_data['token'])
          .then((authData) => {
            if (authData.step_1) {
              if (authData.step_2) {
                api.getProfile(user_data['token'])
                  .then((userData) => {
                    userData.token = authData.token;
                    this.setState({user: userData, component: Dashboard, isLoading: false});
                  });
              } else {
                this.setState({component: PersonalInfoPage, isLoading: false});
              }
            } else {
              this.setState({component: Features, isLoading: false});
            }

          })
          .catch((errorObj) => {
            this.setState(component);
          });
      } else {
        this.setState(component);
      }
    });
  }

  getCurrentUser = () => {
    return this.state.user;
  }

  setCurrentUser = (user) => {
    this.setState({user: user});
  }

  render() {
    var { isLoading, component } = this.state;

    if(isLoading) {
      return <ContainerLoader />;
    } else {
      return (
        <Navigator
          initialRoute={{ component: component }}
          configureScene={ this.configureScene }
          renderScene={ this.navigatorRenderScene }
          style={{backgroundColor: '#673AB7'}}
          />
      );
    }
  }

  navigatorRenderScene(route, navigator) {
    let Component = route.component;

    return React.createElement(Component, { ...this.props, ...route.passProps, route, navigator, getCurrentUser: this.getCurrentUser, setCurrentUser: this.setCurrentUser } )
  }

  configureScene(route, routeStack) {
    if(route.type === 'type1') {
      return Navigator.SceneConfigs.FloatFromBottom
    } else if (route.type === 'type2') {
      return Navigator.SceneConfigs.VerticalUpSwipeJump
    }
    return Navigator.SceneConfigs.PushFromRight
  }
}
