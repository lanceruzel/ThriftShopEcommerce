import React from 'react'

function HeroSection() {
  return (
    <div className='bg-main overflow-hidden'>
      <div className="container">
        <div className="row h-100 position-relative">
          <div className="col-12 col-lg-7 order-2 order-lg-1 d-flex flex-column align-items-center justify-content-center">
            <div className='text-center text-lg-start text-dark py-4'>
              <p className='fs-1 lh-1'>Find Your Style for Less</p>
              <p className='fs-5 fw-light lh-sm mt-1'>Discover high-quality, pre-loved fashion at unbeatable prices. Shop sustainably and refresh your wardrobe with unique thrift finds.</p>

              <div className='mt-4'>
                <p className='fs-6 fw-light'>Shop now and make every outfit a statement!</p>
                <button className='btn btn-outline-dark fw-light shadow-none fs-6 mt-2'>View Collection</button>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-5 p-0 order-1 order-lg-2" style={{ height: 'calc(100vh - 9rem)', minHeight: 'alc(100vh - 9rem)' }}>
            <img className='object-fit-cover hero-img w-100 h-100' src="https://www.rappler.com/tachyon/r3-assets/3C9333F7C5ED409A912220FB23E77A6C/img/F49AD775BC3642679C934560E3A8610D/PENSHOPPE_NEWS_PSA__Blackpink_Lisa_is_the_new_face_of_Penshoppe_Photo1-scaled.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection