function TestimonialSection() {
    return (
        <div className='bg-white py-5'>
            <div className='container'>
                <p className='fs-2 text-center w-100'>What others say?</p>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-4 justify-content-center">
                    {[...Array(3)].map((_, index) => (
                        <div className="col" key={index}>
                            <div className='bg-main border rounded-2 overflow-hidden'>
                                <div className='w-100 position-relative' style={{ height: '30rem' }}>
                                    <img className='img-cover object-fit-cover w-100 h-100' src="https://www.rappler.com/tachyon/r3-assets/3C9333F7C5ED409A912220FB23E77A6C/img/F49AD775BC3642679C934560E3A8610D/PENSHOPPE_NEWS_PSA__Blackpink_Lisa_is_the_new_face_of_Penshoppe_Photo1-scaled.jpg" alt="" />
                                </div>

                                <figure className='p-4 text-center'>
                                    <blockquote className="blockquote fs-6">
                                        <p className='line-clamp-2'>Hips ko medj malaki talaga. Kaya sakto lang talaga ang fit. Like it much!! 💯 Like it much!!Like it much!!Like it much!!</p>
                                    </blockquote>

                                    <figcaption className="blockquote-footer mt-4 mb-0">
                                        <i>Michaella Quezon</i>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TestimonialSection