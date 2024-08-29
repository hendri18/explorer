import React from "react";
import auth from "../services/auth";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";

class ExpolorerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isAuthenticated: true,
        };
        
    }
    logout() {
        auth.logout();
        this.setState({isAuthenticated: false});
    }
    render() {
        const { isAuthenticated } = this.state;
        if (!isAuthenticated) {
            return <Navigate to="/login" />
        }
        return (
            <div>
                <Header />
                <button onClick={this.logout.bind(this)}>Logout</button>
            </div>
        )
    }
}

export default ExpolorerPage;