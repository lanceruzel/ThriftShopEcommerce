import { Link } from 'react-router-dom';

function ProductManagementPage() {
    return (
        <>
            {/* Header */}
            <div className='d-flex justify-content-between align-items-center'>
                <div className='fw-normal lh-sm'>
                    <p className='fs-1 m-0'>Items</p>
                    <p className='fs-5 text-black-50'>Manage your thrift shop inventory</p>
                </div>

                <Link to='/admin/products/create' className='btn btn-dark'>Add Item</Link>
            </div>
        </>
    )
}

export default ProductManagementPage