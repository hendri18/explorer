import React from 'react';
import auth from '../services/auth';

function Header({logout}) {
    const user = auth.userData();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-custom">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><i className="bi bi-person-circle"></i> {user.name}</a>
                <ul className="navbar-nav mb-2 ms-auto mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#" onClick={() => logout()}>Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
 
export default Header;