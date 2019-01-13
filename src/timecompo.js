import React, { Component } from 'react';
import axios from 'axios';
import OrderItemList from './orderItemList';


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
        console.log(this.state.time);
        axios.get('http://192.168.43.47:8080/user/sjha77/orders').then(response =>  {
            var mytime = Date.now();
            var test = mytime%10000;
            this.setState({
                allUpcomingOrders : response.data.allUpcomingOrders,
                temp : 1,
                test: test,
                time: mytime
            });
            console.log("Idhaar");
            console.log(response.status);
        }).catch(err => {
            console.log("Error Occurred");
        });
    }



    render(){
        var myItems = {
            allUpcomingOrders : [
                {
                    txnId : "Default",
                    addressInfo : {
                        addressId : "addr1",
                        name : "Bangalore"
                    },
                    time : "12-01-2019 09:00:00",
                    resturantInfo : {
                        id : "rst1",
                        name : ""+(this.state.time%10000),
                        rating : "4"
                    },
                    foodItems : [
                        {
                            foodItemId : "foodId1",
                            name : "Dal",
                            quantity :1
                        },
                        {
                            foodItemId : "foodId2",
                            name : "Roti",
                            quantity :5
                        }
                    ]
                },
                {
                    txnId : "txn2",
                    addressInfo : {
                        addressId : "addr2",
                        name : "HSR"
                    },
                    time : "12-01-2019 10:00:00",
                    resturantInfo : {
                        id : "rst2",
                        name : "Udupi",
                        rating : "4"
                    },
                    foodItems : [
                        {
                            foodItemId : "foodId3",
                            name : "Vada",
                            quantity :6
                        },
                        {
                            foodItemId : "foodId4",
                            name : "Sambhar",
                            quantity :1
                        }
                    ]
                }
            ]
        };

        console.log(JSON.stringify(this.state));
        return(
            <div>
            <div> { this.state.time } </div>
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