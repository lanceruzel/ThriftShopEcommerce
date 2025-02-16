import { useEffect, useState } from "react"
import geoDataJson from '../../lib/phGeo.json';

function AddressFields({ onAddressChange, errors }) {
    const [geoData, setGeoData] = useState([]);

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [barangays, setBarangays] = useState([]);

    const [addressFields, setAddressFields] = useState({
        postalCode: '',
        province: '0',
        city: '0',
        barangay: '0'
    });

    const handleChange = (e) => {
        setAddressFields((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const loadProvinces = () => {
        if (!geoData || Object.keys(geoData).length === 0) return;

        const dataProvinces = Object.keys(geoData).sort();
        setProvinces(dataProvinces);
    };

    const loadCities = () => {
        if (!addressFields.province || !geoData[addressFields.province]) return;

        const cityData = Object.keys(geoData[addressFields.province]).sort();
        setCities(cityData);
    };

    const loadBarangays = () => {
        if (!addressFields.city || !geoData[addressFields.province]?.[addressFields.city]) return;

        const barangayData = geoData[addressFields.province][addressFields.city].sort();
        setBarangays(barangayData);
    };

    useEffect(() => {
        onAddressChange(addressFields);
    }, [addressFields]);

    useEffect(() => {
        setGeoData(geoDataJson);
    }, []);

    useEffect(() => {
        loadProvinces();
    }, [geoData]);

    useEffect(() => {
        loadCities();
        setAddressFields((prev) => ({
            ...prev,
            city: "0",
            barangay: "0"
        }));

        setBarangays([]);
    }, [addressFields?.province]);

    useEffect(() => {
        loadBarangays();
    }, [addressFields.city]);

    return (
        <div className='row px-2'>
            <div className='col-12 col-md-6'>
                <label className="form-label">Postal Code</label>
                <input type="number" name="postalCode" value={AddressFields.postalCode} className={`form-control ${errors.postalCode && "is-invalid"}`} onChange={handleChange} />
                {errors.postalCode && <div className="invalid-feedback">{errors.postalCode}</div>}
            </div>

            <div className='col-12 col-md-6'>
                <label className="form-label">Province</label>

                <select
                    className={`form-control ${errors.province && "is-invalid"}`}
                    name="province"
                    value={addressFields.province}
                    onChange={handleChange}
                >
                    <option value="0" disabled>
                        Select province
                    </option>

                    {provinces.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                {errors.province && <div className="invalid-feedback">{errors.province}</div>}
            </div>

            <div className='col-12 col-md-6'>
                <label className="form-label">City</label>
                <select
                    className={`form-control ${errors.city && "is-invalid"}`}
                    name="city"
                    value={addressFields.city}
                    onChange={handleChange}
                >
                    <option value="0" disabled>
                        Select city
                    </option>

                    {cities.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
            </div>

            <div className='col-12 col-md-6'>
                <label className="form-label">Barangay</label>
                <select
                    className={`form-control ${errors.barangay && "is-invalid"}`}
                    name="barangay"
                    value={addressFields.barangay}
                    onChange={handleChange}
                >
                    <option value="0" disabled>
                        Select barangay
                    </option>

                    {barangays.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                {errors.barangay && <div className="invalid-feedback">{errors.barangay}</div>}
            </div>

            <div className='col-12'>
                <label className="form-label">House#, Street</label>
                <input type="text" name="houseStreet" value={AddressFields.houseStreet} className={`form-control ${errors.houseStreet && "is-invalid"}`} onChange={handleChange} />
                {errors.houseStreet && <div className="invalid-feedback">{errors.houseStreet}</div>}
            </div>
        </div>
    )
}

export default AddressFields