
import { useParams, Link, Routes, Route } from "react-router-dom";
import { ContextMenuTrigger, ContextMenu, ContextMenuItem } from 'rctx-contextmenu';
import moment from "moment";

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const formattedSize = parseFloat((bytes / Math.pow(1024, i)).toFixed(2));
    
    return `${formattedSize} ${sizes[i]}`;
}
const FolderViewer = ({ rootFolders, openModalAdd, openModalRename, openModalDelete, handleUploadFile }) => {
    
    let { "*": splat } = useParams();
    const folderPath = splat.split('/');
    
    if (!rootFolders || (rootFolders && rootFolders.length < 1)) return <div></div>;

    let folder = null;
    const rootFolder = folderPath.length > 0 ?  rootFolders.find((f) => {
            return f.name == folderPath[0];
        }) : null;
    if (rootFolder && folderPath.length === 1) {
        folder = rootFolder;
    } else if (folderPath.length > 1) {
        let currentFolder = rootFolder;
        let i = 1;
        do {
            if (currentFolder.sub_folders && currentFolder.sub_folders.length > 0) {
                currentFolder = currentFolder.sub_folders.find(sf => sf.name === folderPath[i]);
            } 
            i++;
        } while (i <= (folderPath.length-1) && currentFolder);
        if (currentFolder && currentFolder.name === folderPath[folderPath.length-1]) {
            folder = currentFolder;
        }
    }
    
    if (!folder) return <div></div>;

    const isImageFile = (filename) => {
        const imagePattern = /\.(png|jpe?g|svg|gif)$/i;
        return imagePattern.test(filename);
    }
    
    const renderSubFolders = (folder, currentPath) => (
        <div className="row g-0">
        {folder.sub_folders.map((subFolder) => (
            <div className="col-6 col-md-2 p-2" key={subFolder.id}>
                <ContextMenuTrigger id={`ctxm-folder-${subFolder.id}`}>
                    <Link to={`${currentPath}/${subFolder.name}`} className="folder">
                        <div><i className="bi bi-folder"></i></div>
                        <div className="folder-name">{subFolder.name}</div>
                    </Link>
                </ContextMenuTrigger>
                <ContextMenu id={`ctxm-folder-${subFolder.id}`}>
                    <ContextMenuItem preventClose={true} className="text-center fw-bold folder-name">{subFolder.name}</ContextMenuItem>
                    <ContextMenuItem onClick={() => openModalRename(subFolder.id, subFolder.name, 'folder')}><i className="bi bi-pencil"></i> Rename</ContextMenuItem>
                    <ContextMenuItem onClick={() => openModalDelete(subFolder.id, subFolder.name, 'folder')}><i className="bi bi-trash"></i> Delete</ContextMenuItem>
                    <ContextMenuItem preventClose={true} disabled className="fw-bold folder-name"><i className="bi bi-clock"></i> {moment(subFolder.created_at).local().format('YYYY-MM-DD HH:mm:ss')}</ContextMenuItem>
                    <ContextMenuItem preventClose={true} disabled className="fw-bold folder-name"><i className="bi bi-arrow-clockwise"></i> {moment(subFolder.updated_at).local().format('YYYY-MM-DD HH:mm:ss')}</ContextMenuItem>
                </ContextMenu>
            </div>
        ))}
        {(folder.files && folder.files.length) > 0 && 
            folder.files.map((file) => ( 
                <div className="col-6 col-md-2 p-2" key={file.id}>
                    <ContextMenuTrigger id={`ctxm-file-${file.id}`}>
                        <a href={file.file_url} className="folder" target="_blank">
                            <div>
                                {isImageFile(file.file_name) ? <img src={file.file_url} alt="" style={{height: 72}} />: 
                                <i className="bi bi-file-earmark"></i>}
                            </div>
                            <div className="folder-name">{file.file_name}</div>
                        </a>
                    </ContextMenuTrigger>
                    <ContextMenu id={`ctxm-file-${file.id}`}>
                        <ContextMenuItem preventClose={true} className="text-center fw-bold folder-name">{file.file_name}</ContextMenuItem>
                        <ContextMenuItem onClick={() => openModalRename(file.id, file.file_name, 'file')}><i className="bi bi-pencil"></i> Rename</ContextMenuItem>
                        <ContextMenuItem onClick={() => openModalDelete(file.id, file.file_name, 'file')}><i className="bi bi-trash"></i> Delete</ContextMenuItem>
                        <ContextMenuItem preventClose={true} disabled className="fw-bold folder-name"><i className="bi bi-clock"></i> {moment(file.created_at).local().format('YYYY-MM-DD HH:mm:ss')}</ContextMenuItem>
                        <ContextMenuItem preventClose={true} disabled className="fw-bold folder-name"><i className="bi bi-arrow-clockwise"></i> {moment(file.updated_at).local().format('YYYY-MM-DD HH:mm:ss')}</ContextMenuItem>
                        <ContextMenuItem preventClose={true} disabled className="fw-bold folder-name"> {formatBytes(file.size)}</ContextMenuItem>
                    </ContextMenu>
                </div>
            ))
        }
        </div>
    );
    let url = '/folder';
    return (
        <div className="file-viewer">
            <div className="row">
                <div className="col-md-10">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            {folderPath.map((fp,i) => {
                                const active = i == folderPath.length -1;
                                url += '/'+fp;
                                return (
                                    <li key={i} className={`breadcrumb-item ${active ? 'active' : ''}`}>{active ? fp : <Link to={url}>{fp}</Link>}</li>
                                )
                            })}
                        </ol>
                    </nav>
                </div>
                <div className="col-md-2">
                    <div className="text-end">
                        <div className="btn-group me-2" role="group" aria-label="First group">
                            <button type="button" onClick={() => openModalAdd(folder.id, 'folder')} className="btn btn-outline-dark"><i className="bi bi-folder-plus"></i></button>
                            <button type="button" onClick={() => openModalAdd(folder.id, 'file')} className="btn btn-outline-dark"><label htmlFor="upload"><i className="bi bi-upload"></i></label></button>
                        </div>
                        <input type="file" id="upload" hidden onChange={(e) => {handleUploadFile(e, folder.id); e.target.value=null}}/>
                    </div>
                </div>
            </div>
            {renderSubFolders(folder, `/folder/${splat}`)}
        </div>
    );
};

export default FolderViewer;