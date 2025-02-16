import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CheckoutPage() {
    const items = useLoaderData();

    const [subTotal, setSubTotal] = useState(0);
    const [shippingFee, setShippingFee] = useState(0)
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (items && Array.isArray(items.$values)) {
            const totalPrice = items.$values.reduce((sum, item) => sum + (item.newPrice || 0), 0);
            setSubTotal(totalPrice);
        }

        setTotal(subTotal + shippingFee);
    }, [items])

    return (
        <div className='container py-5'>
            <p className='fs-2 w-100'>Checkout</p>

            <div className="row row-cols-1 row-cols-lg-2 px-2">
                <div className="col">
                    <form className='px-2'>
                        <div className="mt-4">
                            <p className='fs-5 fw-semibold w-100'>Recipient</p>

                            <div className='row px-2'>
                                <div className='col-12 col-md-6'>
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className='col-12 col-md-6'>
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className='col-12'>
                                    <label className="form-label">Email address</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className='col-12'>
                                    <label className="form-label">Contact</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <p className='fs-5 fw-semibold w-100'>Address</p>

                            <div className='row px-2'>
                                <div className='col-12 col-md-6'>
                                    <label className="form-label">Postal Code</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className='col-12 col-md-6'>
                                    <label className="form-label">Province</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className='col-12 col-md-6'>
                                    <label className="form-label">City</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className='col-12 col-md-6'>
                                    <label className="form-label">Barangay</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className='col-12'>
                                    <label className="form-label">House#, Street</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                        </div>

                        <button className='d-none d-lg-block btn btn-dark w-100 mt-3'>Complete Order</button>
                    </form>
                </div>

                <div className="col">
                    <p className='fs-5 fw-semibold w-100 mt-4'>Order Summary</p>

                    <table className='table shadow-none mt-3'>
                        <tbody>
                            {items?.$values.map((item) => (
                                <tr className='table-subtle' key={item.id}>
                                    <td className='d-flex align-items-center gap-3'>
                                        <img className='object-fit-cover rounded-2' style={{ width: '5rem', height: '5rem' }} src="https://www.rappler.com/tachyon/r3-assets/3C9333F7C5ED409A912220FB23E77A6C/img/F49AD775BC3642679C934560E3A8610D/PENSHOPPE_NEWS_PSA__Blackpink_Lisa_is_the_new_face_of_Penshoppe_Photo1-scaled.jpg" alt="" />
                                        <div>
                                            <p>CBX1234</p>
                                            <p className='fs-7 text-gray'>x1</p>
                                        </div>
                                    </td>

                                    <td className='align-middle'>
                                        <p className='d-inline-block fs-6 text-gray me-3'><del>₱{item.oldPrice.toFixed(2)}</del></p>
                                        <p className='d-inline-block fs-6 fw-medium'>₱{item.newPrice.toFixed(2)}</p>
                                    </td>
                                </tr>
                            ))}

                            <tr className='table-group-divider'>
                                <td className='text-start text-lg-end py-2'>Subtotal</td>
                                <td className='py-2'>
                                    <p className='fs-6'>₱{subTotal.toFixed(2)}</p>
                                </td>
                            </tr>

                            <tr>
                                <td className='text-start text-lg-end py-2'>Shipping Fee</td>
                                <td className='py-2'>
                                    <p className='fs-6'>₱{shippingFee.toFixed(0)}</p>
                                </td>
                            </tr>

                            <tr>
                                <td className='text-start text-lg-end  fs-5 py-2'>Total</td>
                                <td className='py-2'>
                                    <p className='fs-5 fw-medium'>₱{total.toFixed(2)}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <button className='d-block d-lg-none btn btn-dark w-100 mt-4'>Complete Order</button>
                </div>
            </div>
        </div>
    )
}

const cartItemsLoaderCheckout = async () => {
    console.log('HEREEE')
    const cart = localStorage.getItem('cart');

    if (!cart) return;

    try {
        const cartIds = JSON.parse(cart);
        const queryString = cartIds.map(id => `id=${id}`).join('&');

        const res = await fetch(`/cart?${queryString}`, { method: 'GET' });

        if (res.ok) {
            return await res.json();
        }
    } catch (error) {
        console.error("Error fetching item data:", error);
        return null;
    }
};

export { CheckoutPage as default, cartItemsLoaderCheckout } 