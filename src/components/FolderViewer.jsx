import { useParams, Link } from 'react-router-dom';

const FileViewer = ({ folders }) => {
  const { folderId } = useParams();
  const folder = folders.find((f) => f.id === folderId);

  if (!folder) return <div>Folder not found</div>;

  const renderSubFolders = (subFolders) => (
    <ul>
      {subFolders.map((subFolder) => (
        <li key={subFolder.id}>
            <Link to={`/folder/${subFolder.id}`}>{subFolder.name}</Link>
            {subFolder.subFolders && subFolder.subFolders.length > 0 && (
                <div style={{ paddingLeft: '20px' }}>
                    {renderSubFolders(subFolder.subFolders)}
                </div>
            )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="file-viewer">
      <h2>{folder.name}</h2>
      {renderSubFolders(folder.subFolders)}
    </div>
  );
};

export default FileViewer;