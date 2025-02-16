import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';

function CartPage() {
    const items = useLoaderData();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (items && Array.isArray(items.$values)) {
            const totalPrice = items.$values.reduce((sum, item) => sum + (item.newPrice || 0), 0);
            setTotal(totalPrice);
        }
    }, [items])

    return (
        <div className='container py-5 px-4'>
            <div className='d-flex justify-content-between align-items-center'>
                <p className='fs-2 w-100'>Your Cart</p>
                <Link to='/' className='btn fw-light btn-dark text-nowrap'>Continue shopping</Link>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mt-4 justify-content-center">
                {items?.$values.map((item) => {
                    return <ItemCard item={item} key={item.id} />;
                })}
            </div>

            <div className='d-flex flex-column justify-content-center align-items-center align-items-md-end mt-5 gap-3'>
                <p className='fs-5'>Subtotal: <span className='fw-semibold'>₱{total.toFixed(2)}</span></p>
                <Link className='btn btn-dark fw-light px-5' to='/checkout'>Check out</Link>
            </div>
        </div>
    )
}

const cartItemsLoader = async () => {
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

export { CartPage as default, cartItemsLoader } 