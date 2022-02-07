import React from 'react';

const ListItem = (props) => (
  <div>
    
    <h5>Origin { props.item.origin }</h5> 
    <h5>Destination: { props.item.destination}</h5>
    <li> From : { props.item.departureDate }</li> 
    <li> To : { props.item.returnDate }</li>
    <h6> Price{ props.item.price}</h6>
  </div>
)

export default ListItem;