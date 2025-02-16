import { useLoaderData } from 'react-router-dom';
import { IMAGE_PATH } from '../lib/Constants';
import { useEffect, useState } from 'react';

function ItemViewPage() {
    const item = useLoaderData();
    const [formattedImgs, setFormattedImgs] = useState([]);

    const handleAddToCart = () => {
        let cart = []

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        if (cart.includes(item.id)) {
            return;
        }

        cart.push(item.id);

        localStorage.setItem('cart', JSON.stringify(cart));

        alert('success');
    }

    //const products = ["Laptop", "Phone", "Tablet"];
    //localStorage.setItem("products", JSON.stringify(products));

    //const savedProducts = JSON.parse(localStorage.getItem("products"));
    //console.log(savedProducts); // ["Laptop", "Phone", "Tablet"]

    useEffect(() => {
        setFormattedImgs(JSON.parse(item.images));
    }, [item])

    return (
        <>
            <div className="container py-5">
                <div className='row p-0 m-0 pb-5'>
                    <div className="col-12 col-lg-7 p-2">
                        <div id="carouselExample" className="carousel slide bg-white border rounded-2 shadow-sm overflow-hidden"
                            style={{ maxHeight: '33rem', minHeight: '33rem' }} data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                {formattedImgs.map((image, index) => (
                                    <button key={index}
                                        className={`${index === 0 ? 'active' : ''}`}
                                        type="button"
                                        data-bs-target="#carouselExampleIndicators"
                                        data-bs-slide-to={index}
                                    aria-label="Slide"></button>
                                ))}
                            </div>

                            <div className="carousel-inner" style={{ maxHeight: '33rem', minHeight: '33rem' }}>
                                {formattedImgs.map((image, index) => (
                                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} style={{ height: '33rem' }} key={index}>
                                        <img
                                            src={IMAGE_PATH + '/products/' + image}
                                            className="d-block object-fit-cover w-100 h-100"
                                            alt={`Product ${index + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>

                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>

                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                    <div className='col-12 col-lg-5 p-2'>
                        <div className='bg-white p-4 border rounded-2 shadow-sm'>
                            <p className='fs-2 fw-bold m-0'>{item.code} ({item.itemFitType.name})</p>

                            <div className='d-flex gap-2 mt-2'>
                                <span className='fs-5' style={{ color: '#6c757d' }}><del>₱{item.oldPrice.toFixed(2)}</del></span>
                                <span className='fw-semibold fs-5'>₱{item.newPrice.toFixed(2)}</span>

                                {(item.newPrice < item.oldPrice) && (
                                    <span className='badge py-2 px-3 rounded-pill fw-semibold text-bg-dark'>Sale!</span>
                                )}
                            </div>

                            <div className='d-flex gap-2 mt-3'>
                                <span className='badge text-bg-dark shadow-sm'>{item.gender}</span>
                                <span className='badge text-dark bg-secondary-subtle shadow-sm'>{item.itemCategory.name}</span>
                            </div>

                            <div className='mt-3'>
                                <p className='lh-sm'>
                                    {item.description}
                                </p>
                            </div>

                            <table className='table border shadow-none mt-3'>
                                <tbody>
                                    {/* Top */}
                                    <tr>
                                        <td className='fw-semibold'>Shoulder</td>
                                        <td>{item.itemSize.shoulder} cm</td>

                                        <td className='fw-semibold'>Chest</td>
                                        <td>{item.itemSize.chest} cm</td>
                                    </tr>

                                    <tr>
                                        <td className='fw-semibold'>Sleeve</td>
                                        <td>{item.itemSize.sleeveLength} cm</td>

                                        <td className='fw-semibold'>Length</td>
                                        <td>{item.itemSize.length} cm</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className='table border shadow-none mt-3'>
                                <tbody>
                                    {/* Bottom */}
                                    <tr>
                                        <td className='fw-semibold'>Waist</td>
                                        <td>{item.itemSize.waist} cm</td>

                                        <td className='fw-semibold'>Thigh</td>
                                        <td>{item.itemSize.thigh} cm</td>
                                    </tr>

                                    <tr>
                                        <td className='fw-semibold'>Inseam</td>
                                        <td>{item.itemSize.inseam} cm</td>

                                        <td className='fw-semibold'>Leg Opening</td>
                                        <td>{item.itemSize.legOpening} cm</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className='d-flex flex-column gap-2 justify-content-center align-items-center mt-4'>
                                <button className="btn btn-dark w-100" onClick={handleAddToCart}>Add to Cart!</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 mt-4">
                        <p className='fs-2 w-100'>You may also like</p>

                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mt-4 justify-content-center">
                            {[...Array(4)].map((_, index) => (
                                <div className="col" key={index}>
                                    <div className='bg-main border rounded-2'>
                                        <div className='w-100 position-relative' style={{ height: '20rem' }}>
                                            <img className='img-cover object-fit-cover rounded-top-2 w-100 h-100' src="https://www.rappler.com/tachyon/r3-assets/3C9333F7C5ED409A912220FB23E77A6C/img/F49AD775BC3642679C934560E3A8610D/PENSHOPPE_NEWS_PSA__Blackpink_Lisa_is_the_new_face_of_Penshoppe_Photo1-scaled.jpg" alt="" />

                                            <span className='position-absolute badge fw-light rounded-pill text-bg-dark shadow-sm' style={{ backgroundColor: 'yellow', right: '10px', top: '10px' }}>Sale!</span>
                                        </div>

                                        <div className='p-3 text-center fw-light'>
                                            <p className='mt-2 fw-light'>CBX1230</p>

                                            <div className='d-flex align-items-center justify-content-center gap-2 mt-2'>
                                                <span style={{ color: '#6c757d' }}><del>₱100.00</del></span>
                                                <span className='fw-light'>₱80.00</span>
                                            </div>

                                            <button className='btn btn-dark w-100 mt-3 fw-light'>View</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const itemLoader = async ({ params }) => {
    try {
        const res = await fetch(`/item/${params.id}`, {
            method: 'GET',
        });

        if (res.ok) {
            return await res.json();
        }
    } catch (error) {
        console.error("Error fetching item data:", error);
        return null;
    }
}

export { ItemViewPage as default, itemLoader } 