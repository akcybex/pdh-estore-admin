import React, { Component } from "react";
import { GiftedChat } from 'react-web-gifted-chat';
import ls from 'local-storage'
import Loader from 'react-loader-spinner'
import {db} from '../../config/firebase'
const chatRef = db.collection("CHAT");

export default class Chatting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chatID: props.chatID,
      designer: ls.get('user'),
      loading: true,
    }
  }

  componentDidMount() {
    let { chatID } = this.state;
    
    chatRef
      .doc(chatID)
      .collection("MESSAGES")
      .orderBy("createdAt", "desc")
      .onSnapshot((data) => {
        const list = data.docs.map((documentSnapshot) => {
          return {
          ...documentSnapshot.data(),
          };
        });
        this.setState({
          messages: list,
          loading: false,
        });
      });
    
  }

  //send chat message
sendMessage = (data, id) => {
  return chatRef
          .doc(id)
          .collection("MESSAGES")
          .add(data)
          .then((data) => {
            return data;
          })
          .catch((err) => {
            return false;
          });
};
  // onSend(messages = []) {
  // this.setState((previousState) => ({
  // messages: GiftedChat.append(previousState.messages, messages),
  // }));
  // }
  onSend(messages = []) {
    let { chatID, fileName, img, designer } = this.state;
    // let client = JSON.parse(localStorage.getItem("logged"));
    // console.log('IM', fileName, 'PA', img, messages)
    // if (img.length == 0) {
    messages.forEach((item) => {
      const message = {
        id: item.id,
        text: item.text,
        createdAt: new Date().getTime(),
        user: {
          id: designer.id,
          name: designer.name,
          avatar: designer.image == null ? "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png" :designer.image,
        },
        type: "text",
        image: "",
      };
      this.sendMessage(message, chatID).then((msg) => {
          // console.log('MESG', msg)
        })
        .catch((err) => {
          // console.log('ERR', err)
        });
    });
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    // } else {
    // this.setState({ uploading: true });
    // this.uploadImage(img, fileName).then((url) => {
    // this.setState({ uploading: false });
    // messages.forEach((item) => {
    // const message = {
    // _id: item._id,
    // text: item.text == "" ? "attachment" : item.text,
    // createdAt: new Date().getTime(),
    // user: {
    // _id: client.id,
    // name: client.name,
    // avatar: client.image,
    // },
    // type: "image",
    // image: url,
    // };
    // sendMessage(message, key)
    // .then((msg) => {
    // // console.log('MESG', msg)
    // })
    // .catch((err) => {
    // // console.log('ERR', err)
    // });
    // });
    // this.setState((previousState) => ({
    // messages: GiftedChat.append(previousState.messages, messages),
    // img: "",
    // }));
    // });
    // }
  }

  render() {
    console.log('DD', this.state.designer.id)
    let {loading} = this.state
    return (
      <>
      {loading ?
              <div
                style={{
                    width: "100%",
                    height: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
              >
                <Loader type="ThreeDots" color="#FF8084" height="100" width="100" />

              </div> :
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          id: this.state.designer.id,
        }}
      />
      }
      </>
    )
  }
}