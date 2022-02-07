import React from 'react';
import { Image } from 'cloudinary-react';
var Profil =(props)=>{
return(
    <div>
        <li>First name : {props.person.firstName}</li> 
        <li>Last name : {props.person.lastName}</li>
        <li>date of birth : {props.person.dob}</li>
        <li> email : {props.person.email} </li>
        image : <Image className='img' cloudName='magico' public_id={props.person.image} />
        <li>country : {props.person.country}</li>
        
        <button onClick={()=>props.changeView('home')}>Home</button>
    </div>
)
}
export default Profil