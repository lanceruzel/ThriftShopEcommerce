"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ImageDragAndDrop from "../../components/form/ImageDragAndDrop"

function ProductCreateAndUpdatePage({ _mode }) {
    const { id } = useParams()
    const [mode, setMode] = useState()
    const [categories, setCategories] = useState([])
    const [fitTypes, setFitTypes] = useState([])
    const [collections, setCollections] = useState([])
    const [errors, setErrors] = useState({})
    const [savedImages, setSavedImages] = useState([])

    const [formData, setFormData] = useState({
        code: "",
        description: "",
        gender: "0",
        oldPrice: "0",
        newPrice: "0",
        isSold: false,
        itemFitTypeId: "0",
        itemCategoryId: "0",
        itemCollectionId: "0",
        shoulder: "0",
        chest: "0",
        sleeveLength: "0",
        length: "0",
        waist: "0",
        thigh: "0",
        inseam: "0",
        legOpening: "0",
        imageFiles: [],
        removedImages: [],
    })

    const handleImagesChange = (newImageFiles, newSavedImages, removedImage) => {
        setFormData((prev) => ({
            ...prev,
            imageFiles: newImageFiles,
            removedImages: removedImage ? [...prev.removedImages, removedImage] : prev.removedImages,
        }))
        setSavedImages(newSavedImages)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const validateForm = () => {
        const validationErrors = {}

        if (!formData.code.trim()) validationErrors["itemCode"] = "The item code field is required."
        if (!formData.description.trim()) validationErrors["description"] = "The description field is required."
        if (Number(formData.oldPrice) < 0) validationErrors["oldPrice"] = "The old price should be higher than 0."
        if (!formData.newPrice || isNaN(Number(formData.newPrice)))
            validationErrors["newPrice"] = "The new price field is required."
        if (Number(formData.newPrice) <= 0) validationErrors["newPrice"] = "The price should be higher than 0."
        if (Number(formData.newPrice) >= Number(formData.oldPrice))
            validationErrors["newPrice"] = "The new price should be lower than the old price."
        if (formData.gender == "0") validationErrors["gender"] = "The gender field is required."
        if (formData.itemFitTypeId == "0") validationErrors["itemFitTypeId"] = "The fit type field is required."
        if (formData.itemCategoryId == "0") validationErrors["itemCategoryId"] = "The category field is required."
        if (formData.itemCollectionId == "0") validationErrors["itemCollectionId"] = "The collection field is required."
        if (mode === "create" && formData.imageFiles.length === 0)
            validationErrors["imageFiles"] = "Please insert at least one image."
        if (mode === "update" && formData.imageFiles.length === 0 && savedImages.length === 0)
            validationErrors["imageFiles"] = "Please insert at least one image."

        if (
            formData.shoulder == 0 &&
            formData.chest == 0 &&
            formData.sleeveLength == 0 &&
            formData.length == 0 &&
            formData.waist == 0 &&
            formData.thigh == 0 &&
            formData.inseam == 0 &&
            formData.legOpening == 0
        )
            validationErrors["size"] = "Please enter at least 1 size"

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return false
        }

        setErrors({})
        return true
    }

    const formattedData = () => {
        const data = new FormData()

        Object.keys(formData).forEach((key) => {
            if (key === "imageFiles") {
                formData.imageFiles.forEach((file) => {
                    data.append("imageFiles", file)
                })
            } else if (key === "removedImages") {
                data.append("removedImages", JSON.stringify(formData.removedImages))
            } else if (key === "isSold") {
                data.append(key, formData.isSold.toString())
            } else if (!isNaN(formData[key]) && formData[key] !== "" && formData[key] !== null) {
                data.append(key, Number(formData[key]))
            } else {
                data.append(key, formData[key])
            }
        })

        return data
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        try {
            const res = await fetch(mode == "create" ? `/item` : `/item/${id}`, {
                method: mode == "create" ? "POST" : "PUT",
                body: formattedData(),
            })

            if (res.ok) {
                alert("success")
            } else {
                alert("failed")
            }
        } catch (error) {
            console.error(error)
            alert("An error occurred. Please try again later.")
        }
    }

    const fetchItem = async () => {
        try {
            const res = await fetch(`/item/${id}`, {
                method: "GET",
            })

            if (res.ok) {
                const data = await res.json()

                if (data) {
                    setFormData({
                        code: data.code ?? "",
                        description: data.description ?? "",
                        gender: data.gender ?? "0",
                        oldPrice: data.oldPrice ?? "0",
                        newPrice: data.newPrice ?? "0",
                        isSold: data.isSold ?? false,
                        itemFitTypeId: data.itemFitTypeId ?? "0",
                        itemCategoryId: data.itemCategoryId ?? "0",
                        itemCollectionId: data.itemCollectionId ?? "0",
                        shoulder: data.itemSize.shoulder ?? "0",
                        chest: data.itemSize.chest ?? "0",
                        sleeveLength: data.itemSize.sleeveLength ?? "0",
                        length: data.itemSize.length ?? "0",
                        waist: data.itemSize.waist ?? "0",
                        thigh: data.itemSize.thigh ?? "0",
                        inseam: data.itemSize.inseam ?? "0",
                        legOpening: data.itemSize.legOpening ?? "0",
                        imageFiles: [],
                        removedImages: [],
                    })

                    setSavedImages(JSON.parse(data.images))
                }
            }
        } catch (error) {
            console.error("Error fetching item:", error)
            return null
        }
    }

    useEffect(() => {
        setMode(_mode)

        if (_mode == "update" && id) {
            fetchItem()
        }

        const fetchData = async (endpoint, setter) => {
            try {
                const res = await fetch(endpoint)
                const data = await res.json()
                if (res.ok) {
                    setter(data.$values)
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchData("/category", setCategories)
        fetchData("/fit", setFitTypes)
        fetchData("/collection", setCollections)
    }, [_mode, id]) // Added id as a dependency

    return (
        <>
            <div className="fw-normal lh-sm">
                <p className="fs-1 m-0">{mode == "create" ? "Create" : "Update"} Item Listing</p>
                <p className="fs-5 text-black-50">{mode == "create" ? "Add" : "Modify"} item listing</p>
            </div>

            <div className="container d-flex justify-content-center align-items-center">
                <form className="w-100 row" onSubmit={handleSubmit}>
                    {/* Item Details Section */}
                    <div className="col-12">
                        <p className="fs-5 m-0 fw-semibold p-0">Item Details</p>
                        <div className="row px-1">
                            {/* Item Code */}
                            <div className="col-12">
                                <label className="form-label">Item Code</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.itemCode && "is-invalid"}`}
                                    name="code"
                                    value={formData.code}
                                    onChange={handleChange}
                                />
                                {errors.itemCode && <div className="invalid-feedback">{errors.itemCode}</div>}
                            </div>

                            {/* Description */}
                            <div className="col-12">
                                <label className="form-label">Description</label>
                                <textarea
                                    className={`form-control ${errors.description && "is-invalid"}`}
                                    placeholder="Required example textarea"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                ></textarea>
                                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                            </div>

                            {/* Gender */}
                            <div className="col-12 col-md-6">
                                <label className="form-label">Gender</label>
                                <select
                                    className={`form-control ${errors.gender && "is-invalid"}`}
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="0" disabled>
                                        Select Gender
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Unisex">Unisex</option>
                                </select>
                                {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                            </div>

                            {/* Category */}
                            <div className="col-12 col-md-6">
                                <label className="form-label">Category</label>
                                <select
                                    className={`form-control ${errors.itemCategoryId && "is-invalid"}`}
                                    name="itemCategoryId"
                                    value={formData.itemCategoryId}
                                    onChange={handleChange}
                                >
                                    <option value="0" disabled>
                                        Select category
                                    </option>
                                    {categories.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.itemCategoryId && <div className="invalid-feedback">{errors.itemCategoryId}</div>}
                            </div>

                            {/* Collections */}
                            <div className="col-12 col-md-6">
                                <label className="form-label">Collections</label>
                                <select
                                    className={`form-control ${errors.itemCollectionId && "is-invalid"}`}
                                    name="itemCollectionId"
                                    value={formData.itemCollectionId}
                                    onChange={handleChange}
                                >
                                    <option value="0" disabled>
                                        Select collection
                                    </option>
                                    {collections.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.itemCollectionId && <div className="invalid-feedback">{errors.itemCollectionId}</div>}
                            </div>

                            {/* Old Price */}
                            <div className="col-12 col-md-6">
                                <label className="form-label">Old Price</label>
                                <div className="input-group">
                                    <span className="input-group-text">₱</span>
                                    <input
                                        type="number"
                                        className={`form-control ${errors.oldPrice && "is-invalid"}`}
                                        placeholder="0.00"
                                        name="oldPrice"
                                        value={formData.oldPrice}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.oldPrice && <div className="invalid-feedback">{errors.oldPrice}</div>}
                            </div>

                            {/* Price */}
                            <div className="col-12 col-md-6">
                                <label className="form-label">Price</label>
                                <div className="input-group">
                                    <span className="input-group-text">₱</span>
                                    <input
                                        type="number"
                                        className={`form-control ${errors.newPrice && "is-invalid"}`}
                                        placeholder="0.00"
                                        name="newPrice"
                                        value={formData.newPrice}
                                        onChange={handleChange}
                                    />
                                    {errors.newPrice && <div className="invalid-feedback">{errors.newPrice}</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Size Details Section */}
                    <div className="col-12">
                        <p className="fs-5 m-0 fw-semibold">Size Details</p>

                        <div className="w-100">
                            <label className="form-label">Fit Type</label>
                            <select
                                className={`form-control ${errors.itemFitTypeId && "is-invalid"}`}
                                name="itemFitTypeId"
                                value={formData.itemFitTypeId}
                                onChange={handleChange}
                            >
                                <option value="0" disabled>
                                    Select fit type
                                </option>
                                {fitTypes.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            {errors.itemFitTypeId && <div className="invalid-feedback">{errors.itemFitTypeId}</div>}
                        </div>

                        <div className="mt-3">
                            <p className="p-0 m-0 fs-6 fw-medium">Top</p>

                            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 px-1">
                                <div className="col">
                                    <label className="form-label">Shoulder</label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="shoulder"
                                            value={formData.shoulder}
                                            onChange={handleChange}
                                        />
                                        <span className="input-group-text">cm</span>
                                    </div>
                                </div>

                                <div className="col">
                                    <label className="form-label">Chest</label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="chest"
                                            value={formData.chest}
                                            onChange={handleChange}
                                        />
                                        <span className="input-group-text">cm</span>
                                    </div>
                                </div>

                                <div className="col">
                                    <label className="form-label">Sleeve Length</label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="sleeveLength"
                                            value={formData.sleeveLength}
                                            onChange={handleChange}
                                        />
                                        <span className="input-group-text">cm</span>
                                    </div>
                                </div>

                                <div className="col">
                                    <label className="form-label">Length</label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="length"
                                            value={formData.length}
                                            onChange={handleChange}
                                        />
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
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="waist"
                                            value={formData.waist}
                                            onChange={handleChange}
                                        />
                                        <span className="input-group-text">cm</span>
                                    </div>
                                </div>

                                <div className="col">
                                    <label className="form-label">Thigh</label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="thigh"
                                            value={formData.thigh}
                                            onChange={handleChange}
                                        />
                                        <span className="input-group-text">cm</span>
                                    </div>
                                </div>

                                <div className="col">
                                    <label className="form-label">Inseam</label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="inseam"
                                            value={formData.inseam}
                                            onChange={handleChange}
                                        />
                                        <span className="input-group-text">cm</span>
                                    </div>
                                </div>

                                <div className="col">
                                    <label className="form-label">Leg Opening</label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="legOpening"
                                            value={formData.legOpening}
                                            onChange={handleChange}
                                        />
                                        <span className="input-group-text">cm</span>
                                    </div>
                                </div>
                            </div>

                            {errors.size && (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {errors.size}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Images Section */}
                    <ImageDragAndDrop
                        initialSavedImages={savedImages}
                        initialImageFiles={formData.imageFiles}
                        errors={errors}
                        onImagesChange={handleImagesChange}
                    />

                    <div className="d-flex justify-content-end">
                        <input type="submit" className="btn btn-dark px-5" value={mode === "create" ? "Create" : "Update"} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProductCreateAndUpdatePage

