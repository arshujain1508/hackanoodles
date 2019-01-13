import React, { Component } from 'react';
import _ from 'underscore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Input from '@material-ui/core/Input';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/SelectField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './App.css';
import {WEEK_DAYS, RESTAURANT, DISH, TIME} from './Consts.js';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      day: WEEK_DAYS[0],
      restaurant: RESTAURANT[0],
      dish: DISH[0],
      time: TIME[0],
      address: '',
      schedule : [],
      status : '',
      startDate : new Date(),
      endDate : new Date()
    }
    this.getUserDetails = this.getUserDetails.bind(this);
    this.getScheduleDetails = this.getScheduleDetails.bind(this);
    this.getAddedSchedule = this.getAddedSchedule.bind(this);
    this.getStartDate = this.getStartDate.bind(this);
    this.getEndDate = this.getEndDate.bind(this);
  }

  handleSubmit(){
    var apiBaseUrl = "http://192.168.43.47:8080/orders";
    var that = this;
    if(this.props.userid.length>0 && this.state.schedule.length>0) {
       var payload = {
         "userid": this.props.userid,
         "schedule": this.state.schedule,
         startDate : this.state.startDate,
         endDate : this.state.endDate
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
          console.log("registration successfull, tiffin service schedule added");
          that.setState({
            status : 'Registered Successfully'
          });
       } else{
         console.log("some error ocurred",response.data.code);
         that.setState({
           status: 'Not Registered. Some error occured'
         });
       }
     })
     .catch(function (error) {
       console.log(error);
       that.setState({
         status: 'Not Registered. Some error occured'
       });
     });
    }
    else{
      alert("Input field values are missing");
    }
  }

  handleDayChange(day) {
    this.setState({
      day: day
    });
  }

  handleRestaurantChange(restaurant) {
    this.setState({
      restaurant: restaurant
    });
  }

  handleAddDay() {
    if(!_.isEmpty(this.state.address)) {
      var newDaySchedule = {
        day: this.state.day,
        restaurant: this.state.restaurant,
        dish: this.state.dish,
        time: this.state.time,
        address: this.state.address,
      };

      var schedule = [...this.state.schedule];
      // if(!_.isEmpty(schedule)) {
      //   var scheduleIndex = -1;
      //   schedule.forEach(function(daySchedule,index) {
      //     if(daySchedule.day == newDaySchedule.day) {
      //       scheduleIndex = index;
      //     }
      //   });
      //   if (scheduleIndex != -1) {
      //     schedule[scheduleIndex] = newDaySchedule;
      //   } else {
      //     schedule.push(newDaySchedule);
      //   }
      // } else {
        schedule.push(newDaySchedule);
      //}
      this.setState({
        schedule : schedule,
        status : "Added schedule day."
      });
     } else {
       this.setState({
         status : "Address is Empty. Please add address."
       });
     }
  }

  getUserDetails() {
    return (<React.Fragment><div>
               <FormControl variant="outlined">
                  <InputLabel shrink htmlFor="userid-label-placeholder"><b>USERNAME</b></InputLabel>
                  <TextField
                      hintText="Enter your username"
                      input={<Input name="UserId" id="userid-label-placeholder" />}
                      onChange = {(event,newValue) => this.setState({userid:newValue})}
                  />
             </FormControl>
             </div>
             <div>
               <FormControl variant="outlined">
                  <InputLabel shrink htmlFor="password-label-placeholder"><b>PASSWORD</b></InputLabel>
                  <TextField
                      hintText="Enter your password"
                      type = "password"
                      input={<Input name="Password" id="password-label-placeholder" />}
                      onChange = {(event,newValue) => this.setState({password:newValue})}
                  />
              </FormControl>
             </div>
             </React.Fragment>
             );
  }

  getStartDate() {
    return (<React.Fragment>
      <InputLabel shrink htmlFor="startDate-label-placeholder"><b>Start Date</b></InputLabel>         
       <TextField
          hintText="Enter start Date"
          input={<Input name="startDate" id="startDate-label-placeholder" />}
          onChange = {(event,newValue) => this.setState({startDate:newValue})}
        ></TextField>
    </React.Fragment>);
  }

  getEndDate() {
    return (<React.Fragment>
     <InputLabel shrink htmlFor="endDate-label-placeholder"><b>End Date</b></InputLabel>    
       <TextField
          hintText="Enter end Date"
          input={<Input name="endDate" id="endDate-label-placeholder" />}
          onChange = {(event,newValue) => this.setState({endDate:newValue})}
        ></TextField>
    </React.Fragment>);
  }

  getScheduleDetails() {
      return (<React.Fragment>
        <Table class="table">
          <TableHead >
            <TableRow className="tableRowCenter">
              <TableCell></TableCell>
              <TableCell><InputLabel align="center"><b>TIFFIN SCHEDULE</b></InputLabel></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow className="tableRowCenter">
              <TableCell><InputLabel align="center"><b>DATE RANGE</b></InputLabel></TableCell>
              <TableCell>{this.getStartDate()}</TableCell>
              <TableCell>{this.getEndDate()}</TableCell>
            </TableRow>
            <TableRow/>
          </TableHead>
          <TableBody>
               <TableRow>
                <TableCell>
                 <FormControl variant="outlined">
                  <InputLabel shrink htmlFor="day-label-placeholder"><b>DAY</b></InputLabel>
                  <Select value = {this.state.day} 
                      onChange = {(event,index,value) =>this.handleDayChange(value)} 
                      input={<Input name="Day" id="day-label-placeholder" />}>
                    {
                      WEEK_DAYS.map(weekDay => <MenuItem key={weekDay} value={weekDay} primaryText={weekDay}/>)
                    }
                  </Select>
                 </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl variant="outlined">
                    <InputLabel shrink htmlFor="restaurant-label-placeholder"><b>RESTAURANT</b></InputLabel>
                    <Select value = {this.state.restaurant} 
                      onChange = {(event,index,value) =>this.handleRestaurantChange(value)} 
                      input={<Input name="Restaurant" id="restaurant-label-placeholder" />}>
                    {
                      RESTAURANT.map(restaurant => <MenuItem key={restaurant} value={restaurant} primaryText={restaurant}/>)
                    }
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl variant="outlined">
                    <InputLabel shrink htmlFor="Dish-label-placeholder"><b>DISH</b></InputLabel>
                    <Select value = {this.state.dish} 
                      onChange = {(event,index,value) =>this.setState({dish: value})} 
                      input={<Input name="Dish" id="dish-label-placeholder" />}>
                    {
                      DISH.map(dish => <MenuItem key={dish} value={dish} primaryText={dish}/>)
                    }
                  </Select>
                  </FormControl>
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell>
                  <FormControl variant="outlined">
                    <InputLabel shrink htmlFor="Time-label-placeholder"><b>TIME</b></InputLabel>
                    <Select value = {this.state.time} 
                      onChange = {(event,index,value) =>this.setState({time: value})} 
                      input={<Input name="Time" id="time-label-placeholder" />}>
                    {
                      TIME.map(time => <MenuItem key={time} value={time} primaryText={time}/>)
                    }
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl variant="outlined">
                    <InputLabel shrink htmlFor="address-label-placeholder"><b>ADDRESS</b></InputLabel>
                    <TextField
                      hintText="Enter your Address"
                      input={<Input name="Time" id="time-label-placeholder" />}
                      onChange = {(event,newValue) => this.setState({address:newValue})}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <RaisedButton label="Add Day" primary={true} style={style} 
                  onClick={() => this.handleAddDay()}/>
                  <div><InputLabel type="error">{this.state.status}</InputLabel></div>
                </TableCell>
              </TableRow>
             </TableBody>
            </Table>
          </React.Fragment>);
  }

  getTableCell(value) {
    return (<React.Fragment>
        <TableCell>
          <InputLabel>{value}</InputLabel>
        </TableCell>
      </React.Fragment>);
  }


  getAddedSchedule() {
    var addedSchedule = [];
    var schedule = [...this.state.schedule];
    for(var i = 0; i<schedule.length; i++) {
      addedSchedule.push(<TableRow>
        <TableCell><InputLabel>{schedule[i].day}</InputLabel></TableCell>
        <TableCell><InputLabel>{schedule[i].restaurant}</InputLabel></TableCell>
        <TableCell><InputLabel>{schedule[i].dish}</InputLabel></TableCell>
        <TableCell><InputLabel>{schedule[i].time}</InputLabel></TableCell>
        <TableCell><InputLabel>{schedule[i].address}</InputLabel></TableCell>
      </TableRow>);
    }

    if(!_.isEmpty(this.state.schedule)) {
        return (<React.Fragment>
          <Table class="table">
            <TableHead>
              <TableRow>
                {this.getTableCell('Day')}
                {this.getTableCell('Restaurant')}
                {this.getTableCell('Dish')}
                {this.getTableCell('Time')}
                {this.getTableCell('Address')}
                </TableRow>
            </TableHead>
            <TableBody>
              {addedSchedule}
            </TableBody>
          </Table>
      </React.Fragment>);
    }
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar title="Register"/>
           {<React.Fragment><br/><br/></React.Fragment>}
           {this.getScheduleDetails()}
            {<React.Fragment><br/><br/></React.Fragment>}
           {this.getAddedSchedule()}
           <RaisedButton label="Register" primary={true} style={style} 
           onClick={(event) => this.handleSubmit()}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Register;
