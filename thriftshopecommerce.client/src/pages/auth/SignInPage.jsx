import { useState, useEffect } from 'react'
import { useForm } from '../../lib/FormHelper';
import { useAuth } from '../../lib/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
    const navigate = useNavigate();

    const { login, auth } = useAuth();

    const [isFailed, setIsFailed] = useState(false);

    const { formData, handleChange } = useForm({
        email: '',
        password: ''
    });

    const [isInvalid, setIsInvalid] = useState({
        email: {
            message: '',
        },
        password: {
            message: ''
        }
    });

    useEffect(() => {
        if (auth?.accessToken) {
            navigate('/admin'); // Redirect if already signed in
        }
    })

    const validateForm = () => {
        // Define container for errors
        let errors = {
            email: {
                message: ''
            },
            password: {
                message: ''
            }
        };
        
        // Validate the fields
        if (!formData.email.trim()) {
            errors.email.message = 'Email is required.';
        }

        if (!formData.password.trim()) {
            errors.password.message = 'Password is required.';
        }

        // Update errors
        setIsInvalid(errors);

        if (errors.email.message || errors.password.message) {
            return false;
        }

        return true;
    }

    const authenticate = async() => {
        try {
            const res = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const data = await res.json();
                login(data);
                navigate('/admin');
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
            authenticate();
        }
    }

    return (
        <div className="container mx-auto py-5 d-flex justify-content-center align-items-center" style={{ height: 'calc(100vh - 10rem)'}}>
            <form className='bg-white p-4 rounded-2 border shadow' style={{ width: '24rem' }} onSubmit={handleSubmit}>

                {isFailed && (
                    <div className="alert alert-danger" role="alert">
                        Login failed
                    </div>
                )}

                <h1>Admin Sign In</h1>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className={`form-control ${isInvalid.email.message && 'is-invalid'}`} name="email" value={formData.email} onChange={handleChange} />
                    {isInvalid.email.message && (
                        <div className="invalid-feedback">{isInvalid.email.message}</div>
                    )}
                </div>

                <div className="mb-3">
                    <div className='d-flex justify-content-between'>
                        <label className="form-label">Password</label>
                        {/*<a href='/'>Forgot Password?</a>*/}
                    </div>

                    <input type="password" className={`form-control ${isInvalid.password.message && 'is-invalid'}`} name="password" value={formData.password} onChange={handleChange} />
                    {isInvalid.password.message && (
                        <div className="invalid-feedback">{isInvalid.password.message}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-dark w-100">Sign In</button>

                <div className='mt-4 text-center'>
                    {/*<p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>*/}
                </div>
            </form>
        </div>
    )
}

export default SignInPage