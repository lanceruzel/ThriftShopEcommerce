function AccountManagementUpdatePage() {
  return (
    <>
      {/* Header */}
      <div className='fw-normal lh-sm'>
        <p className='fs-1 m-0'>Update Account</p>
        <p className='fs-5 text-black-50'>Modify user account's details</p>
      </div>

      <div className='d-flex justify-content-center align-items-center'>
        <form style={{ width: '24rem' }}>
          <div className="mb-3">
            <label className="form-label">Fist Name</label>
            <input type="text" className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Contact</label>

            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">+63</span>
              <input type="text" className="form-control" placeholder="999-9999-999" />
            </div>
          </div>

          <button type="submit" className="btn btn-dark w-100">Update</button>
        </form>
      </div>
    </>
  )
}

export default AccountManagementUpdatePage