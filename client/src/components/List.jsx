import React from "react";
import ListItem from "./ListItem.jsx";

const List = (props) => (
  <div id='list'>
    {/* <h4>Your Goal: </h4> */}
    {/* <select name="" id="" onChange={props.selectionItem} >
      <option value=""></option>
       <option value='outlay' >First Goal</option>
      <option value="income" >Second Goal</option>
      <option value="goals" >THird Goal</option> 
    </select> */}

    {/* <div>
      <h4>Total Balance: {props.solde}</h4>
      <h4>Total INCOMES: {props.totalInc}</h4>
      <h4>Total OUTLAYS: {props.totalOut}</h4>
    </div> */}
    {props.person.lastName !== undefined &&
      props.person.search.map((elem, i) => (
        <div key={i}>
          <button value={i}  onClick={props.deletegoal}>Delete</button>
          <button value={i}  onClick={props.selectPersonSearch}>{elem.departure}/{elem.budget}</button>
        </div>))
    }
    There are {props.items.length} items.

    {props.items.map((item, index) => (
      <div>

        <div key={index}>
          <ListItem item={item} />
        </div>
      </div>

    ))}
  </div>
);

export default List;