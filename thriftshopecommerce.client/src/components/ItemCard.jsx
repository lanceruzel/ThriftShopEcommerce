/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { IMAGE_PATH } from '../lib/Constants';

function ItemCard({ item }) {
    const parsedImage = () => {
        try {
            const parsedImagesArray = typeof item.images === "string" ? JSON.parse(item.images) : [];
            return parsedImagesArray.length ? `${IMAGE_PATH}/products/${parsedImagesArray[0]}` : "https://via.placeholder.com/200";
        } catch {
            return "https://via.placeholder.com/200";
        }
    };

    return (
        <div className="col">
            <div className="bg-main border border rounded-2">
                <div className="w-100 position-relative" style={{ height: "20rem" }}>
                    <img
                        className="img-cover object-fit-cover rounded-top-2 w-100 h-100"
                        src={parsedImage()}
                        alt={item.code || "Item"}
                    />

                    {(item.newPrice < item.oldPrice) && (
                        <span
                            className="position-absolute badge fw-light rounded-pill text-bg-dark shadow-sm"
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