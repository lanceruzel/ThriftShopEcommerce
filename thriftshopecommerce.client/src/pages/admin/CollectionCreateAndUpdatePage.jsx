import { useState, useEffect, useRef } from 'react';
import { FaTrashCan } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { IMAGE_PATH } from '../../lib/Constants';

function CollectionCreateAndUpdatePage({ _mode }) {
    const { id } = useParams();
    const [mode, setMode] = useState();
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        imageFile: '',
    });

    const fileInputRef = useRef(null)

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const files = Array.from(e.dataTransfer.files)
        addFile(files)
    }

    const handleFileInput = (event) => {
        const file = event.target.files[0];

        if (file) {
            setFormData((prev) => ({
                ...prev,
                imageFile: file,
            }));

            // Create preview URL
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setFormData((prev) => ({
            ...prev,
            imageFile: null,
        }));

        setImagePreview(null);
    };

    const addFile = (file) => {
        setFormData((prev) => ({
            ...prev,
            imageFile: file, 
        }));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let validationErrors = {};

        if (!formData.name.trim()) validationErrors["name"] = "The collection name field is required.";
        if (!imagePreview) validationErrors["imageFile"] = "Please insert one image.";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return false;
        }

        setErrors({});
        return true;
    }

    const formattedData = () => {
        const data = new FormData();

        // Append all form fields
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        return data;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const res = await fetch((mode == 'create') ? `/collection` : `/collection/${id}`, {
                method: (mode == 'create') ? 'POST' : 'PUT',
                body: formattedData()
            });

            if (res.ok) {
                alert('success');
                setErrors([]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchCollection = async () => {
        try {
            const res = await fetch(`/collection/${id}`, {
                method: 'GET',
            });

            const data = await res.json();

            if (res.ok) {
                if (data?.$values[0]) {
                    formData.name = data?.$values[0].name;
                    setImagePreview(IMAGE_PATH + '/collections/' + data?.$values[0].image);
                }
            }
        } catch (error) {
            console.error("Error fetching collection:", error);
            return null;
        }
    };

    useEffect(() => {
        setMode(_mode);

        if (_mode == 'update' && id) {
            fetchCollection();
        }

    }, []);

    return (
        <>
            {/* Header */}
            <div className="fw-normal lh-sm">
                <p className="fs-1 m-0">{mode == 'create' ? 'Create' : 'Update'} Collection Listing</p>
                <p className="fs-5 text-black-50">{mode == 'create' ? 'Add' : 'Modify'} Collection</p>
            </div>

            <div className="container d-flex justify-content-center align-items-center">
                <form className="w-100" onSubmit={handleSubmit}>
                    <div className="mt-3">
                        <label className="form-label">Collection Name</label>
                        <input type="text" className={`form-control ${errors.name && 'is-invalid'}`} name="name" value={formData.name} onChange={handleChange} />
                        {errors.name && (
                            <div className="invalid-feedback">{errors.name}</div>
                        )}
                    </div>

                    <div className="mt-3">
                        <p className="fs-5 m-0 fw-semibold">Image</p>

                        <div
                            className={`w-100 bg-light d-flex justify-content-center align-items-center rounded mt-2 p-4 border border-2 ${errors.imageFile ? "border-danger" : "border-secondary"
                                }`}
                            style={{ height: "8rem", cursor: "pointer" }}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current.click()}
                        >
                            {!imagePreview ? (
                                <p className="fs-5 fw-semibold mb-0">
                                    Drag & Drop an image here or Click to Upload
                                </p>
                            ) : (
                                <img
                                    src={imagePreview}
                                    alt="Uploaded"
                                    className="img-fluid rounded"
                                    style={{ height: "100%", objectFit: "cover" }}
                                />
                            )}

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileInput}
                                accept="image/*"
                                style={{ display: "none" }}
                            />
                        </div>

                        {imagePreview && (
                            <div className="mt-3 text-center">
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={removeImage}
                                >
                                    <FaTrashCan className="me-1" /> Remove Image
                                </button>
                            </div>
                        )}

                        {errors.imageFile && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {errors.imageFile}
                            </div>
                        )}
                    </div>


                    <div className="d-flex justify-content-end">
                        <input type="submit" className="btn btn-dark px-5" value="Update" />
                    </div>
                </form>
            </div>
        </>
    )
}



export default CollectionCreateAndUpdatePage