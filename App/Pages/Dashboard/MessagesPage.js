'use strict';

import React, { Component } from 'react';

import { AsyncStorage, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// 3rd Party Libraries
import Icon from 'react-native-vector-icons/MaterialIcons';

// Components
import Message from './../../Components/Message';
import {SimpleLoader} from './../../Components/Loader';
import Header from './../../Components/Header';

// Views
import AboutUsPage from './../Account/AboutUsPage';

// Utils
import api from './../../Utils/api';

export default class MessagesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        messages: [],
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
      this.getMessages();
    });
  }

  _onRefresh = (type) => {
    this.setState({isRefreshing: true});
    this.getMessages();
  }

  getMessages() {
    api.getMessages(this.state.token)
      .then((responseData) => {
          var messagesData = this.state.messages;

          responseData = [
            {title: 'Simply dummy text of the printing.', description: '', status: false},
            {title: 'Simply dummy text of the printing.', description: '', status: false},
            {title: 'Simply dummy text of the printing.', description: '', status: true}
          ]
          messagesData = messagesData.concat(responseData);
          this.setState({messages: messagesData, isLoading: false, isRefreshing: false});
      })
      .catch((errorObj) => {
        this.setState({isLoading: false, isRefreshing: false});
      });
  }
  
  renderMessages() {
    let { isLoading, messages } = this.state;

    if(isLoading) {
      return <SimpleLoader />;
    } else {
      if (messages && messages.length > 0) {
        return <View style={{flex:1, justifyContent:'center', marginTop: 40, marginLeft: 20, marginRight: 20, marginBottom: 70}}>
          {messages.map((message, i) => <Message key={i} i={i} message={message} />)}
        </View>
      } else {
        return <View style={{flex:1, justifyContent:'center'}}>
                <Text style={{textAlign: 'center', color: 'white', marginTop: 200}}>No hay mensajes.</Text>
              </View>
      }
    }
  }

  render() {
      return (
        <View style={{flex:1, backgroundColor: '#673AB7'}}>
          <ScrollView
           automaticallyAdjustContentInsets={false}
           refreshControl={
             <RefreshControl
               refreshing={this.state.isRefreshing}
               onRefresh={this._onRefresh}
               tintColor="#fff"
               title="Cargando..."
               titleColor="#fff"
             />
           }
           style={{marginTop: 45}}>
           {this.renderMessages()}
         </ScrollView>
         <Header
             title="Mensajes"
             leftText={<Icon name='menu' size={20} color='#333'/>}
             rightText={<Icon name='info-outline' size={20} color='#333'/>}
             onLeftPress={ () => this.props.toggle() }
             onRightPress={ () => this.props.navigator.push({component: AboutUsPage}) } />
        </View>
      );
  }
}
