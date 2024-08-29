import React from "react";
import auth from "../services/auth";
import { Link, Navigate } from "react-router-dom";
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            isAuthenticated: false,
        };
    }

    componentDidMount() {
        this.setState({
            isAuthenticated: auth.userData() ? true : false
        })
    }

    async handleSubmit(event) {
        if (!event.target.checkValidity()) {
            event.preventDefault();
            return;
        }

        event.preventDefault();

        const { name, email, password } = this.state;
        const action = await auth.register(name, email, password);
        if (action) {
            this.setState({isAuthenticated: true})
        }
        return;
    }
    handleInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }
    render() {
        const { name, email, password, isAuthenticated } = this.state;
        if (isAuthenticated) {
            return <Navigate to="/" />;
        }
        return (
            <div className="auth-page">
                <div className="row g-0 h-100 justify-content-center align-items-center">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header text-center">
                                <h4>Register</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="name" name="name" className="form-control" id="name" value={name} required={true} onChange={this.handleInput.bind(this)} />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" className="form-control" id="email" value={email} required={true} onChange={this.handleInput.bind(this)} />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" className="form-control" id="password" value={password} required={true} onChange={this.handleInput.bind(this)} />
                                    </div>
                                    <div className="mt-3 text-center">
                                        <button type="submit" className="btn btn-primary">Register</button>
                                    </div>
                                    <hr />
                                    <div className="text-center">
                                        <Link to="/login" className="text-decoration-none">Login</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterPage;