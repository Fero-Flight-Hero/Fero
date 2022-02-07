import React from 'react';
var SignUp = (props) => (
    <div class="modal-content rounded-5 shadow" id="signup-div">
    <div >
    <div class="modal modal-tour position-static d-block bg-secondary py-5">
         <div class="modal-content rounded-6 shadow"  >
         <div class="modal-body p-5" >
        {/* <form  id="input" > */}
        <h1>SignUp</h1>
<div >

        <label  htmlFor=""></label>
        <input placeholder='first name' class="form-control" id="inputEmail4" type="text" name='firstName'onChange={props.change}/>
        <label htmlFor=""></label>
        <input placeholder='last name' class="form-control" id="inputPassword4" type="text" name='lastName'onChange={props.change}/>
        <label htmlFor=""></label>
        <input placeholder='email' class="form-control" id="inputPassword4" type="email" name='email'onChange={props.change}/>
        <label htmlFor=""></label>
        <input placeholder='password' class="form-control" id="inputPassword4" type="password" name='password'onChange={props.change} />
        <label htmlFor=""></label>
        <input placeholder='date of birth' class="form-control" type="date" name='dob'onChange={props.change}/>
        <label htmlFor=""></label>
        <input placeholder='country' type="text" class="form-control" name='country'onChange={props.change}/>
        <label htmlFor=""></label>
        <input placeholder='phone number' type="number" class="form-control" name='phoneNumber'onChange={props.change}/>
        <label htmlFor=""></label>
        <input placeholder='profile picture' class="form-control" type="file" name='image'onChange={props.changefile} />
        
        <button class="w-100 mb-2 btn btn-lg rounded-4 btn-primary" id="but-signup" onClick={props.newAccount}>SignUp</button>
        <p name='login' class="w-100 mb-2 btn btn-lg rounded-4 btn-primary" onClick={()=>props.changeView('login')}>Login</p>
        {/* </form> */}
</div>
    </div>
    </div>
    </div>
    </div>
    </div>

)
export default SignUp