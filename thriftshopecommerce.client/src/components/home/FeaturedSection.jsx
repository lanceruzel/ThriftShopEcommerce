import ItemCard from '../ItemCard';

// eslint-disable-next-line react/prop-types
function FeaturedSection({ items = [] }) {
    return (
        <div className="bg-white py-5">
            <div className="container">
                <p className="fs-2 text-center w-100">Featured Items</p>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mt-4 justify-content-center">
                    {items.slice(0, 4).map((item) => {
                        return <ItemCard item={item} key={item.id} />;
                    })}
                </div>
            </div>

            <div className="d-flex align-items-center justify-content-center mt-4">
                <button className="btn btn-outline-dark rounded-pill">View More</button>
            </div>
        </div>
    );
}

export default FeaturedSection