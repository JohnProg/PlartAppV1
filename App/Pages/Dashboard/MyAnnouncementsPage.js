'use strict';

import React, { Component } from 'react';

import { AsyncStorage, RefreshControl, ListView, Text, View } from 'react-native';

// Components
import Message from './../../Components/Message';
import { SimpleLoader } from './../../Components/Loader';
import { MyAdCeil } from './../../Components/Cells';

// Views
import AboutUsPage from './../Account/AboutUsPage';
import MyAnnouncementDetailPage from './MyAnnouncementDetailPage';

// Utils
import api from './../../Utils/api';

export default class MyAnnouncementsPage extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: dataSource,
      announcements: [],
      isRefreshing: false,
      areAnnouncementsLoading: true,
      token: ''
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);

      this.setState({ token: user_data['token'] });
      this.getMyAdvertisements();
    });
  }

  getMyAdvertisements() {
    this.setState({ areAnnouncementsLoading: true });
    api.getAdvertisements(this.state.token)
      .then((responseData) => {
        let announcements = [];

        if (responseData) {
          announcements = responseData.results.reverse();
          announcements = announcements.filter(element => element.apply === false);
        }

        this.setState({ announcements, dataSource: this.state.dataSource.cloneWithRows(announcements), areAnnouncementsLoading: false, isRefreshing: false });
      });
  }

  renderAnnouncements() {
    let { areAnnouncementsLoading, announcements, dataSource } = this.state;

    if (areAnnouncementsLoading) {
      return <SimpleLoader />;
    } else {
      if (announcements && announcements.length > 0) {
        return <ListView
          ref="listView"
          renderRow={(e) => this.renderRow(e)}
          renderFooter={() => {
            return <View style={{ height: 50 }} />
          }}
          enableEmptySections={true}
          dataSource={dataSource}
          refreshControl={this.renderRefreshControl()}
        />
      } else {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', color: 'white', marginTop: 70 }}>No tienes anuncios creados.</Text>
        </View>
      }
    }
  }

  refreshAnnouncements = () => {
    this.setState({ isRefreshing: true });
    this.getMyAdvertisements();
  }

  onSelectItem(item) {
    this.props.navigator.push({
      component: MyAnnouncementDetailPage,
      passProps: {
        item,
        parentComponent: this,
      }
    });
  }

  renderRow(item, sectionID, rowID) {
    let { navigator } = this.props;
    return (
      <MyAdCeil
        key={item.id}
        onSelectItem={() => this.onSelectItem(item)}
        item={item} />
    );
  }

  renderRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this.refreshAnnouncements}
        tintColor="#fff"
        title="Cargando..."
        titleColor="#fff"
      />);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#673AB7' }}>
        {this.renderAnnouncements()}
      </View>
    );
  }
}
