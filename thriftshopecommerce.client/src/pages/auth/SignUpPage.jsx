import { useForm } from '../../lib/FormHelper';
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function SignUpPage() {
    const navigate = useNavigate();

    const [isFailed, setIsFailed] = useState(false);

    const { formData, handleChange } = useForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [isInvalid, setIsInvalid] = useState({
        username: {
            message: '',
        },
        email: {
            message: '',
        },
        password: {
            message: '',
        },
        confirmPassword: {
            message: ''
        }
    });

    const validateForm = () => {
        // Define container for errors
        let errors = {
            username: {
                message: ''
            },
            email: {
                message: ''
            },
            password: {
                message: ''
            },
            confirmPassword: {
                message: ''
            },
        };

        // Validate the fields
        if (!formData.username.trim()) {
            errors.username.message = 'Username is required.';
        }

        if (!formData.email.trim()) {
            errors.email.message = 'Email is required.';
        }

        if (!formData.password.trim()) {
            errors.password.message = 'Password is required.';
        }

        if (!formData.confirmPassword.trim()) {
            errors.confirmPassword.message = 'Password confirmation is required.';
        }

        if (formData.password.trim() && formData.confirmPassword.trim()) {
            if (formData.password.trim() !== formData.confirmPassword.trim()) {
                errors.confirmPassword.message = 'Passwords do not match.';
            }
        }

        // Update errors
        setIsInvalid(errors);

        if (errors.username.message
            || errors.password.message
            || errors.email.message
            || errors.confirmPassword.message
        ) {
            return false;
        }

        return true;
    }

    const register = async () => {
        try {
            const res = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                navigate('/signin');
            } else {
                setIsFailed(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            register();
        }
    }


    return (
        <div className="container mx-auto my-5 d-flex justify-content-center align-items-center">
            <form className='bg-white p-4 rounded-2 border shadow' style={{ width: '24rem' }} onSubmit={handleSubmit}>
                {isFailed && (
                    <div className="alert alert-danger" role="alert">
                        There seems to be a problem creating your account
                    </div>
                )}

                <h1>Sign Up</h1>

                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className={`form-control ${isInvalid.username.message && 'is-invalid'}`} name="username" value={formData.username} onChange={handleChange} />
                    {isInvalid.username.message && (
                        <div className="invalid-feedback">{isInvalid.username.message}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className={`form-control ${isInvalid.email.message && 'is-invalid'}`} name="email" value={formData.email}  onChange={handleChange} />
                    {isInvalid.email.message && (
                        <div className="invalid-feedback">{isInvalid.email.message}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className={`form-control ${isInvalid.password.message && 'is-invalid'}`} name="password" value={formData.password} onChange={handleChange} />
                    {isInvalid.password.message && (
                        <div className="invalid-feedback">{isInvalid.password.message}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className={`form-control ${isInvalid.confirmPassword.message && 'is-invalid'}`} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    {isInvalid.confirmPassword.message && (
                        <div className="invalid-feedback">{isInvalid.confirmPassword.message}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-dark w-100">Sign Up</button>

                <div className='mt-4 text-center'>
                    <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
                </div>
            </form>
        </div>
    )
}

export default SignUpPage