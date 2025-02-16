import { useRef, useState, useEffect } from "react"
import { FaTrashCan } from "react-icons/fa6"
import { IMAGE_PATH } from "../../lib/Constants"

const ImageDragAndDrop = ({ initialSavedImages, initialImageFiles, errors, onImagesChange }) => {
    const [savedImages, setSavedImages] = useState(initialSavedImages)
    const [imageFiles, setImageFiles] = useState(initialImageFiles)
    const fileInputRef = useRef(null)

    useEffect(() => {
        setSavedImages(initialSavedImages);
    }, [initialSavedImages]);

    const addFiles = (files) => {
        const newImageFiles = [...imageFiles, ...files]
        setImageFiles(newImageFiles)
        onImagesChange(newImageFiles, savedImages)
    }

    const removeImage = (index) => {
        const newImageFiles = imageFiles.filter((_, i) => i !== index)
        setImageFiles(newImageFiles)
        onImagesChange(newImageFiles, savedImages)
    }

    const removeSavedImage = (index) => {
        const removedImage = savedImages[index]
        const newSavedImages = savedImages.filter((_, i) => i !== index)
        setSavedImages(newSavedImages)
        onImagesChange(imageFiles, newSavedImages, removedImage)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const files = Array.from(e.dataTransfer.files)
        addFiles(files)
    }

    const handleFileInput = (e) => {
        const files = Array.from(e.target.files || [])
        addFiles(files)
    }

    return (
        <div className="col-12">
            <p className="fs-5 m-0 fw-semibold">Images</p>

            <div
                className={`w-100 bg-light d-flex justify-content-center align-items-center rounded mt-2 p-4 border border-2 ${errors.imageFiles ? "border-danger" : "border-secondary"}`}
                style={{ height: "8rem", cursor: "pointer" }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <p className="fs-5 fw-semibold mb-0">Drag & Drop images here or Click to Upload</p>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInput}
                    multiple
                    accept="image/*"
                    style={{ display: "none" }}
                />
            </div>

            <div className="mt-4 row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4">
                {/* Display Saved Images */}
                {savedImages.length > 0 &&
                    savedImages.map((file, index) => (
                        <div key={`saved-${index}`} className="col">
                            <div className="position-relative">
                                <img
                                    src={`${IMAGE_PATH}/products/${file}`}
                                    alt={`Saved ${index + 1}`}
                                    className="img-fluid rounded"
                                    style={{ height: "8rem", objectFit: "cover" }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                                    onClick={() => removeSavedImage(index)}
                                >
                                    <FaTrashCan />
                                </button>
                            </div>
                        </div>
                    ))}

                {/* Display Newly Uploaded Images */}
                {imageFiles.length > 0 &&
                    imageFiles.map((file, index) => (
                        <div key={`uploaded-${index}`} className="col">
                            <div className="position-relative">
                                <img
                                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                                    alt={`Uploaded ${index + 1}`}
                                    className="img-fluid rounded"
                                    style={{ height: "8rem", objectFit: "cover" }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                                    onClick={() => removeImage(index)}
                                >
                                    <FaTrashCan />
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            {errors.imageFiles && (
                <div className="alert alert-danger mt-3" role="alert">
                    {errors.imageFiles}
                </div>
            )}
        </div>
    )
}

export default ImageDragAndDrop

