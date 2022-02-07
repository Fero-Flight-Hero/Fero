import React from 'react';
import $ from 'jquery';
import List from './List.jsx';

import Newgoal from './Newgoal.jsx';
import { Image } from 'cloudinary-react';

var Home = (props) => {
    return (
        <div  >
           <div >

            <nav className="p-3 bg-dark text-white" id='nav-bar' >
                {props.person.lastName === undefined && <button className='btn btn-outline-light me-2' onClick={() => props.changeView('login')}>Login</button>}
             
                {props.person.lastName !== undefined &&<Image onClick={() => props.changeView('profil')} id="pic" width="55" height="55" className="rounded-circle" cloudName='magico' public_id={props.person.image} />   }           
                {props.person.lastName !== undefined && <h4 id='welcome'>Welcome {props.person.firstName} !</h4>}
                {props.person.lastName !== undefined && <button id='btn-disconnect' className='btn btn-outline-light me-2' onClick={props.disconnect}>sign out</button>}

            </nav>
           </div>





            {props.viewoption === 1 && <Newgoal alertlogin={props.alertlogin} search={props.search} onChangeselection={props.onChangeselection} viewAirport={props.viewAirport} predictions={props.predictions} value={props.value} onChange={props.onChange} changeViewOptions={props.changeViewOptions} addgoal={props.addgoal} change={props.change} changevalue={props.changevalue} />}


            <List deletegoal={props.deletegoal} items={props.items} person={props.person} selectPersonSearch={props.selectPersonSearch} />


        </div>)

}
export default Home