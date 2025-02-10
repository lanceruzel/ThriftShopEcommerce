import React, { useEffect, useRef, useState } from "react";

function ProductCreateAndUpdatePage(props) {
  const [mode, setMode] = useState();

  useEffect(() => {
    setMode(props.mode);
  });

  return (
    <>
      {/* Header */}
      <div className="fw-normal lh-sm">
        <p className="fs-1 m-0">{mode == 'create' ? 'Create' : 'Update'} Item Listing</p>
        <p className="fs-5 text-black-50">Add/Modify item listing</p>
      </div>

      <div className="container d-flex justify-content-center align-items-center">
        <form className="w-100 row">
          <div className="col-12">
            <p className="fs-5 m-0 fw-semibold p-0">Item Details</p>

            <div className="row px-1">
              <div className="col-12">
                <label className="form-label">Item Code</label>
                <input type="text" className="form-control" />
              </div>

              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  placeholder="Required example textarea"
                ></textarea>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Gender</label>
                <select className="form-select">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Category</label>
                <select className="form-select">
                  <option value="Shirt">Shirt</option>
                  <option value="Dress">Dress</option>
                  <option value="CropTop">CropTop</option>
                  <option value="Shorts">Shorts</option>
                  <option value="Pants">Pants</option>
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Old Price</label>

                <div className="input-group">
                  <span className="input-group-text">₱</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label">Price</label>

                <div className="input-group">
                  <span className="input-group-text">₱</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <p className="fs-5 m-0 fw-semibold">Size Details</p>

            <div className="w-100">
              <label className="form-label">Fit Type</label>

              <select className="form-select">
                <option value="Skinny Fit">Skinny Fit</option>
                <option value="Slim Fit">Slim Fit</option>
                <option value="Regular Fit">Regular Fit</option>
                <option value="Relaxed Fit">Relaxed Fit</option>
                <option value="Straight Fit">Straight Fit</option>
                <option value="Oversized Fit">Oversized Fit</option>
                <option value="Boxy Fit">Boxy Fit</option>
                <option value="Muscle Fit">Muscle Fit</option>
                <option value="Tall Fit">Tall Fit</option>
                <option value="Cropped Fit">Cropped Fit</option>
                <option value="Tapered Fit">Tapered Fit</option>
                <option value="Bootcut Fit">Bootcut Fit</option>
                <option value="Wide-Leg Fit">Wide-Leg Fit</option>
                <option value="Baggy Fit">Baggy Fit</option>
                <option value="High-Waisted Fit">High-Waisted Fit</option>
                <option value="Low-Rise Fit">Low-Rise Fit</option>
                <option value="Mid-Rise Fit">Mid-Rise Fit</option>
              </select>
            </div>

            <div className="mt-3">
              <p className="p-0 m-0 fs-6 fw-medium">Top</p>

              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 px-1">
                <div className="col">
                  <label className="form-label">Shoulder</label>

                  <div className="input-group">
                    <input type="number" className="form-control" />
                    <span className="input-group-text">cm</span>
                  </div>
                </div>

                <div className="col">
                  <label className="form-label">Chest</label>

                  <div className="input-group">
                    <input type="number" className="form-control" />
                    <span className="input-group-text">cm</span>
                  </div>
                </div>

                <div className="col">
                  <label className="form-label">Sleeve Length</label>

                  <div className="input-group">
                    <input type="number" className="form-control" />
                    <span className="input-group-text">cm</span>
                  </div>
                </div>

                <div className="col">
                  <label className="form-label">Length</label>

                  <div className="input-group">
                    <input type="number" className="form-control" />
                    <span className="input-group-text">cm</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <p className="p-0 m-0 fs-6 fw-medium">Bottom</p>

              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 px-1">
                <div className="col">
                  <label className="form-label">Waist</label>

                  <div className="input-group">
                    <input type="number" className="form-control" />
                    <span className="input-group-text">cm</span>
                  </div>
                </div>

                <div className="col">
                  <label className="form-label">Thigh</label>

                  <div className="input-group">
                    <input type="number" className="form-control" />
                    <span className="input-group-text">cm</span>
                  </div>
                </div>

                <div className="col">
                  <label className="form-label">Inseam</label>

                  <div className="input-group">
                    <input type="number" className="form-control" />
                    <span className="input-group-text">cm</span>
                  </div>
                </div>

                <div className="col">
                  <label className="form-label">Leg Opening</label>

                  <div className="input-group">
                    <input type="number" className="form-control" />
                    <span className="input-group-text">cm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <p className="fs-5 m-0 fw-semibold">Images</p>

            <div className="w-100 bg-dark text-light d-flex justify-content-center align-items-center rounded-2 mt-2" style={{height: '8rem'}}>
              <p className='fs-5 fw-semibold'>Drag & Drop an Image Here or Click to Upload</p>
            </div>
            
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-dark px-5">Update</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProductCreateAndUpdatePage;
