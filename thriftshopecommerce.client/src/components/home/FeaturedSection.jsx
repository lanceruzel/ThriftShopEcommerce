import { IMAGE_PATH } from '../../lib/Constants';

// eslint-disable-next-line react/prop-types
function FeaturedSection({ items = [] }) {

    if (!Array.isArray(items)) {
        console.error("Expected 'items' to be an array, but got:", items);
        return null; // Prevents rendering if items is incorrect
    }

    return (
        <div className="bg-white py-5">
            <div className="container">
                <p className="fs-2 text-center w-100">Featured Items</p>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mt-4 justify-content-center">
                    {items.slice(0, 4).map((item) => {
                        let imageArray = [];

                        // Ensure images are parsed correctly
                        try {
                            imageArray = typeof item.images === "string" ? JSON.parse(item.images) : [];
                        } catch (error) {
                            console.error("Error parsing images for item:", item, error);
                        }

                        //Get the first image if available
                        const imageUrl =
                            imageArray.length > 0
                                ? `${IMAGE_PATH}/products/${imageArray[0]}`
                                : "https://via.placeholder.com/200";

                        return (
                            <div className="col" key={item.id}>
                                <div className="bg-main border border rounded-2">
                                    <div className="w-100 position-relative" style={{ height: "20rem" }}>
                                        <img
                                            className="img-cover object-fit-cover rounded-top-2 w-100 h-100"
                                            src={imageUrl}
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
                                                <del>₱{item.oldPrice}</del>
                                            </span>
                                            <span className="fw-light">₱{item.newPrice}</span>
                                        </div>

                                        <button className="btn btn-dark w-100 mt-3 fw-light">View</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="d-flex align-items-center justify-content-center mt-4">
                    <button className="btn btn-outline-dark rounded-pill">View More</button>
                </div>
            </div>
        </div>
    );
}

export default FeaturedSection