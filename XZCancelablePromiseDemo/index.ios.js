/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';

function makeCancelable(promise){
    let hasCanceled_ = false;
    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then((val) => {
            console.log('promise is resolve')
            hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
          })
        promise.catch((error) => {
            console.log('promise is reject')
            hasCanceled_ ? reject({isCanceled: true}) : reject(error)
        })
    })

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        },
    };
}

let cancelable = null

export default class XZCancelablePromiseDemo extends Component {

  _start(){
    console.log('Start.....')

    const somePromise = new Promise(r => setTimeout(r, 2000))

    // somePromise.then(() => console.log('resolve'))
    cancelable = makeCancelable(somePromise)

    cancelable.promise
    .then(() => console.log('resolve'))
    .catch(({isCanceled}) => console.log(isCanceled))
  }

  _stop(){
    console.log('Stop.....')
    cancelable.cancel()
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this._start}>
          <View style={{width:100,height:100,backgroundColor:'red'}}>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this._stop}>
          <View style={{width:100,height:100,backgroundColor:'green'}}>
          </View>
        </TouchableWithoutFeedback>
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

AppRegistry.registerComponent('XZCancelablePromiseDemo', () => XZCancelablePromiseDemo);
