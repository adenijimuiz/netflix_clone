import React, { useState } from 'react'
import './login.css'
import logo from '../../assets/logo.png'

const Login = () => {
  const [signState, setSignState] = useState('Sign In')

  
  return (
    <div className='login'>
      <img src={logo} alt="logo" className='login-logo' />
      <div className="login-form">
        <h1>{signState}</h1>
        <form >
          {signState === 'Sign Up' ? <div className='username'>
              <label htmlFor="">Username</label>
              <input type="text" placeholder='Your Username'/>
            </div> : <></>
          }
          <label htmlFor="">Email</label>
          <input type="email" placeholder='Email'/>
          <label htmlFor="">Password</label>
          <input type="password" placeholder='Enter Password' />
          <button>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label for="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === 'Sign In' ? <p>New to Netflix? <span onClick={() => {setSignState('Sign Up')}}>Sign Up Now</span></p> : <p>Already have account? <span onClick={() => {setSignState('Sign In')}}>Sign In Now</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login