import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const OrderItem = (propsInfo) => {
    console.log(JSON.stringify(propsInfo));
    let foodItems = propsInfo.details.foodItems.map((obj) => {
        return (<div id={obj.foodItemId}>
            <td>
            <span>{obj.name}</span>
            </td>
            <td>
            <span>{obj.quantity}</span>
            </td>
        </div>);
    });
    return (
        <div className="col-xs-12 col-md-12 card-container">
            <div className="card">
                <div className="card-block" id={propsInfo.details.txnId}>
                    <table>
                        <col width="130"/><col width="130"/><col width="130"/>
                        <tr>
                            <td>
                            <span className="card-title">{(propsInfo.details.time)?propsInfo.details.time:"test"}</span>
                            </td>
                            <td>
                                <div>{propsInfo.details.resturantInfo.name}</div>
                                <StarRatingComponent
                                    name="ono-rating"
                                    starCount={5}
                                    value={propsInfo.details.resturantInfo.rating}
                                />
                            </td>
                            <tr>
                            {foodItems}
                            </tr>
                            <td>
                                {propsInfo.details.addressInfo.name}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            {/*<button onClick={e => props.addToCart(props.data)}>ADD</button>*/}
        </div>
    );
};

export default OrderItem;
