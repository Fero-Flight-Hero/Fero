import React from 'react'
var Login = (props) => (
    <div >
      {/* <h1 id="p">FLYDO </h1>  */}
      <div className="p-3 bg-dark text-white" id='top-bar-login'></div>
      <div id="modalSignin" className=' modal modal-signin position-static d-block bg-secondary py-5'>
      <div className="modal-dialog" role="document">
    <div className="modal-content rounded-5 shadow">
    <div className="modal-body p-5 pt-0">
        <form   >
          <div className='form-floating mb-3'>
          <input className ="form-control rounded-4" id="floatingInput" name='email' onChange={props.change}  type="email" placeholder="Enter email" /> <br /> <br />
          <input className="form-control rounded-4" id="floatingPassword" name='password' onChange={props.change}  type="password" placeholder="Enter password"/>
          </div>
        </form>
        <div>
          <button className="w-100 mb-2 btn btn-lg rounded-4 btn-primary" onClick={props.enterAccount} >login</button>
        <button  className="w-100 mb-2 btn btn-lg rounded-4 btn-primary" onClick={()=>props.changeView('signup')}>SignUp</button>
        </div>
      <p className="text-muted" onClick={()=>props.changeView('forgetaccount')}>Forgot Email/Password?</p>
      </div>
      <div>
      </div>
      </div>
      </div>
      </div>
        <div className="p-3 bg-dark text-white" id='bot-bar-login'></div>

    </div>
  
    
)
export default Login