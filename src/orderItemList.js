import React, { Component } from 'react';
import OrderItem from './order';

class OrderItemList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let orderedItems = this.props.upcomingOrders.allUpcomingOrders.map((obj) => {
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