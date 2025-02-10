import React from 'react'
import { Link } from 'react-router-dom'

function SignInPage() {
  return (
    <div className="container mx-auto py-5 d-flex justify-content-center align-items-center">
      <form className='bg-white p-4 rounded-2 border shadow' style={{ width: '24rem' }}>
        <h1>Sign In</h1>
        
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" />
        </div>

        <div className="mb-3">
          <div className='d-flex justify-content-between'>
            <label className="form-label">Password</label>
            <a href='/'>Forgot Password?</a>
          </div>
          <input type="password" className="form-control" />
        </div>

        <button type="submit" className="btn btn-dark w-100">Sign In</button>
        
        <div className='mt-4 text-center'>
          <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
        </div>
      </form>
    </div>
  )
}

export default SignInPage