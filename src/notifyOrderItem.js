import React, {
  Component
} from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
var apiBaseUrl = "http://192.168.43.47:8080/user/";


class NotifyOrderItem extends Component {

  constructor(props) {
      super(props);
      this.recordNotifyResponse = this.recordNotifyResponse.bind(this);
  }

  recordNotifyResponse(txnId, userId, recordUserResponse) {
    var payload = {
      "txnId": txnId,
      "userResponse": recordUserResponse
    };
    apiBaseUrl = apiBaseUrl +  userId + '/notifications';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify(payload),
      url: apiBaseUrl
    };

    axios(options).then(function (response) {
     if(response.data.code == 200) {
      console.log(response.status);
    }}).catch(err => {
      console.log("Error Occurred");
    });
  }

   render() {
    const propsInfo = this.props;
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
            <button onClick={e => this.recordNotifyResponse(propsInfo.details.txnId, "user",1)}>Yes</button>
            <button onClick={e => this.recordNotifyResponse(propsInfo.details.txnId, "user",0)}>No</button>
        </div>
    );
  }
}

export default NotifyOrderItem;
