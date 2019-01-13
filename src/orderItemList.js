import React, { Component } from 'react';
import OrderItem from './order';
import axios from 'axios';

class OrderItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          allUpcomingOrders : []
        }
    }

    componentWillMount() {
      var apiBaseUrl = "http://192.168.43.47:8080/user/";
      var that = this;
      apiBaseUrl = apiBaseUrl + this.props.userid + "/orders";
      const options = {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
        url: apiBaseUrl
      };

      axios(options).then(function (response) {
        if (response.status == 200) {
          console.log("Arshu" + JSON.stringify(response.data.allUpcomingOrders));
          that.setState({
            allUpcomingOrders: response.data.allUpcomingOrders
          });
        }
      }).catch(err => {
        console.log("Error Occurred in getting orders for a user");
      });
    }

    render() {
        let orderedItems = this.state.allUpcomingOrders.map((obj) => {
            return <OrderItem details = {obj}/>;
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

export default OrderItemList;