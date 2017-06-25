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
      component: Steps,
      isLoading: true,
      user: {}
    };
  }

  componentWillMount() {
    const componentSteps = { component: Steps, isLoading: false };

    AsyncStorage.getItem('user').then((userDataStorage) => {
      if (!userDataStorage) {
        this.setState(componentSteps);
        return;
      }
      
      const user_data = JSON.parse(userDataStorage);
      const token = user_data['token'];
      
      if (user_data && token !== undefined) {
        api.authWithToken(token)
          .then((authData) => {
            if (!authData.step_1) this.setState({ component: Features, isLoading: false });
            else if (!authData.step_2) this.setState({ component: PersonalInfoPage, isLoading: false });
            else {
              api.getProfile(token)
              .then((userData) => {
                userData.token = authData.token;
                this.setState({ user: userData, component: Dashboard, isLoading: false });
              });
            }
          })
          .catch(errorObj => this.setState(componentSteps));
      } else {
        this.setState(componentSteps);
      }
    });
  }

  getCurrentUser = () => this.state.user;

  setCurrentUser = (user) => this.setState({ user: user });

  render() {
    const { isLoading, component } = this.state;

    if (isLoading) {
      return <ContainerLoader />;
    } else {
      return (
        <Navigator
          initialRoute={{ component }}
          configureScene={this.configureScene}
          renderScene={this.navigatorRenderScene}
          style={{ backgroundColor: '#673AB7' }}
        />
      );
    }
  }

  navigatorRenderScene = (route, navigator) => {
    const Component = route.component;

    return React.createElement(Component, { ...this.props, ...route.passProps, route, navigator, getCurrentUser: this.getCurrentUser, setCurrentUser: this.setCurrentUser })
  }

  configureScene(route, routeStack) {
    if (route.type === 'type1') {
      return Navigator.SceneConfigs.FloatFromBottom;
    } else if (route.type === 'type2') {
      return Navigator.SceneConfigs.VerticalUpSwipeJump;
    }

    return Navigator.SceneConfigs.PushFromRight;
  }
}
