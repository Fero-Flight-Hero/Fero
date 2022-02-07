import React from 'react'
var Newgoal = (props) => (
    <div>
        <h1>New goal</h1>
        <label htmlFor="">Departure</label>
        <input type="div" name='departure' value={props.value} onChange={props.onChange} />
        <label htmlFor="">Airport</label>
        <select name='nameAirport' onChange={props.change}>
            <option value="">select airport</option>
            {
                props.predictions.map((item, index) => (
                    <option value={item} key={index + item}>{item}</option>
                ))
            }
        </select>
        <label htmlFor="">FROM</label>
        <input type="date" name='from' onChange={props.change} />
        <label htmlFor="">TO</label>
        <input type="date" name='to' onChange={props.change} />
        <label htmlFor="">budget</label>
        <input type="number" name='budget' onChange={props.change} />
        <button onClick={props.search}>SEARCH</button>
        <button onClick={props.addgoal}>Save Your Goal</button>
        {props.alertlogin===0&&<p>Login please</p>}
        {/* <p onClick={() => props.changeViewOptions(0)}>Cancel</p> */}
    </div>
)
export default Newgoal