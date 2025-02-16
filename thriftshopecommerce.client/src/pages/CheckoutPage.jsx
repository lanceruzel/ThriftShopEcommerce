import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddressFields from '../components/form/AddressFields';

function CheckoutPage() {
    const items = useLoaderData();

    const [subTotal, setSubTotal] = useState(0);
    const [shippingFee, setShippingFee] = useState(0)
    const [total, setTotal] = useState(0);
    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        amount: '0',
        modeOfPayment: 'Cash on Delivery',
        deliveryCharge: '0',
        postalCode: '',
        province: '0',
        city: '0',
        barangay: '0',
        houseStreet: '',
        orderItems: []
    });

    const validateForm = () => {
        const validationErrors = {}

        if (!formData.firstName.trim()) validationErrors["firstName"] = "The first name field is required."
        if (!formData.lastName.trim()) validationErrors["lastName"] = "The last name field is required."
        if (!formData.email.trim()) validationErrors["email"] = "The email field is required."
        if (!formData.contact.trim()) validationErrors["contact"] = "The contact field is required."
        if (!formData.postalCode.trim()) validationErrors["postalCode"] = "The postal code field is required."
        if (formData.province === '0') validationErrors["province"] = "The province field is required."
        if (formData.city === '0') validationErrors["city"] = "The city field is required."
        if (formData.barangay === '0') validationErrors["barangay"] = "The barangay field is required."
        if (!formData.houseStreet.trim()) validationErrors["houseStreet"] = "The house street field is required."

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return false
        }

        setErrors({})
        return true
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!validateForm()){
            return;
        }

        console.log(JSON.stringify(formData))

        try{
            const res = await fetch('/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if(res.ok){
                alert("success")
                setErrors([]);
                localStorage.removeItem('cart');
            }else{
                alert("failed")
            }
        }catch(error){
            console.error(error)
            alert("An error occurred. Please try again later.")
        }
    }

    const handleAddressChange = (addressData) => {
        setFormData((prev) => ({
            ...prev,
            ...addressData
        }))
    }

    useEffect(() => {
        if (items && Array.isArray(items.$values)) {
            const totalPrice = items.$values.reduce((sum, item) => sum + (item.newPrice || 0), 0);
            setSubTotal(totalPrice);
    
            // Get order items 
            const cartItems = JSON.parse(localStorage.getItem('cart') || "[]");
    
            const formattedCartItems = cartItems.map(item => ({
                itemId: item, 
                quantity: 1 
            }));
    
            setFormData((prev) => ({
                ...prev,
                amount: totalPrice + shippingFee,
                orderItems: formattedCartItems 
            }));
        }
    }, [items, shippingFee]);

    return (
        <div className='container py-5'>
            <p className='fs-2 w-100'>Checkout</p>

            <div className="row row-cols-1 row-cols-lg-2 px-2">
                <div className="col">
                    <form className='px-2' onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <p className='fs-5 fw-semibold w-100'>Recipient</p>

                            <div className='row px-2'>
                                <div className='col-12 col-md-6'>
                                    <label className="form-label">First Name</label>
                                    <input type="text" name="firstName" value={formData.firstName} className={`form-control ${errors.firstName && "is-invalid"}`} onChange={handleChange}/>
                                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                </div>

                                <div className='col-12 col-md-6'>
                                    <label className="form-label">Last Name</label>
                                    <input type="text" name="lastName" value={formData.lastName} className={`form-control ${errors.lastName && "is-invalid"}`} onChange={handleChange} />
                                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                </div>

                                <div className='col-12'>
                                    <label className="form-label">Email address</label>
                                    <input type="email" name="email" value={formData.email} className={`form-control ${errors.email && "is-invalid"}`} onChange={handleChange} />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                <div className='col-12'>
                                    <label className="form-label">Contact</label>
                                    <input type="contact" name="contact" value={formData.contact} className={`form-control ${errors.contact && "is-invalid"}`} onChange={handleChange} />
                                    {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
                                </div>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <p className='fs-5 fw-semibold w-100'>Address</p>

                            <AddressFields 
                                onAddressChange={handleAddressChange}
                                errors={errors}
                            />
                        </div>

                        <div className="mt-3">
                                <label className="form-label">Payment Method</label>
                                <select
                                    className={`form-control ${errors.modeOfPayment && "is-invalid"}`}
                                    name="modeOfPayment"
                                    value={formData.modeOfPayment}
                                    onChange={handleChange}
                                >
                                    <option value="0" disabled>
                                        Select mode of payment
                                    </option>
                                    <option value="Cash on Delivery">Cash on Delivery</option>
                                    <option value="GCash">GCash</option>
                                    <option value="Paymaya">Paymaya</option>
                                </select>
                                {errors.modeOfPayment && <div className="invalid-feedback">{errors.modeOfPayment}</div>}
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
                                            <p>{item.code}</p>
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