function CollectionSection() {
  return (
    <div className='py-5 bg-main'>
      <div className='container'>
        <p className='fs-2 text-center w-100'>Collections</p>

        <div className='row row-cols-1 row-cols-md-2  justify-content-center mt-4'>
          {[...Array(4)].map((_, index) => ( 
            <div className="col p-0 collection-card" style={{height: '28rem'}} key={index}>
              <img src="https://www.rappler.com/tachyon/r3-assets/3C9333F7C5ED409A912220FB23E77A6C/img/F49AD775BC3642679C934560E3A8610D/PENSHOPPE_NEWS_PSA__Blackpink_Lisa_is_the_new_face_of_Penshoppe_Photo1-scaled.jpg" alt="" />
              
              <div className="overlay-text d-flex flex-column align-items-center justify-center">
                <p className='text-light fw-light fs-3'>Hovered Text</p>
                
                <button className='btn btn-transparent mt-4 text-light shadow-none fw-light fs-6'><u style={{textUnderlineOffset: '5px'}}>View Collection</u></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CollectionSection