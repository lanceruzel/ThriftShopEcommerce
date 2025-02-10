import { Link } from 'react-router-dom'

function SignUpPage() {
  return (
    <div className="container mx-auto my-5 d-flex justify-content-center align-items-center">
      <form className='bg-white p-4 rounded-2 border shadow'>
        <h1>Sign Up</h1>
        
        <div className='row row-cols-1 row-cols-md-2'>
          <div className="col">
            <div className="mb-3">
              <label className="form-label">Fist Name</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="col">
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Contact</label>

          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">+63</span>
            <input type="text" className="form-control" placeholder="999-9999-999" />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input type="password" className="form-control" />
        </div>

        <button type="submit" className="btn btn-dark w-100">Sign Up</button>

        <div className='mt-4 text-center'>
          <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
        </div>
      </form>
    </div>
  )
}

export default SignUpPage