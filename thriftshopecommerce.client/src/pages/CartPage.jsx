import React from 'react'
import { BsFillTrashFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';

function CartPage() {
  return (
    <div className='container py-5 px-4'>
      <div className='d-flex justify-content-between align-items-center'>
        <p className='fs-2 w-100'>Your Cart</p>
        <button className='btn fw-light btn-dark text-nowrap'>Continue shopping</button>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mt-4 justify-content-center">
        {[...Array(4)].map((_, index) => (
          <div className="col" key={index}>
            <div className='bg-main border rounded-2'>
              <div className='w-100 position-relative' style={{ height: '20rem' }}>
                <img className='img-cover object-fit-cover rounded-top-2 w-100 h-100' src="https://www.rappler.com/tachyon/r3-assets/3C9333F7C5ED409A912220FB23E77A6C/img/F49AD775BC3642679C934560E3A8610D/PENSHOPPE_NEWS_PSA__Blackpink_Lisa_is_the_new_face_of_Penshoppe_Photo1-scaled.jpg" alt="" />

                <span className='position-absolute badge rounded-circle fs-5 text-bg-danger shadow-sm p-1' style={{ backgroundColor: 'yellow', right: '-10px', top: '-10px' }}><IoClose /></span>
              </div>

              <div className='p-3 text-center fw-light'>
                <p className='mt-2 fw-light'>CBX1230</p>

                <div className='d-flex align-items-center justify-content-center gap-2 mt-2'>
                  <span style={{ color: '#6c757d' }}><del>₱100.00</del></span>
                  <span className='fw-light'>₱80.00</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='d-flex flex-column justify-content-center align-items-center align-items-md-end mt-5 gap-3'>
        <p className='fs-5'>Subtotal: <span className='fw-semibold'>₱399.00</span></p>
        <Link className='btn btn-dark fw-light px-5' to='/checkout'>Check out</Link>
      </div>
    </div>
  )
}

export default CartPage