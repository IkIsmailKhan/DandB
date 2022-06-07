import React, { useEffect } from 'react';
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}

function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1>Hi {user.firstName} {user.lastName}!</h1>
                <h3 className='mt-4'>All Registered Users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                        : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                            : <span> - <a onClick={() => handleDeleteUser(user.id)} className="text-primary">Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <div className='mt-4'>
                    <Link to="/login">Logout</Link>
                </div>
            </div>
        </div>

    );
}

export { HomePage };