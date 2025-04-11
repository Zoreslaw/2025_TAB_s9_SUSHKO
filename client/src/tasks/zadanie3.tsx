import React, { useState } from 'react'
import './zadanie3.css'

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        if (!email || !password) {
            e.preventDefault();
            setError('Please enter both email and password');
            return;
        }
        
        if (password.length < 8) {
            e.preventDefault();
            setError('Password must be at least 8 characters long');
            return;
        }

        if (!email.includes('@')) {
            e.preventDefault();
            setError('Invalid email address');
            return;
        }

        if (password.includes(' ')) {
            e.preventDefault();
            setError('Password cannot contain spaces');
            return;
        }

        if (email.includes(' ')) {
            e.preventDefault();
            setError('Email cannot contain spaces');
            return;
        }

        setError(null);
    };

    return (
        <form className='login-form' onSubmit={handleSubmit} method='GET' action='login'>
            <h1>Login</h1>
            <div className='login-form-inputs'>
                <input type="email" name='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className='error-message'>{error}</p>}
            <button type='submit'>Login</button>
        </form>
    );
}

export default LoginForm;