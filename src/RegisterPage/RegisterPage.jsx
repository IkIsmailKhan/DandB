import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

function RegisterPage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <form name="form" onSubmit={handleSubmit}>
                    <div className="form-group text-center mt-2">
                        <h3>Sign-up</h3>
                    </div>

                    <div className="form-group mt-4">
                        <label>First Name</label>
                        <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                        {submitted && !user.firstName &&
                            <div className="invalid-feedback">First Name is required</div>
                        }
                    </div>

                    <div className="aaa form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                        {submitted && !user.lastName &&
                            <div className="invalid-feedback">Last Name is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                        {submitted && !user.username &&
                            <div className="invalid-feedback">Username is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                        {submitted && !user.password &&
                            <div className="invalid-feedback">Password is required</div>
                        }
                    </div>
                    <div className="form-group mt-4">
                        <button className="btn btn-primary">
                            {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export { RegisterPage };