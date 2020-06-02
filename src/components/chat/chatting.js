import React, { Component } from "react";
import { GiftedChat, Composer, Send } from 'react-web-gifted-chat';
import ls from 'local-storage'
import Loader from 'react-loader-spinner'
import { db, storage } from '../../config/firebase'
const chatRef = db.collection("CHAT");

export default class Chatting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chatID: props.chatID,
      designer: ls.get('user'),
      loading: true,
      img: "",
      uploading: false,
      text: "",
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

  // Image select
  imageSelect = (e) => {
    let fullPath = e.target.files[0];
    this.setState({
      img: fullPath,
      text: `Image(${fullPath.name})`,
    });
  };
  // Uploading image to firebase
  uploadImage = async (image) => {
    const imageRef = storage.ref(`/chat-img/${image.name}`);
    await imageRef.put(image).catch((error) => {
      throw error;
    });
    const url = await imageRef.getDownloadURL().catch((error) => {
      throw error;
    });
    return url;
  };

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

  onSend(messages = []) {
    let { chatID, img, designer } = this.state;
    // let client = JSON.parse(localStorage.getItem("logged"));
    // console.log('IM', fileName, 'PA', img, messages)
    if (img.length == 0) {
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
    } else {
      this.setState({ uploading: true });
      this.uploadImage(img).then((url) => {
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
            type: "image",
            image: url,
          };
          this.sendMessage(message, chatID).then((msg) => {});
          
          this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
            img: "",
            text: "",
          }));
        });
        this.setState({ uploading: false });
      });
    }
  }

  renderSend = (props) => {
    if (!props.text.trim()) {
      return (
        <i
          class="fa fa-paper-plane"
          style={{ fontSize: "25px", color: "#FF9944", paddingRight: 10, marginBottom: 9 }}
        />
      );
    }
    if (this.state.uploading) {
      return <Loader type="ThreeDots" color="FF8084" height={40} width={40} />;
    }
    return (
      <Send {...props}>
        <div style={{ paddingRight: 10 }}>
          <i
            class="fa fa-paper-plane"
            style={{ fontSize: "25px", color: "#FF9944" }}
          />
        </div>
      </Send>
    );
  };

  renderComposer = (props) => {
    return (
      <div className="composer">
        <div className="image-upload">
          <label for="file-input">
            <i
              class="fa fa-image"
              style={{ fontSize: "25px", color: "#FF9944", paddingLeft: 10 }}
            />
          </label>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={this.imageSelect}
          />
        </div>
        <Composer {...props} />
      </div>
    );
  };

  render() {
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
              <>
                <GiftedChat
                  text={this.state.text}
                  onInputTextChanged={(text) =>
                    this.state.uploading
                      ? this.setState({ text: "Sending..." })
                      : this.setState({ text })
                  }
                  messages={this.state.messages}
                  onSend={(messages) => this.onSend(messages)}
                  renderSend={this.renderSend}
                  renderComposer={this.renderComposer}
                  user={{
                    id: this.state.designer.id,
                  }}
                />
                {this.state.uploading && (
                  <div style={{ paddingLeft: "10px", color: "green" }}>
                    Sending...
                  </div>
                )}
              </>
        }
      </>
    )
  }
}