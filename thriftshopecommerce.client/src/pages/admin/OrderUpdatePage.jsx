function OrderUpdatePage() {
    return (
        <>
            {/* Header */}
            <div className='fw-normal lh-sm'>
                <p className='fs-1 m-0'>Update Order</p>
                <p className='fs-5 text-black-50'>Modify user's order information</p>
            </div>

            <div className='container d-flex justify-content-center align-items-center'>
                <form className='w-100 row'>
                    {/* Account Details */}
                    <div className="col-12">
                        <p className='fs-5 m-0 fw-semibold'>Account Details</p>

                        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 px-1 ">
                            <div className="col">
                                <label className="form-label">Fist Name</label>
                                <input type="text" className="form-control" readOnly/>
                            </div>

                            <div className="col">
                                <label className="form-label">Last Name</label>
                                <input type="text" className="form-control" readOnly/>
                            </div>

                            <div className="col">
                                <label className="form-label">Email address</label>
                                <input type="email" className="form-control" readOnly/>
                            </div>

                            <div className="col">
                                <label className="form-label">Contact</label>

                                <div className="input-group">
                                    <span className="input-group-text">+63</span>
                                    <input type="text" className="form-control" placeholder="999-9999-999" readOnly/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="col-12">
                        <p className='fs-5 m-0 fw-semibold mb-2'>Order Details</p>

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className='text-center' scope="col">Item Code</th>
                                    <th className='text-center' scope="col">Quantity</th>
                                    <th className='text-center' scope="col">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className='text-center' scope="row">CBX150</th>
                                    <td className='text-center'>x1</td>
                                    <td className='text-center'>₱60.00</td>
                                </tr>

                                <tr>
                                    <th className='text-center' scope="row">CBX150</th>
                                    <td className='text-center'>x1</td>
                                    <td className='text-center'>₱80.00</td>
                                </tr>

                                <tr>
                                    <td className='text-end fw-semibold' colspan='2'>Total:</td>
                                    <td className='text-center fw-semibold'>₱130.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Payment Details */}
                    <div className="col">
                        <p className='fs-5 m-0 fw-semibold'>Payment Details Details</p>

                        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 px-1">
                            <div className="col">
                                <label className="form-label">Mode of Delivery</label>

                                <select className="form-select">
                                    <option value="1">Shipping</option>
                                    <option value="2">Local Delivery</option>
                                    <option value="3">Pick Up</option>
                                    <option value="3">Meet Up</option>
                                </select>
                            </div>

                            <div className="col">
                                <label className="form-label">Mode of Payment</label>

                                <select className="form-select">
                                    <option value="1">Cash</option>
                                    <option value="2">GCash</option>
                                    <option value="3">Bank Transfer</option>
                                    <option value="3">Cash on Delivery</option>
                                </select>
                            </div>

                            <div className="col">
                                <label className="form-label">Delivery Charge</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1">₱</span>
                                    <input type="number" className="form-control" />
                                </div>
                            </div>

                            <div className="col d-flex flex-column">
                                <label className="form-label">Payment Status</label>

                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" />
                                    <label className="form-check-label">
                                        Paid
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Meet up details */}
                    <div className="col-12">
                        <p className='fs-5 m-0 fw-semibold'>MeetUp Details</p>

                        <div className='row px-1'>
                            <div className='col-6 col-xl-4'>
                                <label className="form-label">Date</label>
                                <input type="date" className="form-control" />
                            </div>

                            <div className='col-6 col-xl-4'>
                                <label className="form-label">Time</label>
                                <input type="time" className="form-control" />
                            </div>

                            <div className='col-12 col-xl-4'>
                                <label className="form-label">Location</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                    </div>

                    {/* Shipping details */}
                    <div className="col-12">
                        <p className='fs-5 m-0 fw-semibold'>Shipping Details</p>

                        <div className='mt-3'>
                            <p className="p-0 m-0 fs-6 fw-medium">Recipient</p>

                            <div className='row row-cols-1 row-cols-md-3 px-1'>
                                <div className='col'>
                                    <label className="form-label">Fullname</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className='col'>
                                    <label className="form-label">Email address</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className='col'>
                                    <label className="form-label">Contact</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className='mt-3'>
                            <p className="p-0 m-0 fs-6 fw-medium">Address</p>

                            <div className='row row-cols-1 row-cols-md-2 row-cols-xl-4 px-1'>
                                <div className='col'>
                                    <label className="form-label">Province</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className='col'>
                                    <label className="form-label">City</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className='col'>
                                    <label className="form-label">Barangay</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className='col'>
                                    <label className="form-label">House#, Street</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='col-12 d-flex justify-content-end gap-3'>
                        <button className="btn btn-secondary px-5">Print Receipt</button>
                        <button className="btn btn-dark px-5">Update</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default OrderUpdatePage