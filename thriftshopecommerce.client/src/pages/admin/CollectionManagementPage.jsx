import { Link } from 'react-router-dom';

function CollectionManagementPage() {
    return (
        <>
            {/* Header */}
            <div className='d-flex justify-content-between align-items-center'>
                <div className='fw-normal lh-sm'>
                    <p className='fs-1 m-0'>Collections</p>
                    <p className='fs-5 text-black-50'>Manage your thrift collections</p>
                </div>

                <Link to='/admin/collections/create' className='btn btn-dark'>Add Collection</Link>
            </div>
        </>
    )
}

export default CollectionManagementPage