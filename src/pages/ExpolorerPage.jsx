import React from "react";
import auth from "../services/auth";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import FolderViewer from "../components/FolderViewer";
import api from "../services/api";
class ExpolorerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            folders: [],
            rootFolders: [],
            isAuthenticated: true,
        };
    }

    async componentDidMount(){
        const folders = await api.getFolders();
        if (folders) {
            const rootFolders = folders.filter(folder => !folder.parent_id);
            this.setState({folders: folders, rootFolders: rootFolders});
        }
    }

    logout() {
        auth.logout();
        this.setState({isAuthenticated: false});
    }

    openModalAdd() {
        
    }

    render() {
        const { isAuthenticated, folders, rootFolders } = this.state;
        if (!isAuthenticated) {
            return <Navigate to="/login" />
        }
        return (
            <div className="explorer-page row g-0 h-100">
                <div className="col-md-3">
                    <Sidebar folders={rootFolders} />
                </div>
                <div className="col-md-9">
                    <Header />
                    <Routes>
                        <Route path={`/folder/*`} element={<FolderViewer rootFolders={rootFolders} />} />
                    </Routes>
                </div>
            </div>
        )
    }
}

export default ExpolorerPage;