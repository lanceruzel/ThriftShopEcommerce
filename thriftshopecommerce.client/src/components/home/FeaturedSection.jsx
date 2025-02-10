import React from 'react'

function FeaturedSection() {
    return (
        <div className='bg-white py-5'>
            <div className='container'>
                <p className='fs-2 text-center w-100'>Featured Items</p>

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

                <div className='d-flex align-items-center justify-content-center mt-4'>
                    <button className='btn btn-outline-dark rounded-pill'>View More</button>
                </div>
            </div>
        </div>
    )
}

export default FeaturedSection