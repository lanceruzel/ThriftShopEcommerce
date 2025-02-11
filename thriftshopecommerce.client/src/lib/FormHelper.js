import { useState } from 'react';

export function useForm(initialState) {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return { formData, setFormData, handleChange };
}
