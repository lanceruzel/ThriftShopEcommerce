import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';

function CartPage() {
    const [total, setTotal] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    const removeCartItem = (id) => {
        let cartIds = JSON.parse(localStorage.getItem('cart')) || [];
        cartIds = cartIds.filter(itemId => itemId !== id);
        localStorage.setItem('cart', JSON.stringify(cartIds));

        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const getCartItems = async() => {
        const cart = localStorage.getItem('cart');

        if (!cart) return;

        try {
            const cartIds = JSON.parse(cart);
            const queryString = cartIds.map(id => `id=${id}`).join('&');

            const res = await fetch(`/cart?${queryString}`, { method: 'GET' });

            if (res.ok) {
                const data = await res.json();

                setCartItems(data.$values);
            }
        } catch (error) {
            console.error("Error fetching item data:", error);
            return null;
        }
    }

    useEffect(() => {
        if (cartItems && Array.isArray(cartItems)) {
            const totalPrice = cartItems.reduce((sum, item) => sum + (item.newPrice || 0), 0);
            setTotal(totalPrice);
        }
    }, [cartItems]);

    useEffect(() => {
        getCartItems();
    }, []);

    return (
        <div className='container py-5 px-4'>
            <div className='d-flex justify-content-between align-items-center'>
                <p className='fs-2 w-100'>Your Cart</p>
                <Link to='/' className='btn fw-light btn-dark text-nowrap'>Continue shopping</Link>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mt-4 justify-content-center">
                {(cartItems?.length > 0) && cartItems.map((item) => {
                    return <ItemCard item={item} key={item.id} cartMode={true} onDelete={removeCartItem} />;
                })}
            </div>

            <div className='d-flex flex-column justify-content-center align-items-center align-items-md-end mt-5 gap-3'>
                <p className='fs-5'>Subtotal: <span className='fw-semibold'>₱{total.toFixed(2)}</span></p>
                <Link className='btn btn-dark fw-light px-5' to='/checkout'>Check out</Link>
            </div>
        </div>
    )
}

export default CartPage