'use strict';

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

// Components
import TabBar from './../../Components/TabBar'
import { SidebarContainer, Menu } from './../../Components/SideMenu'
// import PushConfig from './../../Config/PushConfig';

// Pages
import AboutUsPage from './../Account/AboutUsPage';
import AdvertisementsPage from './AdvertisementsPage';
import MessagesPage from './MessagesPage';
import ProfilePage from './../Account/ProfilePage';

// Utils
import api from './../../Utils/api';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
  }

  componentDidMount() {
    if (Object.keys(this.props.getCurrentUser()).length == 0) {
      AsyncStorage.getItem('user_data').then((user_data_json) => {
        let token = JSON.parse(user_data_json)['token'];
        api.getProfile(token)
          .then((userData) => {
            userData.token = token;
            this.props.setCurrentUser(userData);
          });
      });

    }
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen })
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const menu = <Menu getCurrentUser={this.props.getCurrentUser}
                       setCurrentUser={this.props.setCurrentUser}
                       onItemSelected={this.onMenuItemSelected}
                       navigator={this.props.navigator}/>
    return(
      <SidebarContainer menu={menu}
                        isOpen={this.state.isOpen}
                        onChange={(isOpen) => this.updateMenuState(isOpen)}>
         <TabBar structure={
           [
             {
               title: 'Anuncios',
               iconName: 'home',
               renderContent: () => {
                 return (
                   <AdvertisementsPage toggle={this.toggle.bind(this)}
                                       navigator={this.props.navigator}/>
                 );
               }
             },
             {
               title: 'Mensajes',
               iconName: 'inbox',
               renderContent: () => {
                 return (
                   <MessagesPage toggle={this.toggle.bind(this)}
                                       navigator={this.props.navigator}/>
                 );
               }
             },
             {
               title: 'Perfil',
               iconName: 'person',
               renderContent: () => {
                 return (
                   <ProfilePage getCurrentUser={this.props.getCurrentUser}
                                setCurrentUser={this.props.setCurrentUser}
                                navigator={this.props.navigator}/>
                 );
               }
             }
           ]
         }
         activeTintColor={'#673AB7'}
         iconSize={25}
         selectedTab={0}/>
         {/*<PushConfig onChangeToken={deviceKey => console.log(deviceKey) }/>*/}
       </SidebarContainer>
    );
  }
}
