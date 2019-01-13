import React, { Component } from 'react';
import axios from 'axios';
import OrderItemList from './orderItemList';
import { confirmAlert } from 'react-confirm-alert';


class TimeComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            test: (Date.now()%10000),
            time: Date.now(),
            firstime: 1,
            allUpcomingOrders :[]
        };
        this.getall = this.getall.bind(this);
    }
    componentDidMount() {
        let getdata = this.getall();
        this.interval = setInterval(() => this.getall(), 7123);
    }
    componentWillUnmount() {
        let getdata = this.getall();
        clearInterval(this.interval);
    }

    getall(){
      var apiBaseUrl = "http://192.168.43.47:8080/notifications/" + this.props.userid;
     const options = {
       method: 'GET',
       headers: {
         'content-type': 'application/json'
       },
       url: apiBaseUrl
     };
     axios(options).then(function (response) {
      if (response.data.code == 200) {
        confirmAlert({
          title: 'User Confirm your order',
          message: 'Are you sure to do this.',
          buttons: [{
              label: 'Yes',
              onClick: () => alert('Click Yes')
            },
            {
              label: 'No',
              onClick: () => alert('Click No')
            }
          ]
        })
        console.log(this.state.time);
            // var mytime = Date.now();
            // var test = mytime%10000;
            // this.setState({
            //     allUpcomingOrders : response.data.allUpcomingOrders,
            //     temp : 1,
            //     test: test,
            //     time: mytime
            // });
            console.log(response.status);
      }
        }).catch(err => {
            console.log("Error Occurred");
        });
    }



    render(){
        console.log(JSON.stringify(this.state));
        return(
            <div>
                {
                    (this.state.firstime && this.state.firstime ==1)
                        ?
                        <div>
                            <OrderItemList upcomingOrders={this.state}/>
                        </div>
                        :
                        <div>
                            <OrderItemList upcomingOrders={this.state}/>
                        </div>

                }

            </div>
        );
    }
}

export default TimeComponent;