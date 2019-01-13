import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { InputLabel, FormControl } from '@material-ui/core';
var apiBaseUrl = "http://192.168.43.47:8080/login/";

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      userid: this.props.userid,
      password: '',
      status: ''
    };
    this.getContent = this.getContent.bind(this);
  }

  handleClick(event){
    var that = this;
    var payload={
      "userid": this.state.userid,
	    "password":this.state.password
    };
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(payload),
      url: apiBaseUrl
    };

    axios(options).then(function (response) {
     console.log(response);
     if(response.data.code == 200){
       console.log("Login successfully");
       that.props.updateLoggedIn(true);
       that.props.updateUserId(that.state.userid);
       that.setState({
         status: ''
       });
      } else if(response.data.code == 204){
       console.log("Username password do not match");
       that.setState({
         status: 'Username password do not match'
       });
       that.props.updateLoggedIn(false);
     } else{
       console.log("Username does not exists");
       that.props.updateLoggedIn(false);
       that.setState({
         status: 'Username does not exists'
       });
     }
   }).catch(function (error) {
     console.log(error);
     that.setState({
       status: 'Some error exists'
     });
   });
  }

  getContent() {
    return (<React.Fragment>
      <MuiThemeProvider>
        <div>
         <TextField
           hintText="Enter your UserName"
           floatingLabelText="User Name"
           onChange = {(event,newValue)=>this.setState({userid:newValue})}
           />
         <br/>
           <TextField
             type="password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
           <br/>
           <FormControl variant = "outlined" >
           <InputLabel>{this.state.status}</InputLabel>
           </FormControl>
       </div>
       </MuiThemeProvider>
    </React.Fragment>)
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
        <AppBar title="Login"/>
        </MuiThemeProvider>
        {this.getContent()}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;
