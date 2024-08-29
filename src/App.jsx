import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ExpolorerPage from './pages/ExpolorerPage';
import { ProtectedRoute } from './pages/ProtectedRoute';
class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    {/* <Route path="/folder/:folderName" element={<ProtectedRoute><ExpolorerPage /></ProtectedRoute>} /> */}
                    <Route path="*" element={<ProtectedRoute><ExpolorerPage /></ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        )
    };
};


export default App;