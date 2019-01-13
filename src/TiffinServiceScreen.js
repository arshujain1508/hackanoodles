import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Register from './Register';
import OrderItemList from './orderItemList';
import NotifyOrderItems from './notifyOrderItems';
import _ from 'underscore';

const style = {
  margin: 15,
};

class TiffinServiceScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedButton : 'register'
    }
    this.getContent = this.getContent.bind(this);
  }

  handleClick(event,selectedButton){
    console.log("event", selectedButton);
    this.setState({
      selectedButton : selectedButton
    });
  }

  getContent() {
    if(_.isEqual(this.state.selectedButton,'register')) {
        return (<React.Fragment><Register userid={this.props.userid}/></React.Fragment>);
    } else if((_.isEqual(this.state.selectedButton, 'saved'))) {
        return <React.Fragment><OrderItemList userid={this.props.userid}/></React.Fragment>
    } else {
      return <React.Fragment><NotifyOrderItems userid={this.props.userid} /></React.Fragment>
    }
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
             <RaisedButton label={"Register or Update Schedule"} primary={true} style={style} onClick={(event) => this.handleClick(event,'register')}/>
             <RaisedButton label={"View Saved Schedule"} primary={true} style={style} onClick={(event) => this.handleClick(event,'saved')}/>
             <RaisedButton label={"View Current Notifications"} primary={true} style={style}
             onClick={(event) => this.handleClick(event,'notifications')}/>
         </div>
         <div>{this.getContent()}</div>
         </MuiThemeProvider>
      </div>
    );
  }
}


export default TiffinServiceScreen;
