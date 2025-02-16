import { IMAGE_PATH } from '../../lib/Constants';

// eslint-disable-next-line react/prop-types
function CollectionSection({ collections = [] }) {

    if (!Array.isArray(collections)) {
        console.error("Expected 'items' to be an array, but got:", collections);
        return null; // Prevents rendering if items is incorrect
    }

    return (
        <div className='py-5 bg-main'>
            <div className='container'>
                <p className='fs-2 text-center w-100'>Collections</p>

                <div className='row row-cols-1 row-cols-md-2 justify-content-center mt-4'>
                    {collections.map((item) => (
                        <div className="col p-0 collection-card" style={{ height: '28rem' }} key={item.id}>
                            <img src={IMAGE_PATH + '/collections/' + item.image} alt="" />

                            <div className="overlay-text d-flex flex-column align-items-center justify-content-center">
                                <p className='text-light fw-light fs-3'>{item.name}</p>

                                <button className='btn btn-transparent mt-4 text-light shadow-none fw-light fs-6'>
                                    <u style={{ textUnderlineOffset: '5px' }}>View Collection</u>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CollectionSection