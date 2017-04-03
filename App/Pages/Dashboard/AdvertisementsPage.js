'use strict';

import React, { Component } from 'react';

import { AsyncStorage, Platform, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// 3rd Party Libraries
import Icon from 'react-native-vector-icons/MaterialIcons';

// Components
import Slider from './../../Components/Announcement';
import {SimpleLoader} from './../../Components/Loader';
import Header from './../../Components/Header';

// Views
import AboutUsPage from './../Account/AboutUsPage';

// Utils
import api from './../../Utils/api';

export default class AdvertisementsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        announcements: [],
        isRefreshing: false,
        isLoading: false,
        token: ''
    }
  }

  componentDidMount() {
    this.setState({isLoading: true});
    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);

      this.setState({token: user_data['token']});
      this.getAdvertisements();
    });
  }

  _onRefresh = (type) => {
    this.setState({isRefreshing: true});
    this.getAdvertisements();
  }

  getAdvertisements() {
    api.getAdvertisements(this.state.token)
     .then((responseData) => {
         var announcementsData = this.state.announcements;

         announcementsData = announcementsData.concat(responseData.results);
         announcementsData = announcementsData.filter(element => element.apply === false);
         this.setState({announcements: announcementsData, isLoading: false, isRefreshing: false});
     })
     .catch((errorObj) => {
       this.setState({isLoading: false, isRefreshing: false});
     });
   }

   renderAnnouncements() {
     let { isLoading, announcements } = this.state;

     if(isLoading) {
       return <SimpleLoader color='white'/>;
     } else {
       if (announcements && announcements.length > 0) {
         return (
           <Slider
             items={announcements}
             firstItem={ announcements.length <= 1 ? 0 : 1 }
             updateAnnouncements={this.updateAnnouncements.bind(this)}
           />
         )
       } else {
         return <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                 <Text style={{color: 'white'}}>No hay anuncios.</Text>
               </View>
       }
     }
   }

   updateAnnouncements(url, index, type) {
     if (type === 'apply') {
       api.postApplyAdvertisement(this.state.token, url)
         .then((responseData) => {
             console.log(responseData);
         });
     } else {
       api.postDeclineAdvertisement(this.state.token, url)
         .then((responseData) => {
             console.log(responseData);
         });
     }
     if (index > -1) {
       if (this.state.announcements.length > 1) {
         let announcements = [];

         announcements = this.state.announcements.filter(function (item) {
           return item.id != index;
         });
         this.setState({announcements: announcements});
       } else {
         this.setState({announcements: []});
       }
     }
   }

   render() {
      return (
        <View style={{flex:1, backgroundColor: '#673AB7'}}>
         <ScrollView
             contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: Platform.OS === 'ios' ? 0 : 70}}
             automaticallyAdjustContentInsets={false}
             refreshControl={
               <RefreshControl
                 refreshing={this.state.isRefreshing}
                 onRefresh={this._onRefresh}
                 tintColor="#fff"
                 title="Cargando..."
                 titleColor="#fff"
               />
             }>
            {this.renderAnnouncements()}
          </ScrollView>
          <Header
              title="Anuncios"
              leftText={<Icon name='menu' size={20} color='#333'/>}
              rightText={<Icon name='info-outline' size={20} color='#333'/>}
              onLeftPress={ () => this.props.toggle() }
              onRightPress={ () => this.props.navigator.push({component: AboutUsPage}) } />
        </View>
      );
   }
}
