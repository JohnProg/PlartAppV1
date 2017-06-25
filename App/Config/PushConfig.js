import React, { Component } from 'react';

import FCM from 'react-native-fcm';

export default class PushNotification extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    FCM.requestPermissions();

    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)", token);
      this.props.onChangeToken(token);
    });

    // This function get the notification that was clicked by the user when the app was closed
    FCM.getInitialNotification().then(notif => {
      console.log("INITIAL NOTIFICATION WHEN APP WAS CLOSED", notif);
      if (notif && notif.opened_from_tray) {
        //app is open/resumed because user clicked banner
      }
    });

    // This function get the notification that was clicked by the user when the app was in foreground or background
    this.notificationUnsubscribe = FCM.on("notification", notif => {
      console.log("Notification", notif);
      if (notif && notif.opened_from_tray) {
        //app is open/resumed because user clicked banner
      }
    });

    this.refreshUnsubscribe = FCM.on("refreshToken", token => {
      // fcm token may not be available on first load, catch it here
      console.log("TOKEN (refreshUnsubscribe)", token);
      this.props.onChangeToken(token);
    });
  }

  componentWillUnmount() {
    this.refreshUnsubscribe();
    this.notificationUnsubscribe();
  }

  render() {
    return null;
  }
}
