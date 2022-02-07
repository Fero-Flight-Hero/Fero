import React from 'react'
var ForgetAccount = (props) => (
    <div id='forget-div' >
         <div class="p-3 bg-dark text-white" id='top-bar-login'></div>
         <div class="modal modal-tour position-static d-block bg-secondary py-5">
         <div class="modal-content rounded-6 shadow" id='forget-sub' >
         <div class="modal-body p-5" >
        <h1 class="fw-bold mb-0">Find Your Account</h1>
       <h3> Please enter your email to reset your password </h3>
      
        <input class="form-control" type="text" placeholder='jhon-doe@domain.com' onChange={props.change} name='username' />
        
        <button class="btn btn-lg btn-primary mt-5 w-100" onClick={props.get}>Reset Password</button>
        <p name='signup' onClick={()=>props.changeView('signup')}>create new account</p>
         </div>
         </div>
         </div>
         <div class="p-3 bg-dark text-white"></div>
    </div>
)
export default ForgetAccount