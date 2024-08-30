import React from 'react';
import auth from '../services/auth';

function Header({logout}) {
    const user = auth.userData();
    console.log(user)
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><i className="bi bi-person-circle"></i> {user.name}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 ms-auto mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#" onClick={() => logout()}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
 
export default Header;