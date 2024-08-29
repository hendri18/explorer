
import { useParams, Link, Routes, Route } from "react-router-dom";

const FolderViewer = ({ rootFolders }) => {
    
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
            <div className="col-2 p-2" key={subFolder.id}>
                <Link to={`${currentPath}/${subFolder.name}`} className="folder">
                    <div><i className="bi bi-folder"></i></div>
                    <div className="folder-name">{subFolder.name}</div>
                </Link>
            </div>
        ))}
        {(folder.files && folder.files.length) > 0 && 
            folder.files.map((file) => ( 
                <div className="col-2 p-2" key={file.id}>
                    <a href={file.file_url} className="folder" target="_blank">
                        <div>
                            {isImageFile ? <img src={file.file_url} alt="" style={{height: 57}} />: 
                            <i className="bi bi-file-earmark"></i>}
                            
                        </div>
                        <div className="folder-name">{file.file_name}</div>
                    </a>
                </div>
            ))
        }
        </div>
    );
    let url = '/folder';
    return (
        <div className="file-viewer">
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
            {renderSubFolders(folder, `/folder/${splat}`)}
        </div>
    );
};

export default FolderViewer;