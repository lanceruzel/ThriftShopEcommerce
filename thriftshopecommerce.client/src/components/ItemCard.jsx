﻿/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { IMAGE_PATH } from '../lib/Constants';
import { IoClose } from "react-icons/io5";

function ItemCard({ item, cartMode = false, onDelete = null }) {
    const parsedImage = () => {
        try {
            const parsedImagesArray = typeof item.images === "string" ? JSON.parse(item.images) : [];
            return parsedImagesArray.length ? `${IMAGE_PATH}/products/${parsedImagesArray[0]}` : "https://via.placeholder.com/200";
        } catch {
            return "https://via.placeholder.com/200";
        }
    };

    const removeCartItem = () => {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        cartItems = cartItems.filter(itemId => itemId !== item.id);

        localStorage.setItem('cart', JSON.stringify(cartItems));

        onDelete(item.id);
        alert('Item removed successfully');
    };

    return (
        <div className="col">
            <div className="bg-main border border rounded-2 position-relative">
                <div className="w-100 position-relative" style={{ height: "20rem" }}>
                    <img
                        className="img-cover object-fit-cover rounded-top-2 w-100 h-100"
                        src={parsedImage()}
                        alt={item.code || "Item"}
                    />

                    {cartMode && (
                        <span className='position-absolute badge rounded-circle fs-5 text-bg-danger shadow-sm p-1 z-3' onClick={removeCartItem} style={{ backgroundColor: 'yellow', right: '-10px', top: '-10px' }}><IoClose /></span>
                    )}

                    {(item.newPrice < item.oldPrice) && (
                        <span
                            className="position-absolute badge fw-light rounded-pill text-bg-dark shadow-sm z-1"
                            style={{ right: "10px", top: "10px" }}
                        >Sale!</span>
                    )}
                </div>

                <div className="p-3 text-center fw-light">
                    <p className="mt-2 fw-light">{item.code}</p>

                    <div className="d-flex align-items-center justify-content-center gap-2 mt-2">
                        <span style={{ color: "#6c757d" }}>
                            <del>₱{item.oldPrice?.toFixed(2)}</del>
                        </span>
                        <span className="fw-light">₱{item.newPrice.toFixed(2)}</span>
                    </div>

                    <Link className='btn btn-dark w-100 mt-3 fw-light' to={`/view/item/${item.id}`}>View</Link>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;