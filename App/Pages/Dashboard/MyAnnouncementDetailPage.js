'use strict';

import React, { Component } from 'react';
import { BackAndroid, Dimensions, Image, StyleSheet, ScrollView, Text, TouchableHighlight, View } from 'react-native';

// 3rd Party Libraries
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import Header from './../../Components/Header';

// Pages
import PublicProfilePage from './../Account/PublicProfilePage';

const { width } = Dimensions.get('window');

export default class MyAnnouncementDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      isRefreshing: false,
      token: ''
    }
  }
  componentDidMount() {
    BackAndroid.addEventListener('backBtnPressed', this._handleBackBtnPress);
  }
  
  componentWillUnmount() {
    BackAndroid.removeEventListener('backBtnPressed', this._handleBackBtnPress);
  }

  _handleBackBtnPress = () => {
    this.props.navigator.pop();
    return true
  }

  render() {
    const item = this.state.item;

    return (
      <View style={{ flex: 1, backgroundColor: '#673AB7', }}>
        <Header
          title={item.name}
          leftText={<Icon name='angle-left' size={30} />}
          onLeftPress={() => this.props.navigator.pop()} />
        <ScrollView>
          <View style={styles.cell_container}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Image
                style={{ width, height: 200, margin: 2, flex: 1 }}
                source={item.photo ? { uri: item.photo } : require('./../../Images/adDefaultImage.jpg')}
              />
            </View>
            <Text style={{ color: '#1a1917', fontSize: 14, fontWeight: 'bold', letterSpacing: 0.5, marginBottom: 2 }} numberOfLines={1}>{item.name.toUpperCase()}</Text>
            <Text style={{ marginTop: 6, color: '#888888', fontSize: 12, fontStyle: 'italic' }} numberOfLines={4}>{item.description}</Text>
            <Text style={{ marginTop: 6, color: '#888888', fontSize: 12 }}>Pago: {item.currency} {item.budget}</Text>
            <Text style={{ marginTop: 6, color: '#888888', fontSize: 12 }}>Fecha Límite: {Moment(item.date_finish).format('YYYY-MM-DD')}</Text>
            <Text style={{ marginTop: 20, marginBottom: 5 }}>Postulantes:  </Text>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              {["https://scontent.flim5-2.fna.fbcdn.net/v/t1.0-1/p80x80/18193745_1481408151911888_4897951751917896320_n.jpg?oh=b2ab15c005226cfd0d5df85156445043&oe=59AB9828",
              ].map((result, i, arr) => {
                return <TouchableHighlight style={{ width: 59, height: 59, margin: 2 }} key={i} onPress={
                  () => {
                    this.props.navigator.push({
                      component: PublicProfilePage,
                      passProps: {
                        item,
                        photo: result,
                        parentComponent: this,
                      }
                    });
                  }
                }
                ><Image style={{ width: 59, height: 59 }} source={{ uri: result }} />
                </TouchableHighlight>
              })
              }
            </View>
          </View>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  cell_container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 15,
  },
});