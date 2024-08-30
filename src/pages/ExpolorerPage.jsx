import React, { useRef } from "react";
import auth from "../services/auth";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import FolderViewer from "../components/FolderViewer";
import api from "../services/api";
import ModalCreateFolder from "../components/ModalCreateFolder";
import ModalDeleteConfirm from "../components/ModalDeleteConfirm";
import ModalRename from "../components/ModalRename";

class ExpolorerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            folders: [],
            rootFolders: [],
            isAuthenticated: true,
            showMCFolder: false,
            showMRFolder: false,
            showMDCFolder: false,
            showMCFile: false,
            showMRFile: false,
            showMDCFile: false,
            parent_id: null,
            target_id: null,
            target_name: '',
        };
    }

    async componentDidMount(){
        this.loadFolder()
    }

    async loadFolder() {
        const folders = await api.getFolders();
        if (folders) {
            const rootFolders = folders.filter(folder => !folder.parent_id);
            this.setState({folders: folders, rootFolders: rootFolders});
        }
    }

    async logout() {
        await auth.logout();
        this.setState({isAuthenticated: false});
        location.reload()
    }

    openModalAdd(parent_id = null, type = null) {
        if (type === 'file') {
            this.setState({showMCFile: true, parent_id: parent_id})
        } else {
            this.setState({showMCFolder: true, parent_id: parent_id})
        }
    }

    openModalRename(id, name, type = null) {
        if (type === 'file') {
            this.setState({showMRFile: true, target_id: id, target_name: name})
        } else {
            this.setState({showMRFolder: true, target_id: id, target_name: name})
        }
    }

    openModalDelete(id, name, type = null) {
        if (type === 'file') {
            this.setState({showMDCFile: true, target_id: id, target_name: name})
        }else {
            this.setState({showMDCFolder: true, target_id: id, target_name: name})
        }
    }

    async handleSubmitCreateFolder(name, parent_id = null){
        const action = await api.createFolder(name, parent_id);
        if (action) {
            this.setState({showMCFolder: false, target_id: null, parent_id: null})
            this.loadFolder()
        }
    }

    async handleSubmitRenameFolder(id, name){
        const action = await api.renameFolder(id, name);
        if (action) {
            this.setState({showMRFolder: false, target_id: null, parent_id: null})
            this.loadFolder()
        }
    }

    async handleSubmitDeleteFolder(id){
        const action = await api.deleteFolder(id);
        if (action) {
            this.setState({showMDCFolder: false, target_id: null, parent_id: null})
            this.loadFolder()
        }
    }

    async handleSubmitRenameFile(id, name){
        const action = await api.renameFile(id, name);
        if (action) {
            this.setState({showMRFile: false, target_id: null, parent_id: null})
            this.loadFolder()
        }
    }

    async handleSubmitDeleteFile(id){
        const action = await api.deleteFile(id);
        if (action) {
            this.setState({showMDCFile: false, target_id: null, parent_id: null})
            this.loadFolder()
        }
    }

    async handleUploadFile(event, id) {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('folder_id', id);

        const action = await api.uploadFile(formData);
        if (action) {
            this.setState({target_id: null, parent_id: null})
            this.loadFolder()
        }
    }
    

    render() {
        const { 
            isAuthenticated, rootFolders, parent_id, target_id, target_name,
            showMCFolder, showMRFolder, showMDCFolder,
            showMCFile, showMRFile, showMDCFile,
        } = this.state;
        if (!isAuthenticated) {
            return <Navigate to="/login" />
        }
        return (
            <div className="explorer-page row g-0 h-100">
                <div className="col-md-3">
                    <Sidebar folders={rootFolders} openModalAdd={this.openModalAdd.bind(this)} openModalRename={this.openModalRename.bind(this)} openModalDelete={this.openModalDelete.bind(this)} />
                </div>
                <div className="col-md-9">
                    <Header logout={this.logout.bind(this)} />
                    <Routes>
                        <Route path={`/folder/*`} element={<FolderViewer rootFolders={rootFolders} openModalAdd={this.openModalAdd.bind(this)} openModalRename={this.openModalRename.bind(this)} openModalDelete={this.openModalDelete.bind(this)} handleUploadFile={this.handleUploadFile.bind(this)} />} />
                    </Routes>
                    <ModalCreateFolder show={showMCFolder} onHide={() => this.setState({showMCFolder: false})} parent_id={parent_id} handleSave={this.handleSubmitCreateFolder.bind(this)} />
                    <ModalRename show={showMRFolder} onHide={() => this.setState({showMRFolder: false})} id={target_id} name={target_name} type="Folder" handleSave={this.handleSubmitRenameFolder.bind(this)} />
                    <ModalRename show={showMRFile} onHide={() => this.setState({showMRFile: false})} id={target_id} name={target_name} type="File" handleSave={this.handleSubmitRenameFile.bind(this)} />
                    <ModalDeleteConfirm show={showMDCFolder} onHide={() => this.setState({showMDCFolder: false})} id={target_id} name={target_name} handleDelete={this.handleSubmitDeleteFolder.bind(this)} />
                    <ModalDeleteConfirm show={showMDCFile} onHide={() => this.setState({showMDCFile: false})} id={target_id} name={target_name} handleDelete={this.handleSubmitDeleteFile.bind(this)} />
                </div>
            </div>
        )
    }
}

export default ExpolorerPage;