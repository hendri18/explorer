import { useParams, Link } from 'react-router-dom';


const renderSubFolders = (subFolders, currentPath) => {
    const { folderId } = useParams();
    return (<ul className="sub-folder">
        {subFolders.map((subFolder) => (
            <li key={subFolder.id}>
                <Link to={`${currentPath}/${subFolder.name}`} className={`${subFolder.id == folderId ? 'active' : ''}`}><i className="bi bi-folder"></i> {subFolder.name}</Link>
                {subFolder.sub_folders && subFolder.sub_folders.length > 0 && (
                    renderSubFolders(subFolder.sub_folders, currentPath+'/'+subFolder.name)
                )}
            </li>
        ))}
    </ul>)
}

const Sidebar = ({ folders }) => {
    const folderId = 0;
    return (
        <div className="sidebar">
            <button className="btn btn-success w-100"><i className="bi bi-folder-plus"></i> Tambah Folder</button>
            <ul className="root-folder-list">
                {(folders && folders.length > 0) && folders.map((folder) => (
                    <li key={folder.id}>
                        <Link to={`/folder/${folder.name}`} className={`${folder.id == folderId ? 'active' : ''}`}><i className="bi bi-folder"></i> {folder.name}</Link>
                        {(folder.sub_folders && folder.sub_folders.length > 0) && 
                            renderSubFolders(folder.sub_folders, `/folder/${folder.name}`)
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
  