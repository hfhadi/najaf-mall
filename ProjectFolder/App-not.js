import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';


import firebase from 'react-native-firebase';


  export default class App extends Component {
    async componentDidMount() {
      this.checkPermission();
      this.createNotificationListeners(); //add this line
    }
  
    componentWillUnmount() {
      this.notificationListener;
      this.notificationOpenedListener;
    }
  
    //1
    async checkPermission() {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
        this.getToken();
      } else {
        this.requestPermission();
      }
    }
  
    async createNotificationListeners() {
      /*
      * Triggered when a particular notification has been received in foreground
      * */
      this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        console.log('onNotification:');
        
        // this.showAlert(title, body);
        // alert('message');
  
        const localNotification = new firebase.notifications.Notification({
          sound: 'salam',
          show_in_foreground: true,
        
        })
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          
          
          .android.setChannelId('fcm_default_channel') // e.g. the id you chose above
          .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
          .android.setColor('#C32148') // you can set a color here
          .android.setPriority(firebase.notifications.Android.Priority.High)
          .android.setBigPicture('http://salam.dk/islam-green.png')
          .android.setLargeIcon('@drawable/salam')
          
         
  
        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
  
  
         
      });
  
  
      const channel = new firebase.notifications.Android.Channel('fcm_default_channel', 'FindX', firebase.notifications.Android.Importance.High)
        .setDescription('Findx description')
        .setSound('salam')
        
      firebase.notifications().android.createChannel(channel);
  
      /*
      * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
      * */
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        console.log('onNotificationOpened:');
       // this.showAlert(title, body);
       
      });
  
      /*
      * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
      * */
      const notificationOpen = await firebase.notifications().getInitialNotification();
      if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        console.log('getInitialNotification:');
       // this.showAlert(title, body);
      }
      /*
      * Triggered for data only payload in foreground
      * */
      this.messageListener = firebase.messaging().onMessage((message) => {
        //process data message
        console.log(JSON.stringify(message));
      });
    }
  
    //3
    async getToken() {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
          // user has a device token
          console.log('fcmToken:', fcmToken);
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      }
      console.log('fcmToken:', fcmToken);
    }
  
    //2
    async requestPermission() {
      try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
      } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
      }
    }
  _MySalam=()=>{
  alert("salam")
  }
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
       
          <Button title="hello" onPress={()=>this._MySalam()}/>
         
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });