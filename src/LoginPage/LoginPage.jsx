import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions';

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        backgroundImage: 'linear-gradient(#ffffff, #e7e7e7)',
        borderRadius: '1rem',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
        padding: '2rem',
        width: '60%',
    },
}

function LoginPage() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(username, password, from));
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <form name="form" onSubmit={handleSubmit}>
                    <div className="form-group text-center mt23">
                        <h3>Sign-in</h3>
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="username" value={username} onChange={handleChange} className={'form-control' + (submitted && !username ? ' is-invalid' : '')} />
                        {submitted && !username &&
                            <div className="invalid-feedback">Username is required</div>
                        }
                    </div>
                    <div className="aaa form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                        {submitted && !password &&
                            <div className="invalid-feedback">Password is required</div>
                        }
                    </div>
                    <div className="form-group mt-4">
                        <button className="btn btn-primary">
                            {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Login
                        </button>
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
        </div>

    );
}

export { LoginPage };