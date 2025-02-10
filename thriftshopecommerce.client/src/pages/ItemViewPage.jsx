import React from 'react'

function ItemViewPage() {
  return (
    <>
      <div className="container py-5">
        <div className='row p-0 m-0 pb-5'>
          <div className="col-12 col-lg-7 p-2">
            <div className='bg-white border rounded-2 shadow-sm overflow-hidden h-100'>
              <img className='h-100 object-fit-cover w-100 h-100' src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" alt="" />
            </div>
          </div>

          <div className='col-12 col-lg-5 p-2'>
            <div className='bg-white p-4 border rounded-2 shadow-sm'>
              <p className='fs-2 fw-semibold m-0'>Code: <span className='fw-bold'>CBX150 (Skinny Fit)</span></p>

              <div className='d-flex gap-2 mt-2'>
                <span className='fs-5' style={{ color: '#6c757d' }}><del>₱100.00</del></span>
                <span className='fw-semibold fs-5'>₱80.00</span>
                <span className='badge py-2 px-3 rounded-pill fw-semibold text-bg-dark'>Sale</span>
              </div>

              <div className='d-flex gap-2 mt-3'>
                <span className='badge text-bg-dark shadow-sm'>Male</span>
                <span className='badge text-dark bg-secondary-subtle shadow-sm'>Top</span>
              </div>

              <div className='mt-3'>
                <p className='lh-sm'>
                  ✿ very flowy and smooth textured fabric <br />
                  ✿ with belt hoops and side pockets <br />
                  ✿ garterized back
                </p>
              </div>

              <table className='table border shadow-none mt-3'>
                <tbody>
                  {/* Top */}
                  <tr>
                    <td className='fw-semibold'>Shoulder</td>
                    <td>15"</td>

                    <td className='fw-semibold'>Chest</td>
                    <td>15"</td>
                  </tr>

                  <tr>
                    <td className='fw-semibold'>Sleeve</td>
                    <td>15"</td>

                    <td className='fw-semibold'>Length</td>
                    <td>15"</td>
                  </tr>

                  {/* Bottom */}
                  <tr>
                    <td className='fw-semibold'>Waist</td>
                    <td>15"</td>

                    <td className='fw-semibold'>Thigh</td>
                    <td>15"</td>
                  </tr>

                  <tr>
                    <td className='fw-semibold'>Inseam</td>
                    <td>15"</td>

                    <td className='fw-semibold'>Leg Opening</td>
                    <td>15"</td>
                  </tr>
                </tbody>
              </table>

              <div className='d-flex flex-column gap-2 justify-content-center align-items-center mt-4'>
                <button className="btn btn-dark w-100">Add to Cart!</button>
              </div>
            </div>


          </div>

          <div className="col-12 mt-4">
            <p className='fs-2 w-100'>You may also like</p>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mt-4 justify-content-center">
              {[...Array(4)].map((_, index) => (
                <div className="col" key={index}>
                  <div className='bg-main border rounded-2'>
                    <div className='w-100 position-relative' style={{ height: '20rem' }}>
                      <img className='img-cover object-fit-cover rounded-top-2 w-100 h-100' src="https://www.rappler.com/tachyon/r3-assets/3C9333F7C5ED409A912220FB23E77A6C/img/F49AD775BC3642679C934560E3A8610D/PENSHOPPE_NEWS_PSA__Blackpink_Lisa_is_the_new_face_of_Penshoppe_Photo1-scaled.jpg" alt="" />

                      <span className='position-absolute badge fw-light rounded-pill text-bg-dark shadow-sm' style={{ backgroundColor: 'yellow', right: '10px', top: '10px' }}>Sale!</span>
                    </div>

                    <div className='p-3 text-center fw-light'>
                      <p className='mt-2 fw-light'>CBX1230</p>

                      <div className='d-flex align-items-center justify-content-center gap-2 mt-2'>
                        <span style={{ color: '#6c757d' }}><del>₱100.00</del></span>
                        <span className='fw-light'>₱80.00</span>
                      </div>

                      <button className='btn btn-dark w-100 mt-3 fw-light'>View</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemViewPage