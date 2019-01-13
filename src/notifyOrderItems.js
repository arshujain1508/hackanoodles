import React, {Component} from 'react';
import NotifyOrderItem from './notifyOrderItem';
import axios from 'axios';
var apiBaseUrl = "http://192.168.43.47:8080";

class NotifyOrderItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUpcomingOrders: []
    }
    this.getall = this.getall.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.getall(), 12000);
  }

  componentWillUnmount() {
    // let getdata = this.getall();
    clearInterval(this.interval);
  }

  getall() {
    var that = this;
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      url: apiBaseUrl  +"/notifications/" + this.props.userid
    };

    axios(options).then(function (response) {
      if (response.status == 200) {
        that.setState({
          allUpcomingOrders: response.data.allUpcomingOrders,
        });
      }
    }).catch(err => {
      console.log("Error Occurred in getting orders for a user");
    });
  }

  render() {
   let orderedItems = this.state.allUpcomingOrders.map((obj) => {
            return <NotifyOrderItem details = {obj}/>;
        });
        return (
            <div>
            <div className="main-title"><h1>All Upcoming Orders</h1></div>
            <div className="orderlist">
                <span>{orderedItems}</span>
            </div>
            </div>
        );
  }
}

export default NotifyOrderItems;