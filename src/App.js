import React, { Component } from 'react';
import TiffinServiceScreen from './TiffinServiceScreen'
import './App.css';
import Login from './Login';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isLoggedIn : false,
      userid : ''
    }
    this.updateLoggedIn = this.updateLoggedIn.bind(this);
    this.updateUserId = this.updateUserId.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  updateLoggedIn(value) {
     console.log("in logged in successfully");
    this.setState({
      isLoggedIn : value
    });
  }

  updateUserId(value) {
    console.log("in updte user id successfully");
    this.setState({
      userid: value
    });
  }

  getContent() {
    if(!this.state.isLoggedIn) {
      return (<React.Fragment><Login updateLoggedIn={this.updateLoggedIn} updateUserId={this.updateUserId} userid={this.state.userid}/></React.Fragment>);
    } else {
      return (<React.Fragment><TiffinServiceScreen userid={this.state.userid}/></React.Fragment>);
    }
  }

  render() {
    console.log(this.state.isLoggedIn);
    return (
      <div className="App">{this.getContent()}</div>
    );
  }
}

export default App;
