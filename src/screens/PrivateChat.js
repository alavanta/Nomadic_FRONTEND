import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import firebase from 'firebase';
import { withNavigation } from 'react-navigation';

import { Button } from 'react-native-elements';

import Entypo from 'react-native-vector-icons/dist/Entypo';

import { GiftedChat } from 'react-native-gifted-chat';

function Header(props) {
  return (
    <View style={headStyle.headerContainer}>
      <Button
        buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
        onPress={() => {
          props.navigation.goBack();
        }}
        icon={<Entypo name="chevron-left" size={23} />}
      />
      <Text style={headStyle.headText}>{props.data.name}</Text>
    </View>
  );
}

const headStyle = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: 'white'
  },
  headText: {
    fontSize: 17,
    fontWeight: 'bold',
    left: 20
  }
});

class PrivateChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.getData();
  }

  getData = async () => {
    const phone = await AsyncStorage.getItem('user');
    const name = await AsyncStorage.getItem('name');

    await this.setState({
      phoneSelf: phone,
      nameSelf: name
    });
  };

  componentWillMount() {
    firebase
      .database()
      .ref('messages')
      .child(this.props.navigation.state.params.id)
      .on('child_added', value => {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, value.val()),
          isLoading: false
        }));
      });
  }

  onSend(messages = []) {
    let msgId = firebase
      .database()
      .ref('messages')
      .child(this.props.navigation.state.params.id)
      .push().key;
    let updates = {};
    let message = {
      _id: msgId,
      text: messages[0].text,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      user: {
        _id: this.state.phoneSelf,
        name: this.state.nameSelf
      }
    };

    updates[
      'messages/' + this.props.navigation.state.params.id + '/' + msgId
    ] = message;

    firebase
      .database()
      .ref()
      .update(updates);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fafafa'
        }}
      >
        <Header
          data={this.props.navigation.state.params}
          navigation={this.props.navigation}
        />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.phoneSelf
          }}
        />
      </View>
    );
  }
}

export default withNavigation(PrivateChat);
