import React, { useState } from 'react'
import {
  Content,
} from 'carbon-components-react/lib/components/UIShell'
import { ReactFlvPlayer } from 'react-flv-player'
import { TextInput, Button, Form } from 'carbon-components-react'
import { Send32 } from '@carbon/icons-react'
const fetch = require('node-fetch')
var ScrollArea = require('react-scrollbar');

class Player extends React.Component {

  getmessages = () => {
    return new Promise((resolve, reject) => {
      fetch(this.state.chatLink)
        .then(r => { resolve(r.json()) })
        .catch(e => reject(e))
    })
  }

  constructor(props) {
    super(props)
    console.log(props.chatLink)
    console.log(props.videoLink)
    this.state = {
      messagesList: [],
      playerHeight: 0,
      formHeight: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      inputValue: "",
      chatLink: props.chatLink,
      streamLink: props.videoLink
    }
  }

  componentDidMount() {
    this.fetchData();
    this.timer = setInterval(this.fetchData, 2000)
    this.timer = setInterval(this.updateCSS, 20)
    window.addEventListener('resize', this.handleWindowSizeChange)
    const playerHeight = this.divElement.clientHeight
    this.setState({ playerHeight })
    const formHeight = this.formElement.clientHeight
    this.setState({ formHeight })
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  fetchData = () => {
    this.getmessages().then(r => { this.setState({ messagesList: r }) })
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth })
    this.setState({ width: window.innerHeight })
    const playerHeight = this.divElement.clientHeight
    this.setState({ playerHeight })
    const formHeight = this.formElement.clientHeight
    this.setState({ formHeight })
  };

  submitMessage = (event) => {
    event.preventDefault()
    fetch(this.state.chatLink + '?message=' + this.state.inputValue).then(this.setState({ inputValue: "" }))
    this.fetchData()
    alert("Message submitted")
  }

  render = () => {
    const { width } = this.state;
    const isMobile = width <= 500;

    if (isMobile) {
      return (
        <div className="container bx--theme--g100">
          <Content id="main-content" style={{ 'backgroundColor': 'transparent' }} style={{ 'height': '100%' }}>
            <table style={{ "width": "100%", "height": "100%" }}>
              <tbody>
                <tr>
                  <td style={{ "width": "70%" }}>
                    <div style={{ "padding": "10px", "margin": "10px", "backgroundClip": "padding-box", "backgroundColor": "#FFFFFF", "height": "100%" }} className="test" ref={(divElement) => { this.divElement = divElement }}>
                      <ReactFlvPlayer url={this.state.streamLink} heigh="100%" width="100%" isMuted={true} style={{ "padding": "10px" }} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ "width": "30%", "verticalAlign": "top" }}>
                    <div style={{ "padding": "10px", "margin": "10px", "backgroundClip": "padding-box", "backgroundColor": "#FFFFFF", "height": this.state.playerHeight }}>
                      <div style={{ 'overflowY': 'scroll', "height": this.state.playerHeight - this.state.formHeight - 50 }}>
                        <ul>
                          {this.state.messagesList.map((item, index) => (
                            <li key={index} style={{ 'padding': '5px' }}>
                              <p style={{ 'fontFamily': 'Candara', 'fontWeight': 'normal', 'fontSize': '1vw', 'color': '#808080', 'paddingBottom': '0px', 'height': '1.5vw' }}>{item.date}</p>
                              <p style={{ 'fontFamily': 'Candara', 'fontWeight': 'normal', 'fontSize': '1vw', 'color': '#000000', 'paddingTop': '0px', 'height': '1.5vw' }}>{item.content}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <br />
                      <div className="test" ref={(divElement) => { this.formElement = divElement }}>
                        <Form onSubmit={this.submitMessage} style={{ 'alignContent': 'center', 'width': '100%', 'paddingBottom': '0px', "verticalAlign": "bottom", 'height': '0' }}>
                          <td style={{ "width": "100%", 'display': 'inline-flex' }}>
                            <TextInput
                              id="Message_Box"
                              placeholder="Message"
                              style={{ 'fontFamily': 'Candara', 'fontWeight': 'normal', 'fontSize': '1.5vw' }}
                              onChange={evt => this.updateInputValue(evt)}
                              value={this.state.inputValue}
                            />
                            <Button
                              style={{ 'backgroundColor': '#005eb8', 'fontSize': '1.5vw' }}
                              hasIconOnly
                              renderIcon={Send32}
                              tooltipAlignment="center"
                              tooltipPosition="bottom"
                              iconDescription="Send Message"
                              size='field'
                              type="submit"
                            />
                          </td>
                        </Form>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </Content>
        </div>
      )
    }
    else {
      return (
        <div className="container bx--theme--g100">
          <Content id="main-content" style={{ 'backgroundColor': 'transparent' }}>
            <table style={{ "width": "100%", "height": "100%" }}>
              <tbody>
                <tr>
                  <td style={{ "width": "70%" }}>
                    <div style={{ "padding": "10px", "margin": "10px", "backgroundClip": "padding-box", "backgroundColor": "#FFFFFF", "height": "100%" }} className="test" ref={(divElement) => { this.divElement = divElement }}>
                      <ReactFlvPlayer url={this.state.streamLink} heigh="100%" width="100%" isMuted={true} style={{ "padding": "10px" }} />
                    </div>
                  </td>
                  <td style={{ "width": "30%", "verticalAlign": "top" }}>
                    <div style={{ "padding": "10px", "margin": "10px", "backgroundClip": "padding-box", "backgroundColor": "#FFFFFF", "height": this.state.playerHeight }}>
                      <div style={{ 'overflowY': 'scroll', "height": this.state.playerHeight - this.state.formHeight - 75 }}>
                        <ul>
                          {this.state.messagesList.map((item, index) => (
                            <li key={index} style={{ 'padding': '5px' }}>
                              <p style={{ 'fontFamily': 'Candara', 'fontWeight': 'normal', 'fontSize': '1vw', 'color': '#808080', 'paddingBottom': '0px', 'height': '1.5vw' }}>{item.date}</p>
                              <p style={{ 'fontFamily': 'Candara', 'fontWeight': 'normal', 'fontSize': '1vw', 'color': '#000000', 'paddingTop': '0px', 'height': '1.5vw' }}>{item.content}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <br />
                      <div ref={(divElement) => { this.formElement = divElement }}>
                        <Form onSubmit={this.submitMessage} style={{ 'alignContent': 'center', 'width': '100%', 'paddingBottom': '0px', "verticalAlign": "bottom", 'height': '0' }}>
                          <td style={{ "width": "100%", 'display': 'inline-flex' }}>
                            <TextInput
                              id="Message_Box"
                              placeholder="Message"
                              style={{ 'fontFamily': 'Candara', 'fontWeight': 'normal', 'fontSize': '1.5vw' }}
                              onChange={evt => this.updateInputValue(evt)}
                              value={this.state.inputValue}
                              labelText=""
                            />
                            <Button
                              style={{ 'backgroundColor': '#005eb8', 'fontSize': '1.5vw' }}
                              hasIconOnly
                              renderIcon={Send32}
                              tooltipAlignment="center"
                              tooltipPosition="bottom"
                              iconDescription="Send Message"
                              size='field'
                              type="submit"
                            />
                          </td>
                        </Form>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </Content>
        </div>
      )
    }
  }
}

export default Player