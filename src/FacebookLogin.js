/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import RNFirebase from 'react-native-firebase'

const facebookLogin = () => {
    return LoginManager
      .logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (!result.isCancelled) {
          console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`)
          // get the access token
          return AccessToken.getCurrentAccessToken()
        }
      })
      .then(data => {
        if (data) {
          // create a new firebase credential with the token
          const credential = RNFirebase.auth.FacebookAuthProvider.credential(data.accessToken)
          // login with credential
          return RNFirebase.auth().signInWithCredential(credential)
        }
      })
      .then((currentUser) => {
        if (currentUser) {
          console.info(JSON.stringify(currentUser.toJSON()))
        }
      })
      .catch((error) => {
        console.log(`Login fail with error: ${error}`)
      })
  }

export default class FacebookLogin extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Awesome React Native App!
        </Text>
        <TouchableOpacity onPress={() => facebookLogin()} style={styles.loginButton}>
          <Text style={styles.loginText}>Login with native facebook</Text>
        </TouchableOpacity>
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
  loginButton: {
    width: 250,
    alignItems: 'center',
    marginTop: 30,
    padding: 12,
    
    backgroundColor: '#3b5998',
    borderRadius: 8,
  },
  loginText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
});
